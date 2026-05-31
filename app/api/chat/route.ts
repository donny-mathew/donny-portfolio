import Anthropic from "@anthropic-ai/sdk";
import { wikiSystemPrompt } from "@/lib/wiki";

const client = new Anthropic();

export async function POST(request: Request) {
  const { messages } = await request.json();

  const anthropicMessages = messages.map((m: { role: string; content: string }) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }));

  const stream = await client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    system: [
      {
        type: "text",
        text: wikiSystemPrompt,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: anthropicMessages,
  });

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(new TextEncoder().encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
