"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Node = { id: string; x: number; y: number; label: string; primary?: boolean };
type Edge = { from: string; to: string };

const NODES: Node[] = [
  { id: "feign",    x: 80,  y: 260, label: "FeignClient" },
  { id: "order",    x: 330, y: 260, label: "Order MS",   primary: true },
  { id: "mongo",    x: 330, y: 430, label: "MongoDB" },
  { id: "rabbit",   x: 580, y: 430, label: "RabbitMQ" },
  { id: "consumer", x: 820, y: 430, label: "Consumers" },
  { id: "search",   x: 580, y: 140, label: "Search MS" },
  { id: "opensrch", x: 820, y: 140, label: "OpenSearch" },
];

const EDGES: Edge[] = [
  { from: "feign",    to: "order"    },
  { from: "order",    to: "mongo"    },
  { from: "order",    to: "rabbit"   },
  { from: "rabbit",   to: "consumer" },
  { from: "order",    to: "search"   },
  { from: "search",   to: "opensrch" },
];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function PacketDot({ from, to, delay = 0 }: { from: string; to: string; delay?: number }) {
  const a = getNode(from);
  const b = getNode(to);
  return (
    <motion.circle
      r={3}
      fill="#00D4FF"
      initial={{ cx: a.x, cy: a.y, opacity: 0 }}
      animate={{
        cx: [a.x, b.x],
        cy: [a.y, b.y],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    />
  );
}

export default function Hero() {
  const scrollRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.style.opacity = scrollRef.current.style.opacity === "0.3" ? "1" : "0.3";
      }
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background topology */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 100 960 480"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.14 }}
        aria-hidden
      >
        {/* Edges */}
        {EDGES.map((e) => {
          const a = getNode(e.from);
          const b = getNode(e.to);
          return (
            <line
              key={`${e.from}-${e.to}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="#00D4FF"
              strokeWidth={1}
              strokeDasharray="6 4"
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x - 52} y={n.y - 18}
              width={104} height={36}
              rx={6}
              fill={n.primary ? "rgba(0,212,255,0.18)" : "rgba(0,212,255,0.08)"}
              stroke={n.primary ? "#00D4FF" : "rgba(0,212,255,0.4)"}
              strokeWidth={1}
            />
            <text
              x={n.x} y={n.y + 5}
              textAnchor="middle"
              fill="#F0F4FF"
              fontSize={11}
              fontFamily="monospace"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* Animated packet dots */}
        {EDGES.map((e, i) => (
          <PacketDot key={`p-${i}`} from={e.from} to={e.to} delay={i * 0.55} />
        ))}
        {EDGES.map((e, i) => (
          <PacketDot key={`p2-${i}`} from={e.from} to={e.to} delay={i * 0.55 + 1.1} />
        ))}
      </svg>

      {/* Gradient overlay so edges don't fight text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(10,15,28,0.55) 0%, rgba(10,15,28,0.1) 100%)",
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.p
          className="text-sm font-mono mb-4 tracking-widest uppercase"
          style={{ color: "var(--accent-cyan)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Lead Engineer
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Donny J{" "}
          <span style={{ color: "var(--accent-cyan)" }}>Mathew</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl font-mono mb-10"
          style={{ color: "var(--text-muted)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Java · Spring Boot · Microservices · AI
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <a
            href="#projects"
            className="px-7 py-3 rounded-full font-semibold text-sm tracking-wide transition-all"
            style={{
              background: "var(--accent-cyan)",
              color: "#0A0F1C",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 24px rgba(0,212,255,0.5)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            View Projects
          </a>
          <button
            onClick={() => document.getElementById("ask-donny")?.click()}
            className="px-7 py-3 rounded-full font-semibold text-sm tracking-wide border transition-all"
            style={{
              borderColor: "var(--accent-cyan)",
              color: "var(--accent-cyan)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,212,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            GET /donny
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, transparent, var(--accent-cyan))" }}
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>scroll</span>
      </motion.div>
    </section>
  );
}
