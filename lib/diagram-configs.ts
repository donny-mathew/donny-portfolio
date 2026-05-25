import type { Node, Edge } from "reactflow";

export type DiagramTab = "order" | "search" | "ai" | "devflow";

const nodeStyle = {
  background: "rgba(0, 212, 255, 0.08)",
  border: "1px solid rgba(0, 212, 255, 0.4)",
  borderRadius: "8px",
  color: "#F0F4FF",
  fontSize: "12px",
  fontFamily: "var(--font-jetbrains), monospace",
  padding: "8px 14px",
  minWidth: "140px",
  textAlign: "center" as const,
};

const observabilityStyle = {
  ...nodeStyle,
  background: "rgba(57, 255, 20, 0.06)",
  border: "1px solid rgba(57, 255, 20, 0.3)",
  color: "#B0C4DE",
  fontSize: "11px",
};

export const nodeTooltips: Record<string, string> = {
  "ad-request": "Incoming ad campaign order from upstream systems via REST.",
  "feign-client": "Spring OpenFeign client for synchronous inter-service REST calls — keeps service contracts type-safe.",
  "order-ms": "Core Order Workflow Microservice — orchestrates the full order lifecycle from creation to event dispatch.",
  "mongodb": "MongoDB for persistent order storage — flexible document model fits the varied ad campaign structure.",
  "rabbitmq": "RabbitMQ message broker — decouples the Order MS from downstream consumers, enabling async event-driven flow.",
  "consumers": "Event consumers scale independently — each downstream domain (billing, reporting, etc.) listens on its own queue.",
  "downstream": "Downstream services process events at their own pace without blocking the Order MS.",
  "jmx": "JMX (Java Management Extensions) exposes runtime metrics — integrated with Kibana for observability dashboards.",
  "kibana": "Kibana dashboards visualise JMX metrics, error rates, and throughput in real time.",
  "search-query": "Recruiter/user search request hitting the Search Microservice REST endpoint.",
  "search-ms": "Search Microservice — owns the OpenSearch integration; handles query building, result mapping, and caching.",
  "openearch": "OpenSearch cluster with tuned index configurations and optimised query DSL for ad inventory search.",
  "threadlocal": "ThreadLocal storage provides per-thread request caching — avoids redundant OpenSearch hits within a single request lifecycle.",
  "completable": "CompletableFuture-based async pipeline — non-blocking parallel fetch from OpenSearch, dramatically improving throughput.",
  "index-config": "Custom index mappings and analysers tuned for ad campaign data — key driver of the client-appreciated search improvement.",
  "dev-intent": "Developer describes the desired AI behaviour in plain language — the skill system translates this into a structured prompt.",
  "skill-manager": "Skill Manager routes the intent to the right prompt template and enforces token budgets.",
  "token-budget": "Token budget configuration limits per-call cost and prevents runaway AI usage in production.",
  "prompt-template": "Versioned prompt templates keep AI behaviour consistent and testable across deployments.",
  "claude-ai": "Claude AI processes the prompt and returns a structured response used in development tooling and automation.",
  "ai-response": "Optimised AI response — structured output consumed by developer tooling, reducing manual effort and improving dev efficiency.",
};

// ─── ORDER FLOW ───────────────────────────────────────────────────────────────

export const orderNodes: Node[] = [
  { id: "ad-request",  position: { x: 30,  y: 120 }, data: { label: "Ad Request" },       style: nodeStyle },
  { id: "feign-client",position: { x: 220, y: 120 }, data: { label: "FeignClient\n(REST)" }, style: nodeStyle },
  { id: "order-ms",    position: { x: 430, y: 120 }, data: { label: "Order Workflow\nMicroservice" }, style: { ...nodeStyle, border: "1px solid rgba(0, 212, 255, 0.8)", background: "rgba(0, 212, 255, 0.14)" } },
  { id: "mongodb",     position: { x: 430, y: 260 }, data: { label: "MongoDB" },           style: nodeStyle },
  { id: "rabbitmq",    position: { x: 430, y: 390 }, data: { label: "RabbitMQ" },          style: { ...nodeStyle, border: "1px solid rgba(57,255,20,0.5)", background: "rgba(57,255,20,0.07)" } },
  { id: "consumers",   position: { x: 640, y: 390 }, data: { label: "Event\nConsumers" },  style: nodeStyle },
  { id: "downstream",  position: { x: 840, y: 390 }, data: { label: "Downstream\nServices" }, style: nodeStyle },
  { id: "jmx",         position: { x: 30,  y: 390 }, data: { label: "JMX Monitor" },      style: observabilityStyle },
  { id: "kibana",      position: { x: 30,  y: 510 }, data: { label: "Kibana" },           style: observabilityStyle },
];

export const orderEdges: Edge[] = [
  { id: "e1", source: "ad-request",   target: "feign-client", label: "REST",  animated: true,  style: { stroke: "#00D4FF", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "e2", source: "feign-client", target: "order-ms",     label: "REST",  animated: true,  style: { stroke: "#00D4FF", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "e3", source: "order-ms",     target: "mongodb",      label: "persist", animated: false, style: { stroke: "#00D4FF", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "e4", source: "order-ms",     target: "rabbitmq",     label: "AMQP publish", animated: true, style: { stroke: "#39FF14", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "e5", source: "rabbitmq",     target: "consumers",    label: "consume", animated: true, style: { stroke: "#39FF14", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "e6", source: "consumers",    target: "downstream",   animated: true,  style: { stroke: "#00D4FF", strokeWidth: 1.5 } },
  { id: "e7", source: "order-ms",     target: "jmx",          label: "metrics", animated: false, style: { stroke: "#39FF14", strokeWidth: 1, strokeDasharray: "4 4" }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "e8", source: "jmx",          target: "kibana",       animated: false, style: { stroke: "#39FF14", strokeWidth: 1, strokeDasharray: "4 4" } },
];

// ─── SEARCH FLOW ──────────────────────────────────────────────────────────────

export const searchNodes: Node[] = [
  { id: "search-query", position: { x: 30,  y: 200 }, data: { label: "Search\nQuery" },    style: nodeStyle },
  { id: "search-ms",    position: { x: 230, y: 200 }, data: { label: "Search\nMicroservice" }, style: { ...nodeStyle, border: "1px solid rgba(0, 212, 255, 0.8)", background: "rgba(0, 212, 255, 0.14)" } },
  { id: "openearch",    position: { x: 480, y: 200 }, data: { label: "OpenSearch" },        style: nodeStyle },
  { id: "index-config", position: { x: 480, y: 350 }, data: { label: "Index Config\n+ Query Tuning" }, style: observabilityStyle },
  { id: "threadlocal",  position: { x: 230, y: 350 }, data: { label: "ThreadLocal\nCache" }, style: observabilityStyle },
  { id: "completable",  position: { x: 230, y: 80  }, data: { label: "CompletableFuture\n(async)" }, style: observabilityStyle },
];

export const searchEdges: Edge[] = [
  { id: "s1", source: "search-query",  target: "search-ms",   label: "REST",   animated: true, style: { stroke: "#00D4FF", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "s2", source: "search-ms",     target: "openearch",   label: "query",  animated: true, style: { stroke: "#00D4FF", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "s3", source: "index-config",  target: "openearch",   label: "tuning", animated: false, style: { stroke: "#39FF14", strokeWidth: 1.5, strokeDasharray: "4 4" }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "s4", source: "threadlocal",   target: "search-ms",   label: "cache hit", animated: false, style: { stroke: "#39FF14", strokeWidth: 1, strokeDasharray: "4 4" }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "s5", source: "completable",   target: "search-ms",   label: "async pipeline", animated: true, style: { stroke: "#39FF14", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
];

// ─── AI / PROMPT LAYER ────────────────────────────────────────────────────────

export const aiNodes: Node[] = [
  { id: "dev-intent",     position: { x: 30,  y: 200 }, data: { label: "Developer\nIntent" },      style: nodeStyle },
  { id: "skill-manager",  position: { x: 230, y: 200 }, data: { label: "Skill\nManager" },         style: { ...nodeStyle, border: "1px solid rgba(0, 212, 255, 0.8)", background: "rgba(0, 212, 255, 0.14)" } },
  { id: "token-budget",   position: { x: 230, y: 360 }, data: { label: "Token Budget\nConfig" },   style: observabilityStyle },
  { id: "prompt-template",position: { x: 460, y: 200 }, data: { label: "Prompt\nTemplate" },       style: nodeStyle },
  { id: "claude-ai",      position: { x: 660, y: 200 }, data: { label: "Claude AI" },              style: { ...nodeStyle, border: "1px solid rgba(57,255,20,0.6)", background: "rgba(57,255,20,0.08)" } },
  { id: "ai-response",    position: { x: 660, y: 360 }, data: { label: "Optimised\nAI Response" },style: observabilityStyle },
];

export const aiEdges: Edge[] = [
  { id: "a1", source: "dev-intent",      target: "skill-manager",   animated: true,  label: "intent",  style: { stroke: "#00D4FF", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "a2", source: "skill-manager",   target: "prompt-template",  animated: true, label: "route",   style: { stroke: "#00D4FF", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "a3", source: "token-budget",    target: "skill-manager",    animated: false, label: "budget",  style: { stroke: "#39FF14", strokeWidth: 1, strokeDasharray: "4 4" }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "a4", source: "prompt-template", target: "claude-ai",        animated: true,  label: "prompt",  style: { stroke: "#39FF14", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "a5", source: "claude-ai",       target: "ai-response",      animated: true,  style: { stroke: "#39FF14", strokeWidth: 1.5 } },
];

// ─── DEV WORKFLOW ─────────────────────────────────────────────────────────────

const copilotStyle = {
  ...nodeStyle,
  background: "rgba(57, 255, 20, 0.07)",
  border: "1px solid rgba(57, 255, 20, 0.4)",
};

const claudeStyle = {
  ...nodeStyle,
  background: "rgba(0, 212, 255, 0.12)",
  border: "1px solid rgba(0, 212, 255, 0.7)",
};

export const devflowNodes: Node[] = [
  // Work pipeline — Copilot (green tint, top lane)
  { id: "spec-doc",      position: { x: 30,  y: 60  }, data: { label: "Spec\nDocument" },           style: copilotStyle },
  { id: "copilot",       position: { x: 230, y: 60  }, data: { label: "Copilot\n+ Skills" },        style: { ...copilotStyle, border: "1px solid rgba(57,255,20,0.8)", background: "rgba(57,255,20,0.12)" } },

  // Personal pipeline — Claude Code (cyan, bottom lane)
  { id: "claude-md",     position: { x: 30,  y: 260 }, data: { label: "CLAUDE.md" },                style: claudeStyle },
  { id: "task-md",       position: { x: 230, y: 260 }, data: { label: "TASK.md\nQueue" },           style: claudeStyle },
  { id: "remote-agent",  position: { x: 430, y: 260 }, data: { label: "Remote Agent\nLoop" },       style: { ...claudeStyle, border: "1px solid rgba(0,212,255,0.9)", background: "rgba(0,212,255,0.16)" } },

  // Convergence
  { id: "code-gen",      position: { x: 630, y: 160 }, data: { label: "Code\nGeneration" },         style: nodeStyle },
  { id: "junit",         position: { x: 800, y: 60  }, data: { label: "JUnit /\nMockito" },         style: observabilityStyle },
  { id: "code-review",   position: { x: 800, y: 260 }, data: { label: "Code\nReview" },             style: observabilityStyle },
  { id: "ci-deploy",     position: { x: 980, y: 160 }, data: { label: "CI/CD\nDeploy" },            style: nodeStyle },
];

export const devflowEdges: Edge[] = [
  // Copilot track
  { id: "d1", source: "spec-doc",     target: "copilot",      label: "drives",  animated: true,  style: { stroke: "#39FF14", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "d2", source: "copilot",      target: "code-gen",     label: "generates", animated: true, style: { stroke: "#39FF14", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },

  // Claude Code track
  { id: "d3", source: "claude-md",    target: "task-md",      label: "context", animated: false, style: { stroke: "#00D4FF", strokeWidth: 1.5, strokeDasharray: "4 4" }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "d4", source: "task-md",      target: "remote-agent", label: "queues",  animated: true,  style: { stroke: "#00D4FF", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "d5", source: "remote-agent", target: "code-gen",     label: "commits", animated: true,  style: { stroke: "#00D4FF", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },

  // Convergence
  { id: "d6", source: "code-gen",     target: "junit",        label: "tested",  animated: false, style: { stroke: "#00D4FF", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "d7", source: "code-gen",     target: "code-review",  label: "reviewed", animated: false, style: { stroke: "#00D4FF", strokeWidth: 1.5 }, labelStyle: { fill: "#8896B0", fontSize: 10 } },
  { id: "d8", source: "junit",        target: "ci-deploy",    animated: true,   style: { stroke: "#39FF14", strokeWidth: 1.5 } },
  { id: "d9", source: "code-review",  target: "ci-deploy",    animated: true,   style: { stroke: "#39FF14", strokeWidth: 1.5 } },
];

// Tooltips for devflow nodes
Object.assign(nodeTooltips, {
  "spec-doc":     "Spec-driven development: every feature starts with a structured spec defining requirements, API contracts, and acceptance criteria before any code is written.",
  "copilot":      "GitHub Copilot with custom skill definitions and prompt templates — used at work to generate consistent microservice boilerplate and enforce team patterns.",
  "claude-md":    "CLAUDE.md gives Claude Code persistent project context: architecture conventions, naming rules, and constraints that carry across every agent session.",
  "task-md":      "TASK.md is a structured task queue Claude Code reads autonomously — picks up the next task, executes it, marks it done, and moves on without manual prompting.",
  "remote-agent": "Claude Code's remote agent loop — runs tasks asynchronously, writes and commits code, runs builds, and reports back. No active supervision required.",
  "code-gen":     "AI-generated code is a starting point, not an end product — every output is reviewed, understood, and owned by the engineer before merging.",
  "junit":        "JUnit/Mockito test suite maintained across all service layers. AI-generated code must pass existing tests and add coverage for new behaviour.",
  "code-review":  "Standard peer code review process — AI assistance accelerates implementation but does not bypass engineering rigour or team standards.",
  "ci-deploy":    "CI/CD pipeline triggers on merge — agentic workflow plugs into existing DevOps infrastructure without special accommodations.",
});

export const diagrams: Record<DiagramTab, { nodes: Node[]; edges: Edge[]; label: string }> = {
  order:   { nodes: orderNodes,   edges: orderEdges,   label: "Order Flow" },
  search:  { nodes: searchNodes,  edges: searchEdges,  label: "Search Flow" },
  ai:      { nodes: aiNodes,      edges: aiEdges,      label: "AI / Prompt Layer" },
  devflow: { nodes: devflowNodes, edges: devflowEdges, label: "Dev Workflow" },
};
