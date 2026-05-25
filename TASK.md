# TASK.md — Donny J Mathew Portfolio

## 🎯 Goal
Build a next-generation portfolio website for Donny J Mathew featuring an animated microservice topology hero, interactive 3-tab architecture diagrams for the Ad Tech project, an AI-powered "Ask Donny" chat widget, and deployment to Vercel.

---

## 📋 Active Tasks

### Phase 1 — Scaffold & Setup

| Status | Task | Notes |
|--------|------|-------|
| ⚪ | Scaffold Next.js 15 project with TypeScript + Tailwind CSS | `npx create-next-app donny-portfolio` |
| ⚪ | Install additional dependencies: framer-motion, reactflow, @anthropic-ai/sdk | |
| ⚪ | Install dev fonts: Inter + JetBrains Mono via next/font | |
| ⚪ | Set up global CSS variables (color palette: navy, cyan, green) and Tailwind config | |
| ⚪ | Create project file structure: components/, lib/, types/ | |

### Phase 2 — Data Layer & Layout Skeleton

| Status | Task | Notes |
|--------|------|-------|
| ⚪ | Create `lib/resume-data.ts` with all resume content as typed TS constants | Bio, skills, projects, timeline |
| ⚪ | Create `lib/diagram-configs.ts` with ReactFlow node/edge definitions for all 3 diagram tabs | Order Flow, Search Flow, AI Layer |
| ⚪ | Create `app/layout.tsx` with font loading, metadata (SEO), dark background | |
| ⚪ | Create `app/page.tsx` that composes all section components | |

### Phase 3 — Hero Section

| Status | Task | Notes |
|--------|------|-------|
| ⚪ | Build `components/Hero.tsx` — full-viewport dark navy canvas | |
| ⚪ | Implement animated microservice topology background (Framer Motion SVG paths + nodes) | Nodes: Order MS, Search MS, RabbitMQ, MongoDB, OpenSearch |
| ⚪ | Animate "packet" dots flowing along edges on loop | Glowing cyan dots |
| ⚪ | Add foreground overlay: name, title, tagline, two CTA buttons | Fade-in on load, CTAs slide up |
| ⚪ | Add scroll indicator (animated chevron) | |

### Phase 4 — About Section

| Status | Task | Notes |
|--------|------|-------|
| ⚪ | Build `components/About.tsx` — bio text, photo placeholder, Australia relocation badge | |
| ⚪ | Implement skill chip row with staggered scroll-in animation | Java, Spring Boot, MongoDB, OpenSearch, RabbitMQ, Docker, AI |

### Phase 5 — Featured Ad Tech Project (Interactive Architecture)

| Status | Task | Notes |
|--------|------|-------|
| ⚪ | Build `components/ArchDiagram.tsx` — reusable ReactFlow wrapper with custom node styles | Glow on hover, dark theme |
| ⚪ | Implement Tab 1 — Order Flow diagram (Ad Request → FeignClient → Order MS → MongoDB → RabbitMQ → Consumers) | |
| ⚪ | Implement Tab 2 — Search Flow diagram (Search MS → OpenSearch, ThreadLocal cache, CompletableFuture) | |
| ⚪ | Implement Tab 3 — AI/Prompt Layer diagram (Skill Manager → Prompt Templates → Claude AI) | |
| ⚪ | Add click-to-tooltip on nodes (shows tech decision rationale) | |
| ⚪ | Add animated packet flows along edges in the active diagram | |
| ⚪ | Add achievement stat chips below diagram (scroll-in animation) | Client appreciation, async throughput, AI token savings |
| ⚪ | Build `components/Projects.tsx` — featured card + 3 compact secondary project cards | |

### Phase 6 — Skills Section

| Status | Task | Notes |
|--------|------|-------|
| ⚪ | Build `components/Skills.tsx` — 4-group layout (Backend, Data & Messaging, DevOps, AI) | |
| ⚪ | Implement scroll-triggered animated progress bars per skill | Bars fill left-to-right on enter |

### Phase 7 — Career Timeline

| Status | Task | Notes |
|--------|------|-------|
| ⚪ | Build `components/Timeline.tsx` — vertical scroll-animated career timeline | QBurst + Infosys entries |
| ⚪ | Add expandable project sub-entries and achievement callout chips | |

### Phase 8 — AI Chat Widget ("Ask Donny")

| Status | Task | Notes |
|--------|------|-------|
| ⚪ | Create `app/api/chat/route.ts` — Claude API streaming endpoint | claude-haiku-4-5-20251001, prompt caching on system prompt |
| ⚪ | Build `components/AskDonny.tsx` — floating bottom-right chat panel | Collapsed/expanded states |
| ⚪ | Implement streaming response rendering in chat UI | Vercel AI SDK or native EventSource |
| ⚪ | Add suggested question chips and disclaimer text | |

### Phase 9 — Contact Section & Polish

| Status | Task | Notes |
|--------|------|-------|
| ⚪ | Build `components/Contact.tsx` — email, LinkedIn, phone, resume PDF download | "Available in Australia" CTA |
| ⚪ | Copy resume PDF to `public/donny-resume.pdf` | |
| ⚪ | Mobile responsiveness pass (375px viewport) for all sections | |
| ⚪ | Add SEO metadata: title, description, og:image | |
| ⚪ | Accessibility audit: aria-labels on interactive nodes, keyboard nav for chat | |

### Phase 10 — Deploy

| Status | Task | Notes |
|--------|------|-------|
| ⚪ | Set `ANTHROPIC_API_KEY` in Vercel environment variables | Required for AI chat API route |
| ⚪ | Deploy to Vercel via MCP and verify public URL | |
| ⚪ | Smoke test on live URL: hero animation, diagram tabs, AI chat, resume download | |

---

## ✅ Completed

<!-- Move finished tasks here. Format: - ✅ [task name] -->
