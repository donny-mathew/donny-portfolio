"use client";

import { motion } from "framer-motion";

export default function GeometricAvatar({ size = 160 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Donny J Mathew — geometric avatar"
    >
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#0F1E35" />
          <stop offset="100%" stopColor="#060A13" />
        </radialGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="hexClip">
          <polygon points="100,8 186,54 186,146 100,192 14,146 14,54" />
        </clipPath>
      </defs>

      {/* ── Background hex ── */}
      <polygon
        points="100,8 186,54 186,146 100,192 14,146 14,54"
        fill="url(#bgGrad)"
        stroke="rgba(0,212,255,0.35)"
        strokeWidth="1.2"
      />

      {/* ── Inner facets (clipped to hex) ── */}
      <g clipPath="url(#hexClip)">
        {/* Top-left dark triangle */}
        <polygon points="14,54 100,8 100,100" fill="rgba(0,60,140,0.25)" />
        {/* Top-right mid triangle */}
        <polygon points="100,8 186,54 100,100" fill="rgba(0,100,180,0.18)" />
        {/* Right triangle */}
        <polygon points="186,54 186,146 100,100" fill="rgba(0,40,100,0.22)" />
        {/* Bottom-right triangle */}
        <polygon points="186,146 100,192 100,100" fill="rgba(0,80,160,0.2)" />
        {/* Bottom-left triangle */}
        <polygon points="100,192 14,146 100,100" fill="rgba(0,50,120,0.25)" />
        {/* Left triangle */}
        <polygon points="14,146 14,54 100,100" fill="rgba(0,70,150,0.2)" />

        {/* Sub-facet accents — top half */}
        <polygon points="100,8 143,31 100,54" fill="rgba(0,212,255,0.07)" />
        <polygon points="57,31 100,8 100,54" fill="rgba(0,150,220,0.05)" />
        <polygon points="143,31 186,54 143,77" fill="rgba(0,120,200,0.07)" />
        <polygon points="14,54 57,31 57,77" fill="rgba(0,100,180,0.07)" />

        {/* Sub-facet accents — bottom half */}
        <polygon points="100,192 57,169 100,146" fill="rgba(0,212,255,0.06)" />
        <polygon points="143,169 100,192 100,146" fill="rgba(0,150,220,0.04)" />

        {/* Center glow blob */}
        <circle cx="100" cy="96" r="52" fill="url(#centerGlow)" />
      </g>

      {/* ── Inner hex ring ── */}
      <polygon
        points="100,36 164,72 164,128 100,164 36,128 36,72"
        fill="none"
        stroke="rgba(0,212,255,0.18)"
        strokeWidth="0.8"
      />

      {/* ── Vertex dots on outer hex ── */}
      {[
        [100, 8], [186, 54], [186, 146],
        [100, 192], [14, 146], [14, 54],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={2.8}
          fill="#00D4FF"
          opacity={i < 2 ? 0.8 : 0.45}
          filter="url(#glow)"
        />
      ))}

      {/* ── Spokes from center to top 3 vertices ── */}
      {[[100, 8], [186, 54], [14, 54]].map(([x, y], i) => (
        <line
          key={i}
          x1="100" y1="100"
          x2={x} y2={y}
          stroke="rgba(0,212,255,0.12)"
          strokeWidth="0.6"
          strokeDasharray="3 4"
        />
      ))}

      {/* ── Animated pulse ring ── */}
      <motion.circle
        cx="100"
        cy="100"
        r="38"
        fill="none"
        stroke="rgba(0,212,255,0.45)"
        strokeWidth="1"
        animate={{ r: [34, 40, 34], opacity: [0.5, 0.15, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Static inner ring ── */}
      <circle
        cx="100"
        cy="100"
        r="34"
        fill="rgba(0,212,255,0.05)"
        stroke="rgba(0,212,255,0.3)"
        strokeWidth="1"
      />

      {/* ── Monogram ── */}
      <text
        x="100"
        y="107"
        textAnchor="middle"
        fontFamily="'JetBrains Mono', 'Courier New', monospace"
        fontSize="26"
        fontWeight="700"
        fill="#00D4FF"
        filter="url(#glow)"
        letterSpacing="2"
      >
        DM
      </text>

      {/* ── Outer border accent ── */}
      <polygon
        points="100,8 186,54 186,146 100,192 14,146 14,54"
        fill="none"
        stroke="rgba(0,212,255,0.12)"
        strokeWidth="4"
      />
    </svg>
  );
}
