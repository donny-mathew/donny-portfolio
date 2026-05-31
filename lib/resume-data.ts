export const profile = {
  name: "Donny J Mathew",
  title: "Lead Engineer",
  tagline: "Java · Spring Boot · AI",
  bio: "I design and build distributed systems that handle high-throughput media workflows — across order management, event-driven pipelines, and distributed search. At QBurst, I lead backend engineering on Prisma by Mediaocean, a platform that orchestrates hundreds of line items across broadcast, digital, and print channels. Eight years in, I still care most about systems that are observable, maintainable, and built to last.\n\nOn the development side, I've built custom GitHub Copilot agent workflows and spec-driven development pipelines — turning a requirements document into tested, reviewable code with minimal manual scaffolding.\n\nOutside work, I follow the EPL obsessively, enjoy trekking, and shoot street photography when I travel.",
  email: "donny.j.mathew@gmail.com",
  phone: "+91 9495950955",
  linkedIn: "https://www.linkedin.com/in/donny-j-mathew",
  location: "Kochi, India",
  relocation: "Actively seeking roles in Sydney or Perth — open to 482 visa sponsorship.",
};

export const skills = [
  { group: "Backend", items: [
    { name: "Java 8+", level: 90 },
    { name: "Spring Boot", level: 90 },
    { name: "Spring Security", level: 78 },
    { name: "Spring MVC / JPA", level: 80 },
  ]},
  { group: "Data & Messaging", items: [
    { name: "MongoDB", level: 85 },
    { name: "OpenSearch", level: 80 },
    { name: "RabbitMQ", level: 78 },
    { name: "SQL", level: 72 },
  ]},
  { group: "DevOps & Cloud", items: [
    { name: "Docker", level: 72 },
    { name: "AWS (SQS / S3)", level: 65 },
    { name: "Kibana / JMX", level: 68 },
  ]},
  { group: "AI & Tooling", items: [
    { name: "Prompt Engineering", level: 80 },
    { name: "Claude AI / Agents", level: 78 },
    { name: "Skill / Prompt Mgmt", level: 75 },
  ]},
];

export const skillChips = [
  "Java", "Spring Boot", "MongoDB", "OpenSearch",
  "RabbitMQ", "Docker", "Agentic Development",
];

export const experience = [
  {
    company: "QBurst",
    location: "Kochi, India",
    role: "Lead Engineer",
    period: "November 2021 – Present",
    projects: [
      {
        name: "OmniChannel Media Management System",
        period: "December 2022 – Present",
        description: "Omnichannel ad tech platform with event-driven order workflow, distributed OpenSearch-powered search, and AI-assisted development.",
        highlights: [
          "Designed and delivered Order workflow microservice integrating MongoDB, FeignClient, and RabbitMQ for async communication",
          "Built a search microservice on OpenSearch with optimised query structure and index configurations",
          "Improved concurrency using ThreadLocal per-thread caching and CompletableFuture for async non-blocking processing",
          "Implemented skill and prompt management techniques to optimise token usage with AI agents",
          "Integrated JMX monitoring; improved test coverage using JUnit and Mockito",
          "Client appreciation for successful implementation of enhanced search feature",
        ],
      },
      {
        name: "Integration of Third-Party Trade Processing System (JP Morgan)",
        period: "April 2022 – November 2022",
        description: "Integrated a digital platform to process trade finance documents against rules with JPMorgan's legacy Trade Processing System.",
        highlights: [
          "Worked on the API layer in MuleSoft to facilitate communication between outbound microservices and TPS",
          "Developed REST APIs for data transfer between vendor applications and TPS",
        ],
      },
    ],
  },
  {
    company: "Infosys",
    location: "Trivandrum, India",
    role: "Technology Analyst",
    period: "April 2018 – November 2021",
    projects: [
      {
        name: "Order Repository Management System",
        period: "August 2020 – November 2021",
        description: "Spring Boot microservice persisting order entities from IBM Sterling with AWS integration.",
        highlights: [
          "Spring Boot microservice with MongoDB repository layers for IBM Sterling order entities",
          "Implemented AWS SQS and S3 integrations for data archival",
          "Completed AWS Cloud Practitioner certification",
        ],
      },
      {
        name: "Web Based Sterling Store Customization",
        period: "January 2019 – July 2020",
        description: "AngularJS UI customisation of IBM's omnichannel Order Management System.",
        highlights: [
          "UI customisation using AngularJS and JavaScript",
          "Backend service configuration and OMS pipeline documentation",
        ],
      },
    ],
  },
];

export const achievements = [
  "Client appreciation for successful implementation of enhanced search feature (QBurst)",
  "High Performer in Infosys Training — scored 85% at Infosys Global Education Center",
];

export const education = {
  degree: "Bachelor of Technology in Electronics Engineering",
  institution: "Federal Institute of Science and Technology (FISAT)",
  period: "2013 – 2017",
  cgpa: "7.2",
};

export const resumeSystemPrompt = `You are an AI assistant representing Donny J Mathew's professional portfolio. Answer recruiter questions concisely and accurately based only on the information below. Stay professional, be specific, and highlight Donny's strengths.

PROFILE:
Name: ${profile.name}
Title: ${profile.title}
Experience: 8 years in Java and Spring Boot microservices
Location: Kochi, India
Relocation: ${profile.relocation}
Contact: ${profile.email} | ${profile.phone}
LinkedIn: ${profile.linkedIn}

BIO:
${profile.bio}

CURRENT ROLE: Lead Engineer at QBurst (November 2021 – Present)

KEY PROJECT — OmniChannel Ad Tech Platform (December 2022 – Present):
- Designed Order workflow microservice with MongoDB (storage), FeignClient (REST), RabbitMQ (async events)
- Built OpenSearch microservice with query and index optimisation
- Improved performance with ThreadLocal caching and CompletableFuture async processing
- Implemented AI skill/prompt management to optimise token usage with AI agents
- Integrated JMX monitoring; strong JUnit/Mockito test coverage
- Received client appreciation for enhanced search feature implementation

JP MORGAN PROJECT (April–November 2022):
- MuleSoft API layer bridging vendor REST APIs to JPMorgan's legacy Trade Processing System
- Developed REST APIs for trade finance document processing

INFOSYS (April 2018 – November 2021), Technology Analyst:
- Order Repository Management System: Spring Boot + MongoDB + AWS SQS/S3
- IBM Sterling Store customisation: AngularJS UI, OMS backend pipelines

TECHNICAL SKILLS:
- Backend: Java 8+, Spring Boot, Spring MVC, Spring Data JPA, Spring Security, JMX
- Data & Messaging: MongoDB, OpenSearch, RabbitMQ, SQL
- Cloud & DevOps: Docker, AWS (SQS, S3), Kibana, Maven
- Testing: JUnit, Mockito
- AI & Tooling: Claude AI, Prompt Engineering, Agent/Skill management

AREAS OF EXPERTISE: Microservices, Event-driven Architecture, Distributed Systems, API Development, Performance Optimisation, AI-Assisted Development

EDUCATION: B.Tech Electronics Engineering, FISAT (2013–2017), CGPA 7.2

LANGUAGES: English (C2 — Proficient/Fluent), Malayalam (Native)

ACHIEVEMENTS:
- Client appreciation for enhanced search feature implementation
- High Performer in Infosys Training (85%)

If asked something not covered above, say you don't have that information and suggest the recruiter reach out directly at ${profile.email}.`;
