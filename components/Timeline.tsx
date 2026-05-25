"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { experience, achievements } from "@/lib/resume-data";

export default function Timeline() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="timeline" className="py-28 px-6" style={{ background: "#080C17" }}>
      <div className="max-w-3xl mx-auto">
        <motion.p
          className="text-xs font-mono tracking-widest uppercase mb-2"
          style={{ color: "var(--accent-cyan)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Career
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 top-2 bottom-2 w-px"
            style={{ background: "linear-gradient(to bottom, var(--accent-cyan), rgba(0,212,255,0.1))" }}
          />

          <div className="space-y-12">
            {experience.map((job, ji) => (
              <motion.div
                key={job.company}
                className="pl-14 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ji * 0.15 }}
              >
                {/* Dot */}
                <div
                  className="absolute left-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "rgba(0,212,255,0.15)",
                    border: "2px solid var(--accent-cyan)",
                    color: "var(--accent-cyan)",
                  }}
                >
                  {job.company[0]}
                </div>

                {/* Company header */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white">{job.company}</h3>
                  <p className="text-sm font-mono" style={{ color: "var(--accent-cyan)" }}>{job.role}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {job.location} · {job.period}
                  </p>
                </div>

                {/* Projects */}
                <div className="space-y-3">
                  {job.projects.map((proj) => {
                    const key = `${job.company}-${proj.name}`;
                    const open = expanded === key;
                    return (
                      <div
                        key={proj.name}
                        className="rounded-xl p-4 glass-card cursor-pointer"
                        onClick={() => setExpanded(open ? null : key)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-semibold text-white text-sm">{proj.name}</h4>
                            <p className="text-xs mt-0.5 font-mono" style={{ color: "var(--text-muted)" }}>
                              {proj.period}
                            </p>
                          </div>
                          <span
                            className="text-xs flex-shrink-0 mt-0.5 transition-transform"
                            style={{ color: "var(--accent-cyan)", transform: open ? "rotate(180deg)" : "none" }}
                          >
                            ▼
                          </span>
                        </div>

                        {open && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-3 text-sm leading-6" style={{ color: "#8896B0" }}>{proj.description}</p>
                            <ul className="mt-3 space-y-1.5">
                              {proj.highlights.map((h) => (
                                <li key={h} className="text-sm flex gap-2" style={{ color: "#8896B0" }}>
                                  <span style={{ color: "var(--accent-cyan)" }}>›</span>
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <motion.div
          className="mt-14 rounded-2xl p-6 glass-card"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-sm font-mono tracking-widest uppercase mb-4" style={{ color: "var(--accent-green)" }}>
            Achievements
          </h3>
          <ul className="space-y-3">
            {achievements.map((a) => (
              <li key={a} className="flex gap-3 text-sm" style={{ color: "#B8C8E0" }}>
                <span style={{ color: "var(--accent-green)" }}>★</span>
                {a}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
