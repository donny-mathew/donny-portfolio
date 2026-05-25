"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/resume-data";

function SkillBar({ name, level, inView, delay }: { name: string; level: number; inView: boolean; delay: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-mono" style={{ color: "#C8D8F0" }}>{name}</span>
        <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, var(--accent-cyan), rgba(0,212,255,0.5))`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="py-28 px-6" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-xs font-mono tracking-widest uppercase mb-2"
          style={{ color: "var(--accent-cyan)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Skills
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Technical Expertise
        </motion.h2>

        <div ref={ref} className="grid sm:grid-cols-2 gap-x-16 gap-y-8">
          {skills.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.1 }}
            >
              <h3
                className="text-xs font-mono tracking-widest uppercase mb-5"
                style={{ color: "var(--accent-green)" }}
              >
                {group.group}
              </h3>
              {group.items.map((item, ii) => (
                <SkillBar
                  key={item.name}
                  name={item.name}
                  level={item.level}
                  inView={inView}
                  delay={gi * 0.1 + ii * 0.08}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
