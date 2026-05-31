"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { diagrams, type DiagramTab } from "@/lib/diagram-configs";

const ArchDiagram = dynamic(() => import("@/components/ArchDiagram"), { ssr: false });

const TABS: { key: DiagramTab; label: string }[] = [
  { key: "order",   label: "Order Flow" },
  { key: "devflow", label: "Dev Workflow" },
];

const ACHIEVEMENTS = [
  { label: "Client appreciation — enhanced search", icon: "⭐" },
  { label: "Async throughput via CompletableFuture", icon: "⚡" },
  { label: "AI token usage optimised via skill mgmt", icon: "🤖" },
];

const SECONDARY = [
  {
    name: "JP Morgan Trade Processing Integration",
    period: "April – November 2022",
    desc: "MuleSoft API layer bridging vendor REST APIs to JPMorgan's legacy Trade Processing System.",
    tags: ["MuleSoft", "REST API", "TPS", "Trade Finance"],
  },
  {
    name: "Order Repository Management System",
    period: "August 2020 – November 2021 · Infosys",
    desc: "Spring Boot microservice persisting IBM Sterling order entities with AWS SQS/S3 archival.",
    tags: ["Spring Boot", "MongoDB", "AWS SQS", "AWS S3"],
  },
  {
    name: "Web-Based Sterling Store Customisation",
    period: "January 2019 – July 2020 · Infosys",
    desc: "AngularJS UI customisation of IBM's omnichannel Order Management System with backend pipeline documentation.",
    tags: ["AngularJS", "JavaScript", "IBM Sterling", "OMS"],
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<DiagramTab>("order");

  return (
    <section id="projects" className="py-28 px-6" style={{ background: "#080C17" }}>
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs font-mono tracking-widest uppercase mb-2"
          style={{ color: "var(--accent-cyan)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What I&apos;ve built
        </motion.h2>

        {/* Featured project */}
        <motion.div
          className="rounded-2xl p-7 mb-14 glass-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded mr-2"
                style={{ background: "rgba(0,212,255,0.15)", color: "var(--accent-cyan)" }}
              >
                Featured
              </span>
              <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">
                OmniChannel Media Management System
              </h3>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                QBurst · December 2022 – Present
              </p>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ background: "rgba(0,0,0,0.3)" }}>
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={
                  activeTab === t.key
                    ? { background: "rgba(0,212,255,0.2)", color: "var(--accent-cyan)", border: "1px solid rgba(0,212,255,0.3)" }
                    : { color: "var(--text-muted)", border: "1px solid transparent" }
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ReactFlow diagram */}
          <div className="rounded-xl overflow-hidden mb-6" style={{ border: "1px solid rgba(0,212,255,0.12)" }}>
            <ArchDiagram
              key={activeTab}
              nodes={diagrams[activeTab].nodes}
              edges={diagrams[activeTab].edges}
            />
          </div>

          {/* Achievement chips */}
          <div className="flex flex-wrap gap-3">
            {ACHIEVEMENTS.map((a) => (
              <motion.div
                key={a.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  background: "rgba(57,255,20,0.07)",
                  border: "1px solid rgba(57,255,20,0.25)",
                  color: "#A0E890",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <span>{a.icon}</span>
                <span>{a.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Secondary projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SECONDARY.map((p, i) => (
            <motion.div
              key={p.name}
              className="rounded-xl p-5 glass-card flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div>
                <h4 className="font-semibold text-white text-sm leading-5 mb-1">{p.name}</h4>
                <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{p.period}</p>
              </div>
              <p className="text-sm leading-6" style={{ color: "#8896B0" }}>{p.desc}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full font-mono"
                    style={{ background: "rgba(0,212,255,0.08)", color: "var(--accent-cyan)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
