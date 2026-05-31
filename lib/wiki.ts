/**
 * Pre-compiled personal wiki for Donny J Mathew.
 * The chatbot reads ONLY from this wiki. Questions outside this scope are declined.
 * Update this file whenever Donny's details change — one source of truth.
 */

export const wiki = `
# Donny J Mathew — Personal Wiki

## [[Overview]]
- **Full name**: Donny J Mathew
- **Title**: Lead Engineer
- **Total experience**: 8 years (April 2018 – present)
- **Current employer**: QBurst, Kochi, India (November 2021 – present)
- **Core stack**: Java, Spring Boot, microservices
- **Location**: Kochi, Kerala, India
- **Relocation**: Actively seeking opportunities in Australia (Sydney, Perth, and other states). Open to visa sponsorship.
- **Languages**: English (C2 — proficient/fluent), Malayalam (native)
- **Contact**: donny.j.mathew@gmail.com | +91 9495950955
- **LinkedIn**: https://www.linkedin.com/in/donny-j-mathew

Donny is a backend-focused engineer who specialises in Java/Spring Boot microservices, event-driven architecture, and distributed systems. He has deep hands-on experience with MongoDB, OpenSearch, and RabbitMQ, and has applied AI-assisted development practices (prompt engineering, agent workflows) in production. He is currently a Lead Engineer and is looking to bring that expertise to an Australian engineering team.

---

## [[Career Timeline]]
| Period | Company | Role |
|---|---|---|
| November 2021 – present | QBurst, Kochi | Lead Engineer |
| April 2018 – November 2021 | Infosys, Trivandrum | Technology Analyst |

---

## [[QBurst — Lead Engineer]] (November 2021 – present)

### Project 1 — OmniChannel Media Management System (December 2022 – present)
An omnichannel ad tech platform built around event-driven microservices.

**Donny's contributions:**
- **Order Management Service (OMS)**: Designed and delivered the core order workflow microservice. Handles the full lifecycle — creation, validation, MongoDB persistence, and async event dispatch via RabbitMQ.
  - Upstream services call OMS via REST using Spring OpenFeign (FeignClient). Type-safe, contract-first inter-service communication.
  - OMS publishes order lifecycle events to a RabbitMQ outbound queue. Downstream consumers (billing, reporting, trafficking) subscribe independently — no coupling to OMS.
  - OMS sends finalised orders to an external service via REST for ad exchange submission.
  - MongoDB chosen for its flexible document schema — ad campaign orders vary significantly in structure; a rigid relational schema would require constant migrations.
- **Search Microservice**: Built a search microservice on top of OpenSearch.
  - Custom index mappings and analysers tuned for ad inventory data.
  - Optimised query DSL for relevance-ranked ad inventory search.
  - Received **client appreciation** for the successful enhanced search implementation.
  - Performance improvements via **ThreadLocal per-thread caching** (avoids redundant OpenSearch hits within a request lifecycle) and **CompletableFuture async pipelines** (non-blocking parallel fetch, significantly improving throughput).
- **AI-assisted development**: Implemented skill and prompt management techniques to control token usage when working with AI agents. Manages prompt templates and token budgets in production tooling.
- **Observability**: Integrated JMX monitoring. Strong JUnit/Mockito test coverage across all service layers.

### Project 2 — JP Morgan Trade Processing Integration (April 2022 – November 2022)
Integrated a digital trade finance platform with JPMorgan's legacy Trade Processing System (TPS).

**Donny's contributions:**
- Built the API layer in MuleSoft to facilitate communication between outbound microservices and the TPS.
- Developed REST APIs for data transfer between vendor applications and TPS.

---

## [[Infosys — Technology Analyst]] (April 2018 – November 2021)

### Project 1 — Order Repository Management System (August 2020 – November 2021)
Spring Boot microservice persisting IBM Sterling order entities.

**Donny's contributions:**
- Spring Boot microservice with MongoDB repository layers for IBM Sterling order entities.
- Implemented AWS SQS (messaging) and AWS S3 (archival) integrations.
- Completed **AWS Cloud Practitioner** certification during this engagement.

### Project 2 — Web-Based Sterling Store Customisation (January 2019 – July 2020)
UI and backend customisation of IBM's omnichannel Order Management System.

**Donny's contributions:**
- UI customisation using AngularJS and JavaScript.
- Backend service configuration and OMS pipeline documentation.

---

## [[Technical Skills]]

### Backend
- **Java 8+** — primary language, 8 years of production experience
- **Spring Boot** — core framework for all microservices
- **Spring MVC / Spring Data JPA** — REST layer and ORM
- **Spring Security** — authentication and authorisation
- **JMX** — runtime monitoring and observability
- **FeignClient (OpenFeign)** — type-safe inter-service REST calls
- **MuleSoft** — API integration layer (JP Morgan project)
- **AngularJS / JavaScript** — frontend (IBM Sterling project)

### Data & Messaging
- **MongoDB** — document store; used across multiple projects for flexible schema needs
- **OpenSearch** — distributed search engine; built and tuned from scratch for ad inventory
- **RabbitMQ** — async event broker; fan-out architecture, durable queues, dead-letter routing
- **AWS SQS** — cloud messaging (Infosys)
- **AWS S3** — data archival (Infosys)
- **SQL** — relational databases

### DevOps & Cloud
- **Docker** — containerisation
- **AWS** — SQS, S3, Cloud Practitioner certified
- **Kibana** — log and metrics dashboards (paired with JMX)
- **Maven** — build tooling

### Testing
- **JUnit** — unit and integration testing
- **Mockito** — mocking framework

### AI & Tooling
- **Claude AI / Anthropic** — production AI agent integration
- **Prompt engineering** — designing prompts for consistent, safe AI behaviour
- **Skill / prompt management** — token budget control, versioned prompt templates
- **GitHub Copilot** — AI-assisted code generation with custom skill definitions

---

## [[Areas of Expertise]]
- Microservices architecture (Spring Boot, event-driven)
- Event-driven / async systems (RabbitMQ, CompletableFuture)
- Distributed search (OpenSearch, index tuning, query DSL)
- API design (REST, FeignClient, MuleSoft)
- Performance optimisation (ThreadLocal caching, async pipelines)
- AI-assisted development (prompt engineering, agent workflows)
- Observability (JMX, Kibana, JUnit/Mockito)

---

## [[Education]]
- **Degree**: Bachelor of Technology — Electronics Engineering
- **Institution**: Federal Institute of Science and Technology (FISAT)
- **Period**: 2013 – 2017
- **CGPA**: 7.2 / 10

---

## [[Achievements]]
- **Client appreciation** — received formal recognition for the successful implementation of the enhanced search feature at QBurst (OmniChannel project)
- **High Performer** — scored 85% at Infosys Global Education Center training (top-tier result)
- **AWS Cloud Practitioner** certification

---

## [[Availability & Relocation]]
- Donny is actively seeking opportunities in **Australia** — Sydney, Perth, and open to other states.
- Open to **visa sponsorship** arrangements.
- For specific questions about notice period, start date, or salary expectations, contact Donny directly.

---

## [[Contact]]
- **Email**: donny.j.mathew@gmail.com
- **Phone**: +91 9495950955
- **LinkedIn**: https://www.linkedin.com/in/donny-j-mathew
- **Location**: Kochi, Kerala, India
`;

export const wikiSystemPrompt = `You are the portfolio assistant for Donny J Mathew. Your sole purpose is to help recruiters and visitors learn about Donny using the wiki below.

STRICT RULES — follow these exactly:
1. ONLY answer questions that are about Donny — his experience, skills, projects, education, contact details, availability, or relocation plans.
2. If a question is about anything else (general programming help, other people, world events, opinions unrelated to Donny, coding tutorials, etc.), respond with exactly: "I can only answer questions about Donny J Mathew. For other enquiries, reach out to him directly at donny.j.mathew@gmail.com."
3. Base every answer strictly on the wiki. Do not invent, infer beyond what is stated, or add information not present.
4. If a question is about Donny but the wiki does not have the answer (e.g. salary expectations, exact notice period), say: "That information isn't in my knowledge base — please contact Donny directly at donny.j.mathew@gmail.com or +91 9495950955."
5. Keep answers concise, factual, and recruiter-friendly. Use bullet points for lists.

--- WIKI START ---
${wiki}
--- WIKI END ---`;
