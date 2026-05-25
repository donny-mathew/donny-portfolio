"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { profile, skillChips } from "@/lib/resume-data";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 px-6" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-xs font-mono tracking-widest uppercase mb-2"
          style={{ color: "var(--accent-cyan)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          About
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Who I am
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Photo placeholder */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="w-36 h-36 rounded-2xl flex items-center justify-center text-4xl font-bold"
              style={{
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.25)",
                color: "var(--accent-cyan)",
              }}
            >
              DM
            </div>
          </motion.div>

          {/* Bio */}
          <div className="flex-1">
            <motion.p
              className="text-base leading-8 mb-8"
              style={{ color: "#B8C8E0" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {profile.bio}
            </motion.p>

            {/* Australia badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl mb-10 text-sm font-medium"
              style={{
                background: "rgba(0,212,255,0.07)",
                border: "1px solid rgba(0,212,255,0.25)",
                color: "var(--accent-cyan)",
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-xl">🇦🇺</span>
              <span>{profile.relocation}</span>
            </motion.div>

            {/* Skill chips */}
            <div ref={ref} className="flex flex-wrap gap-3">
              {skillChips.map((chip, i) => (
                <motion.span
                  key={chip}
                  className="px-4 py-1.5 rounded-full text-sm font-mono"
                  style={{
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.3)",
                    color: "var(--accent-cyan)",
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                >
                  {chip}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
