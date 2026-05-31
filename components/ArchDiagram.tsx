"use client";

import { memo, useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  MiniMap,
  NodeMouseHandler,
  Position,
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

const handleStyle = { opacity: 0, width: 8, height: 8 };

const SubLabelNode = memo(({ data }: { data: { label: string; sublabel?: string } }) => (
  <>
    <Handle type="target" position={Position.Top}    id="t"  style={handleStyle} />
    <Handle type="target" position={Position.Left}   id="tl" style={handleStyle} />
    <Handle type="target" position={Position.Right}  id="tr" style={handleStyle} />
    <Handle type="target" position={Position.Bottom} id="tb" style={handleStyle} />
    <div style={{ fontWeight: 600 }}>{data.label}</div>
    {data.sublabel && (
      <div style={{ fontSize: "10px", opacity: 0.7, marginTop: 3 }}>{data.sublabel}</div>
    )}
    <Handle type="source" position={Position.Bottom} id="s"  style={handleStyle} />
    <Handle type="source" position={Position.Right}  id="sr" style={handleStyle} />
    <Handle type="source" position={Position.Left}   id="sl" style={handleStyle} />
    <Handle type="source" position={Position.Top}    id="st" style={handleStyle} />
  </>
));
SubLabelNode.displayName = "SubLabelNode";

const nodeTypes = { subLabel: SubLabelNode };

export default function ArchDiagram({ nodes: initNodes, edges: initEdges }: ArchDiagramProps) {
  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, , onEdgesChange] = useEdgesState(initEdges);
  const [tooltip, setTooltip] = useState<{ title: string; text: string } | null>(null);

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    const tip = nodeTooltips[node.id];
    if (tip) {
      const title = typeof node.data.label === "string" ? node.data.label : node.id;
      setTooltip({ title, text: tip });
    }
  }, []);

  return (
    <div className="relative w-full" style={{ height: 540 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={() => setTooltip(null)}
        nodesDraggable={false}
        fitView
        fitViewOptions={{ padding: 0.2 }}
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
          className="absolute z-50 max-w-sm rounded-xl shadow-xl pointer-events-none"
          style={{
            background: "rgba(10,15,28,0.97)",
            border: "1px solid rgba(0,212,255,0.35)",
            color: "#B8C8E0",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "14px 18px",
            width: "clamp(260px, 90%, 400px)",
          }}
        >
          <div
            className="font-mono font-semibold mb-1"
            style={{ color: "var(--accent-cyan)", fontSize: "13px" }}
          >
            {tooltip.title}
          </div>
          <div className="mb-2" style={{ color: "#4a6a8a", fontSize: "10px" }}>
            Why this choice?
          </div>
          <div style={{ fontSize: "12px", lineHeight: 1.6 }}>{tooltip.text}</div>
          <button
            className="pointer-events-auto absolute top-2 right-3 text-xs"
            style={{ color: "#4a6a8a" }}
            onClick={() => setTooltip(null)}
          >
            ✕
          </button>
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
