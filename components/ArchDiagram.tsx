"use client";

import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  NodeMouseHandler,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import type { Node, Edge } from "reactflow";
import { nodeTooltips } from "@/lib/diagram-configs";

interface ArchDiagramProps {
  nodes: Node[];
  edges: Edge[];
}

export default function ArchDiagram({ nodes: initNodes, edges: initEdges }: ArchDiagramProps) {
  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, , onEdgesChange] = useEdgesState(initEdges);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    const tip = nodeTooltips[node.id];
    if (tip) {
      setTooltip({ text: tip, x: node.position.x, y: node.position.y });
    }
  }, []);

  return (
    <div className="relative w-full" style={{ height: 420 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={() => setTooltip(null)}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        proOptions={{ hideAttribution: true }}
        style={{ background: "transparent" }}
      >
        <Background color="rgba(0,212,255,0.06)" gap={24} />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={() => "rgba(0,212,255,0.3)"}
          maskColor="rgba(10,15,28,0.7)"
          style={{
            background: "rgba(10,15,28,0.8)",
            border: "1px solid rgba(0,212,255,0.2)",
            borderRadius: 8,
          }}
        />
      </ReactFlow>

      {tooltip && (
        <div
          className="absolute z-50 max-w-xs rounded-xl p-4 text-sm shadow-xl pointer-events-none"
          style={{
            background: "rgba(10,15,28,0.95)",
            border: "1px solid rgba(0,212,255,0.4)",
            color: "#B8C8E0",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div
            className="text-xs font-mono mb-1"
            style={{ color: "var(--accent-cyan)" }}
          >
            Why this choice?
          </div>
          {tooltip.text}
        </div>
      )}

      <p
        className="absolute bottom-1 right-20 text-xs font-mono pointer-events-none"
        style={{ color: "var(--text-muted)", opacity: 0.6 }}
      >
        click a node to learn more
      </p>
    </div>
  );
}
