"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { profile, skillChips, acsAssessment } from "@/lib/resume-data";
import GeometricAvatar from "@/components/GeometricAvatar";

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
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GeometricAvatar size={160} />
          </motion.div>

          {/* Bio */}
          <div className="flex-1">
            <motion.div
              className="space-y-4 mb-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {profile.bio.split("\n\n").map((para, i) => (
                <p key={i} className="text-base leading-8" style={{ color: "#B8C8E0" }}>
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Australia / ACS badge */}
            <motion.div
              className="rounded-xl px-5 py-4 mb-10 inline-block"
              style={{
                background: "rgba(0,212,255,0.07)",
                border: "1px solid rgba(0,212,255,0.25)",
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 text-sm font-medium mb-3" style={{ color: "var(--accent-cyan)" }}>
                <span className="text-xl">🇦🇺</span>
                <span>{profile.relocation}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(57,255,20,0.12)", border: "1px solid rgba(57,255,20,0.4)", color: "#39FF14" }}
                >
                  ACS Approved ✓
                </span>
                {acsAssessment.codes.map((c) => (
                  <span
                    key={c.code}
                    className="text-xs font-mono px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "var(--accent-cyan)" }}
                  >
                    {c.code} {c.title}
                  </span>
                ))}
              </div>
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
