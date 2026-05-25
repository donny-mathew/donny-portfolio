"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What's your experience with OpenSearch?",
  "Have you worked with event-driven systems?",
  "Are you open to relocating to Australia?",
  "What's your experience with Spring Boot microservices?",
];

export default function AskDonny() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let partial = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        partial += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: partial };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        id="ask-donny"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm shadow-xl transition-all"
        style={{
          background: open ? "rgba(0,212,255,0.15)" : "var(--accent-cyan)",
          color: open ? "var(--accent-cyan)" : "#0A0F1C",
          border: open ? "1px solid var(--accent-cyan)" : "none",
          boxShadow: "0 0 30px rgba(0,212,255,0.3)",
        }}
        aria-label="Toggle AI chat"
      >
        <span>{open ? "✕" : "⚡"}</span>
        <span>{open ? "Close" : "GET /donny"}</span>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 rounded-2xl flex flex-col overflow-hidden"
            style={{
              background: "rgba(10,15,28,0.97)",
              border: "1px solid rgba(0,212,255,0.25)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
              maxHeight: "72vh",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{ borderBottom: "1px solid rgba(0,212,255,0.15)" }}
            >
              <span className="text-xl">🤖</span>
              <div>
                <p className="font-semibold text-white text-sm font-mono">GET /donny</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  AI assistant — answers from resume data
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ minHeight: 180 }}>
              {messages.length === 0 && (
                <div>
                  <p className="text-xs mb-3 font-mono" style={{ color: "var(--text-muted)" }}>
                    Try a question:
                  </p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full text-left text-xs px-3 py-2 rounded-lg mb-2 transition-all"
                      style={{
                        background: "rgba(0,212,255,0.07)",
                        border: "1px solid rgba(0,212,255,0.2)",
                        color: "var(--accent-cyan)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-6"
                    style={
                      m.role === "user"
                        ? { background: "rgba(0,212,255,0.15)", color: "var(--accent-cyan)" }
                        : { background: "rgba(255,255,255,0.05)", color: "#C8D8F0" }
                    }
                  >
                    {m.content || (loading && i === messages.length - 1 ? "▍" : "")}
                  </div>
                </div>
              ))}

              {loading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-2.5 rounded-xl text-sm"
                    style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)" }}
                  >
                    ▍
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 flex gap-2"
              style={{ borderTop: "1px solid rgba(0,212,255,0.12)" }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Ask me anything…"
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text-primary)", caretColor: "var(--accent-cyan)" }}
                aria-label="Chat input"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-40"
                style={{ background: "var(--accent-cyan)", color: "#0A0F1C" }}
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
