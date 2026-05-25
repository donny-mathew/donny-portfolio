# Donny J Mathew — Portfolio Website

## Project Overview
A next-generation personal portfolio website for Donny J Mathew (Lead Engineer, Java/Spring Boot, 8 years). Goes beyond a static resume: animated microservice topology hero, interactive 3-tab architecture diagram for the Ad Tech project, and a Claude-powered "Ask Donny" AI chat widget. Deployed on Vercel.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS custom properties
- **Animations**: Framer Motion
- **Diagrams**: ReactFlow
- **AI**: Claude API (`claude-haiku-4-5-20251001`) via `@anthropic-ai/sdk`
- **Deployment**: Vercel

## Color Palette
- Background: `#0A0F1C` (deep navy)
- Primary accent: `#00D4FF` (electric cyan)
- Secondary accent: `#39FF14` (spring green)
- Cards: glass-morphism (backdrop-blur, semi-transparent border)

## Typography
- Body: `Inter` (via `next/font/google`)
- Code/labels: `JetBrains Mono` (via `next/font/google`)

## Project Structure
```
donny-portfolio/
├── app/
│   ├── page.tsx              # Root page — composes all sections
│   ├── layout.tsx            # Font loading, metadata
│   └── api/chat/route.ts     # Claude API streaming endpoint
├── components/
│   ├── Hero.tsx              # Animated microservice topology + name/CTAs
│   ├── About.tsx             # Bio, photo, Australia badge, skill chips
│   ├── Projects.tsx          # Featured Ad Tech card + 3 compact cards
│   ├── ArchDiagram.tsx       # Reusable ReactFlow diagram (dark theme, glow)
│   ├── Skills.tsx            # 4-group skill bars with scroll animation
│   ├── Timeline.tsx          # Career timeline (QBurst, Infosys)
│   ├── AskDonny.tsx          # Floating AI chat widget
│   └── Contact.tsx           # Email, LinkedIn, resume download, Australia CTA
├── lib/
│   ├── resume-data.ts        # All resume content as typed TS constants
│   └── diagram-configs.ts    # ReactFlow node/edge configs for all 3 tabs
├── public/
│   └── donny-resume.pdf
└── types/
    └── index.ts
```

## Key Conventions
- All resume content lives in `lib/resume-data.ts` — never hardcode strings in components
- ReactFlow diagram node/edge definitions live in `lib/diagram-configs.ts`
- Use Framer Motion `useInView` for scroll-triggered animations
- AI chat system prompt is constructed from `resume-data.ts` at request time (not fetched)
- Use `claude-haiku-4-5-20251001` for the chat endpoint; enable prompt caching on the system prompt block

## Environment Variables
- `ANTHROPIC_API_KEY` — required for the `/api/chat` route (set in Vercel dashboard)

## Notes for Claude
- Always check TASK.md before starting work
- Work through tasks one at a time with user approval between each task
- The Ad Tech project (OmniChannel Media Management System) is the centerpiece — give it the most visual depth
- Secondary projects (JP Morgan, Order Repo, Sterling Store) are compact cards only — no diagrams
- Mobile breakpoint: 375px minimum
