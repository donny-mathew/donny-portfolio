import type { Node, Edge } from "reactflow";

export type DiagramTab = "order" | "devflow";

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

// ─── ORDER FLOW node styles ───────────────────────────────────────────────────
const monoBase = {
  fontFamily: "var(--font-jetbrains), monospace",
  textAlign: "center" as const,
  borderRadius: "8px",
  fontSize: "12px",
};

const grayBoxStyle = {
  ...monoBase,
  background: "rgba(50,55,70,0.7)",
  border: "1px solid rgba(110,120,140,0.55)",
  color: "#E0E8F0",
  padding: "10px 20px",
  minWidth: "160px",
};

const amberBoxStyle = {
  ...monoBase,
  background: "rgba(120,65,10,0.65)",
  border: "1px solid rgba(210,130,20,0.75)",
  color: "#FFD070",
  padding: "10px 20px",
  minWidth: "160px",
};

const omsBlockStyle = {
  ...monoBase,
  background: "rgba(40,30,120,0.75)",
  border: "2px solid rgba(110,90,220,0.85)",
  borderRadius: "10px",
  color: "#F0F4FF",
  fontSize: "14px",
  padding: "18px 40px",
  minWidth: "580px",
  fontWeight: 600,
};

const redBoxStyle = {
  ...monoBase,
  background: "rgba(100,20,20,0.65)",
  border: "1px solid rgba(190,50,50,0.75)",
  color: "#FFB0B0",
  padding: "10px 20px",
  minWidth: "160px",
};

const blueBoxStyle = {
  ...monoBase,
  background: "rgba(20,55,130,0.65)",
  border: "1px solid rgba(60,130,220,0.75)",
  color: "#90C8FF",
  padding: "10px 20px",
  minWidth: "180px",
};

const noteStyle = {
  ...monoBase,
  background: "transparent",
  border: "none",
  color: "rgba(150,160,175,0.8)",
  fontSize: "10px",
  padding: "4px",
  minWidth: "400px",
};

const mongoDbStyle = {
  ...monoBase,
  background: "rgba(10,80,40,0.65)",
  border: "1px solid rgba(30,180,80,0.75)",
  color: "#80FFB0",
  padding: "10px 20px",
  minWidth: "150px",
};

const openSearchStyle = {
  ...monoBase,
  background: "rgba(20,40,100,0.65)",
  border: "1px solid rgba(80,100,200,0.75)",
  color: "#A0B8FF",
  padding: "10px 20px",
  minWidth: "150px",
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
  // ─── New order flow node tooltips ───
  "upstream": "Upstream services (CMS, admin tools, internal systems) initiate order requests over REST via Spring OpenFeign — type-safe HTTP clients generated from interface contracts, keeping inter-service coupling explicit and versioned.",
  "other-svcs": "Other platform microservices (campaign approvals, budget change events, etc.) publish business events into the OMS inbound queue — decoupling producers from OMS so neither side blocks the other.",
  "rabbitmq-in": "RabbitMQ inbound queue — OMS consumes events asynchronously from upstream producers. Durable queues with dead-letter routing ensure no event is silently dropped, even under spike load.",
  "oms-block": "Order Management Service: the single source of truth for all ad order state. Orchestrates creation → validation → MongoDB persistence → event dispatch. Built on Spring Boot with a domain-driven model; MongoDB's flexible document schema accommodates the highly varied ad campaign structure without costly migrations.",
  "ext-svc": "External service (ad exchange / fulfilment partner) receives finalised orders via synchronous REST. OMS calls this only after all internal validations pass — isolating the external integration from internal failures and retry storms.",
  "rabbitmq-out": "RabbitMQ outbound queue — OMS publishes order lifecycle events after each state change. Downstream consumers (search, billing, reporting) subscribe independently, processing at their own pace without blocking OMS throughput.",
  "search-node": "Search Microservice consumes order events to keep the OpenSearch index current. Uses ThreadLocal per-thread caching and CompletableFuture async pipelines to avoid redundant index hits and parallelise fetch operations.",
  "downstream-node": "Billing, trafficking, and reporting services each consume from the outbound queue on their own schedule. Fan-out via RabbitMQ means adding a new downstream consumer requires zero changes to OMS.",
  "perf-note": "ThreadLocal provides per-thread request-scoped caching — eliminates repeated OpenSearch lookups within a single request. CompletableFuture enables non-blocking parallel execution — OMS can fire multiple async operations concurrently, dramatically improving throughput under load.",
  "mongodb-db": "MongoDB stores all order documents — chosen for its flexible schema, which fits the highly variable structure of ad campaign orders without requiring costly migrations for each new field. Horizontal sharding supports the volume of orders processed daily.",
  "opensearch-db": "OpenSearch holds the searchable ad inventory index — tuned index mappings, custom analysers, and query DSL optimisations deliver fast relevance-ranked results. The Search Microservice writes here on every order event and reads here on every search query.",
  // ─── existing tooltips ───
  "dev-intent": "Developer describes the desired AI behaviour in plain language — the skill system translates this into a structured prompt.",
  "skill-manager": "Skill Manager routes the intent to the right prompt template and enforces token budgets.",
  "token-budget": "Token budget configuration limits per-call cost and prevents runaway AI usage in production.",
  "prompt-template": "Versioned prompt templates keep AI behaviour consistent and testable across deployments.",
  "claude-ai": "Claude AI processes the prompt and returns a structured response used in development tooling and automation.",
  "ai-response": "Optimised AI response — structured output consumed by developer tooling, reducing manual effort and improving dev efficiency.",
};

// ─── ORDER FLOW ───────────────────────────────────────────────────────────────

const edgeLabelStyle = { fill: "#8090A0", fontSize: 10, fontFamily: "var(--font-jetbrains), monospace" };
const edgeLabelBg = { fill: "rgba(10,15,28,0.75)" };

export const orderNodes: Node[] = [
  {
    id: "upstream", type: "subLabel", draggable: false,
    position: { x: 110, y: 10 },
    data: { label: "Upstream services" },
    style: grayBoxStyle,
  },
  {
    id: "other-svcs", type: "subLabel", draggable: false,
    position: { x: 560, y: 10 },
    data: { label: "Other services" },
    style: grayBoxStyle,
  },
  {
    id: "rabbitmq-in", type: "subLabel", draggable: false,
    position: { x: 580, y: 115 },
    data: { label: "RabbitMQ", sublabel: "Inbound queue" },
    style: amberBoxStyle,
  },
  {
    id: "oms-block", type: "subLabel", draggable: false,
    position: { x: 50, y: 195 },
    data: {
      label: "Order Management Service (OMS)",
      sublabel: "Java / Spring Boot microservice",
    },
    style: omsBlockStyle,
  },
  {
    id: "ext-svc", type: "subLabel", draggable: false,
    position: { x: 700, y: 235 },
    data: { label: "External service", sublabel: "Order submission" },
    style: redBoxStyle,
  },
  {
    id: "rabbitmq-out", type: "subLabel", draggable: false,
    position: { x: 65, y: 340 },
    data: { label: "RabbitMQ", sublabel: "Outbound queue" },
    style: amberBoxStyle,
  },
  {
    id: "mongodb-db", type: "subLabel", draggable: false,
    position: { x: 330, y: 335 },
    data: { label: "MongoDB", sublabel: "Document store" },
    style: mongoDbStyle,
  },
  {
    id: "search-node", type: "subLabel", draggable: false,
    position: { x: 5, y: 465 },
    data: { label: "Search microservice", sublabel: "OpenSearch indexing" },
    style: blueBoxStyle,
  },
  {
    id: "downstream-node", type: "subLabel", draggable: false,
    position: { x: 320, y: 465 },
    data: { label: "Downstream services", sublabel: "Billing, trafficking, reporting" },
    style: grayBoxStyle,
  },
  {
    id: "opensearch-db", type: "subLabel", draggable: false,
    position: { x: 5, y: 590 },
    data: { label: "OpenSearch", sublabel: "Search index" },
    style: openSearchStyle,
  },
  {
    id: "perf-note", type: "subLabel", draggable: false,
    position: { x: 60, y: 700 },
    data: { label: "ThreadLocal (per-thread cache)  ·  CompletableFuture (async)  for performance" },
    style: noteStyle,
  },
];

export const orderEdges: Edge[] = [
  {
    id: "oe1", type: "smoothstep",
    source: "upstream", target: "oms-block",
    label: "REST / FeignClient", animated: true,
    style: { stroke: "#8090A0", strokeWidth: 1.2 },
    labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBg,
  },
  {
    id: "oe2", type: "smoothstep",
    source: "other-svcs", target: "rabbitmq-in",
    label: "publishes events", animated: true,
    style: { stroke: "#C07820", strokeWidth: 1.2 },
    labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBg,
  },
  {
    id: "oe3", type: "smoothstep",
    source: "rabbitmq-in", target: "oms-block",
    animated: true,
    style: { stroke: "#C07820", strokeWidth: 1.2 },
  },
  {
    id: "oe4", type: "smoothstep",
    source: "oms-block", sourceHandle: "s",
    target: "rabbitmq-out",
    label: "publishes events", animated: true,
    style: { stroke: "#C07820", strokeWidth: 1.2 },
    labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBg,
  },
  {
    id: "oe-mongo", type: "smoothstep",
    source: "oms-block", sourceHandle: "s",
    target: "mongodb-db",
    label: "persist", animated: false,
    style: { stroke: "#30B860", strokeWidth: 1.2 },
    labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBg,
  },
  {
    id: "oe5", type: "smoothstep",
    source: "oms-block", sourceHandle: "sr",
    target: "ext-svc", targetHandle: "tl",
    label: "REST — send order", animated: true,
    style: { stroke: "#8090A0", strokeWidth: 1.2 },
    labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBg,
  },
  {
    id: "oe6", type: "smoothstep",
    source: "rabbitmq-out", target: "search-node",
    label: "consumed by", animated: true,
    style: { stroke: "#39FF14", strokeWidth: 1.2 },
    labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBg,
  },
  {
    id: "oe7", type: "smoothstep",
    source: "rabbitmq-out", target: "downstream-node",
    label: "consumed by", animated: true,
    style: { stroke: "#39FF14", strokeWidth: 1.2 },
    labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBg,
  },
  {
    id: "oe-os", type: "smoothstep",
    source: "search-node", target: "opensearch-db",
    label: "query / index", animated: true,
    style: { stroke: "#6080C0", strokeWidth: 1.2 },
    labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBg,
  },
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
  { id: "spec-doc",     type: "subLabel", draggable: false, position: { x: 30,  y: 60  }, data: { label: "Spec Document" },      style: copilotStyle },
  { id: "copilot",      type: "subLabel", draggable: false, position: { x: 230, y: 60  }, data: { label: "Copilot + Skills" },   style: { ...copilotStyle, border: "1px solid rgba(57,255,20,0.8)", background: "rgba(57,255,20,0.12)" } },

  // Personal pipeline — Claude Code (cyan, bottom lane)
  { id: "claude-md",    type: "subLabel", draggable: false, position: { x: 30,  y: 260 }, data: { label: "CLAUDE.md" },          style: claudeStyle },
  { id: "task-md",      type: "subLabel", draggable: false, position: { x: 230, y: 260 }, data: { label: "TASK.md Queue" },      style: claudeStyle },
  { id: "remote-agent", type: "subLabel", draggable: false, position: { x: 430, y: 260 }, data: { label: "Remote Agent Loop" },  style: { ...claudeStyle, border: "1px solid rgba(0,212,255,0.9)", background: "rgba(0,212,255,0.16)" } },

  // Convergence
  { id: "code-gen",     type: "subLabel", draggable: false, position: { x: 630, y: 160 }, data: { label: "Code Generation" },    style: nodeStyle },
  { id: "junit",        type: "subLabel", draggable: false, position: { x: 800, y: 60  }, data: { label: "JUnit / Mockito" },    style: observabilityStyle },
  { id: "code-review",  type: "subLabel", draggable: false, position: { x: 800, y: 260 }, data: { label: "Code Review" },        style: observabilityStyle },
  { id: "ci-deploy",    type: "subLabel", draggable: false, position: { x: 980, y: 160 }, data: { label: "CI/CD Deploy" },       style: nodeStyle },
];

const devLabelStyle = { fill: "#8896B0", fontSize: 10, fontFamily: "var(--font-jetbrains), monospace" };
const devLabelBg    = { fill: "rgba(10,15,28,0.75)" };

export const devflowEdges: Edge[] = [
  // Copilot track
  { id: "d1", type: "smoothstep", source: "spec-doc",     target: "copilot",      label: "drives",    animated: true,  style: { stroke: "#39FF14", strokeWidth: 1.2 }, labelStyle: devLabelStyle, labelBgStyle: devLabelBg },
  { id: "d2", type: "smoothstep", source: "copilot",      target: "code-gen",     label: "generates", animated: true,  style: { stroke: "#39FF14", strokeWidth: 1.2 }, labelStyle: devLabelStyle, labelBgStyle: devLabelBg },

  // Claude Code track
  { id: "d3", type: "smoothstep", source: "claude-md",    target: "task-md",      label: "context",   animated: false, style: { stroke: "#00D4FF", strokeWidth: 1.2, strokeDasharray: "4 4" }, labelStyle: devLabelStyle, labelBgStyle: devLabelBg },
  { id: "d4", type: "smoothstep", source: "task-md",      target: "remote-agent", label: "queues",    animated: true,  style: { stroke: "#00D4FF", strokeWidth: 1.2 }, labelStyle: devLabelStyle, labelBgStyle: devLabelBg },
  { id: "d5", type: "smoothstep", source: "remote-agent", target: "code-gen",     label: "commits",   animated: true,  style: { stroke: "#00D4FF", strokeWidth: 1.2 }, labelStyle: devLabelStyle, labelBgStyle: devLabelBg },

  // Convergence
  { id: "d6", type: "smoothstep", source: "code-gen",     target: "junit",        label: "tested",    animated: false, style: { stroke: "#00D4FF", strokeWidth: 1.2 }, labelStyle: devLabelStyle, labelBgStyle: devLabelBg },
  { id: "d7", type: "smoothstep", source: "code-gen",     target: "code-review",  label: "reviewed",  animated: false, style: { stroke: "#00D4FF", strokeWidth: 1.2 }, labelStyle: devLabelStyle, labelBgStyle: devLabelBg },
  { id: "d8", type: "smoothstep", source: "junit",        target: "ci-deploy",    animated: true,     style: { stroke: "#39FF14", strokeWidth: 1.2 } },
  { id: "d9", type: "smoothstep", source: "code-review",  target: "ci-deploy",    animated: true,     style: { stroke: "#39FF14", strokeWidth: 1.2 } },
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
  devflow: { nodes: devflowNodes, edges: devflowEdges, label: "Dev Workflow" },
};
