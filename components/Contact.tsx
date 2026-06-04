"use client";

import { motion } from "framer-motion";
import { profile, acsAssessment } from "@/lib/resume-data";

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.p
          className="text-xs font-mono tracking-widest uppercase mb-2"
          style={{ color: "var(--accent-cyan)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Contact
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Let&apos;s connect
        </motion.h2>

        {/* Australia CTA */}
        <motion.div
          className="rounded-2xl p-8 mb-10 text-center"
          style={{
            background: "rgba(0,212,255,0.06)",
            border: "1px solid rgba(0,212,255,0.2)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="text-5xl mb-4">🇦🇺</div>
          <h3 className="text-xl font-bold text-white mb-2">Available for roles in Australia</h3>
          <p className="text-sm leading-6 mb-5" style={{ color: "var(--text-muted)" }}>
            Actively seeking roles in Sydney or Perth · Open to 482 visa sponsorship
          </p>

          {/* ACS Assessment block */}
          <div
            className="rounded-xl px-5 py-4 text-left inline-block w-full max-w-sm mx-auto"
            style={{ background: "rgba(57,255,20,0.05)", border: "1px solid rgba(57,255,20,0.25)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold" style={{ color: "#39FF14" }}>
                ACS Skills Assessment
              </span>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-full"
                style={{ background: "rgba(57,255,20,0.15)", border: "1px solid rgba(57,255,20,0.4)", color: "#39FF14" }}
              >
                SUITABLE ✓
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {acsAssessment.codes.map((c) => (
                <span
                  key={c.code}
                  className="text-xs font-mono px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "var(--accent-cyan)" }}
                >
                  {c.code} · {c.title}
                </span>
              ))}
            </div>
            <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
              Ref: {acsAssessment.reference} · Valid until {acsAssessment.validUntil}
            </p>
          </div>
        </motion.div>

        {/* Contact links */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 text-sm font-mono transition-colors hover:text-white"
            style={{ color: "var(--accent-cyan)" }}
          >
            <span>✉</span> {profile.email}
          </a>
          <span style={{ color: "var(--text-muted)" }} className="hidden sm:inline">·</span>
          <a
            href={`tel:${profile.phone}`}
            className="flex items-center gap-2 text-sm font-mono transition-colors hover:text-white"
            style={{ color: "var(--accent-cyan)" }}
          >
            <span>📞</span> {profile.phone}
          </a>
          <span style={{ color: "var(--text-muted)" }} className="hidden sm:inline">·</span>
          <a
            href={profile.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-mono transition-colors hover:text-white"
            style={{ color: "var(--accent-cyan)" }}
          >
            <span>in</span> LinkedIn
          </a>
        </motion.div>

        {/* Resume download */}
        <motion.a
          href="/donny-resume.pdf"
          download
          className="inline-flex items-center gap-3 px-8 py-3 rounded-full font-semibold text-sm transition-all"
          style={{
            background: "var(--accent-cyan)",
            color: "#0A0F1C",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileHover={{ boxShadow: "0 0 24px rgba(0,212,255,0.45)" }}
        >
          <span>↓</span> Download Resume PDF
        </motion.a>
      </div>
    </section>
  );
}
