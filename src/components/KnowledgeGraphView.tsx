import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Filter,
  Layers,
  FileCheck,
  ShieldAlert,
  Plus,
  ExternalLink,
  Info
} from 'lucide-react';
import { GRAPH_NODES, GRAPH_EDGES } from '../data/standardsData';
import { GraphNode, GraphEdge } from '../types';

export const KnowledgeGraphView: React.FC = () => {
  const [nodes, setNodes] = useState<GraphNode[]>(GRAPH_NODES);
  const [edges] = useState<GraphEdge[]>(GRAPH_EDGES);
  const [selectedNode, setSelectedNode] = useState<GraphNode>(GRAPH_NODES[0]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyCurrent, setOnlyCurrent] = useState(false);
  const [onlyMandatory, setOnlyMandatory] = useState(false);
  const [addedToReport, setAddedToReport] = useState<Record<string, boolean>>({});

  const getNodeColor = (type: GraphNode['type']) => {
    switch (type) {
      case 'primary':
        return { fill: '#123B63', border: '#0B2447', text: '#FFFFFF', ring: 'ring-blue-400' };
      case 'related':
        return { fill: '#16A34A', border: '#14532d', text: '#FFFFFF', ring: 'ring-green-400' };
      case 'certification':
        return { fill: '#F59E0B', border: '#b45309', text: '#0B2447', ring: 'ring-amber-400' };
      case 'test':
        return { fill: '#8B5CF6', border: '#6d28d9', text: '#FFFFFF', ring: 'ring-purple-400' };
      case 'superseded':
        return { fill: '#64748B', border: '#334155', text: '#FFFFFF', ring: 'ring-slate-400' };
      case 'warning':
        return { fill: '#DC2626', border: '#991b1b', text: '#FFFFFF', ring: 'ring-red-400' };
    }
  };

  const filteredNodes = nodes.filter((n) => {
    if (searchQuery && !n.isNumber.toLowerCase().includes(searchQuery.toLowerCase()) && !n.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (onlyCurrent && (n.type === 'superseded' || n.status.includes('Superseded'))) {
      return false;
    }
    return true;
  });

  const filteredEdges = edges.filter((e) => {
    if (onlyMandatory && !e.isMandatory) return false;
    if (onlyCurrent && e.target === 'node-superseded') return false;
    return true;
  });

  const handleAddToReport = (id: string) => {
    setAddedToReport((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-white border border-[#D9E1EA] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search node by IS number or keyword..."
              className="w-full text-xs pl-8 pr-3 py-1.5 bg-[#F5F7FA] border border-[#D9E1EA] rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#123B63]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyCurrent}
              onChange={(e) => setOnlyCurrent(e.target.checked)}
              className="w-3.5 h-3.5 text-[#123B63] rounded border-slate-300"
            />
            <span className="text-slate-700 font-medium">Show only current standards</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyMandatory}
              onChange={(e) => setOnlyMandatory(e.target.checked)}
              className="w-3.5 h-3.5 text-[#123B63] rounded border-slate-300"
            />
            <span className="text-slate-700 font-medium">Show only mandatory links</span>
          </label>

          <div className="flex items-center gap-1 border-l border-slate-200 pl-3">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.5))}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.7))}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setSearchQuery('');
                setOnlyCurrent(false);
                setOnlyMandatory(false);
              }}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas + Right Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Interactive SVG Knowledge Graph */}
        <div className="lg:col-span-2 bg-[#F8FAFC] border border-[#D9E1EA] rounded-xl overflow-hidden shadow-sm relative min-h-[480px] flex flex-col justify-between">
          <div className="p-3 bg-white/80 backdrop-blur-xs border-b border-[#D9E1EA] flex items-center justify-between text-xs z-10">
            <span className="font-bold text-[#0B2447] flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#123B63]" />
              Interactive Standards Ontological Network
            </span>
            <span className="text-slate-500 font-mono-numbers text-[11px]">
              Zoom: {Math.round(zoomLevel * 100)}% · Click node for details
            </span>
          </div>

          {/* SVG Canvas Area */}
          <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
            <svg
              viewBox="0 0 800 520"
              className="w-full h-full max-h-[480px] transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <defs>
                {/* Marker for edges */}
                <marker
                  id="arrowhead"
                  markerWidth="8"
                  markerHeight="6"
                  refX="18"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="#94A3B8" />
                </marker>
                <marker
                  id="arrowhead-mandatory"
                  markerWidth="8"
                  markerHeight="6"
                  refX="18"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="#123B63" />
                </marker>
              </defs>

              {/* Render Edges */}
              {filteredEdges.map((edge, i) => {
                const src = nodes.find((n) => n.id === edge.source);
                const tgt = nodes.find((n) => n.id === edge.target);
                if (!src || !tgt) return null;

                const midX = (src.x + tgt.x) / 2;
                const midY = (src.y + tgt.y) / 2;

                return (
                  <g key={i}>
                    <line
                      x1={src.x}
                      y1={src.y}
                      x2={tgt.x}
                      y2={tgt.y}
                      stroke={edge.isMandatory ? '#123B63' : '#94A3B8'}
                      strokeWidth={edge.isMandatory ? 2.5 : 1.5}
                      strokeDasharray={edge.relationshipType === 'Supersedes' ? '4 4' : 'none'}
                      markerEnd={edge.isMandatory ? 'url(#arrowhead-mandatory)' : 'url(#arrowhead)'}
                    />
                    {/* Relationship label */}
                    <rect
                      x={midX - 35}
                      y={midY - 9}
                      width="70"
                      height="16"
                      rx="3"
                      fill="#FFFFFF"
                      stroke="#E2E8F0"
                    />
                    <text
                      x={midX}
                      y={midY + 3}
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="bold"
                      fill="#475569"
                    >
                      {edge.relationshipType}
                    </text>
                  </g>
                );
              })}

              {/* Render Nodes */}
              {filteredNodes.map((node) => {
                const colors = getNodeColor(node.type);
                const isSelected = selectedNode?.id === node.id;

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer transition-transform hover:scale-105"
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  >
                    {/* Glow on select */}
                    {isSelected && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.radius + 8}
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="3"
                        strokeDasharray="3 3"
                        className="animate-pulse"
                      />
                    )}

                    {/* Main Circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.radius}
                      fill={colors.fill}
                      stroke={colors.border}
                      strokeWidth="2.5"
                    />

                    {/* Node Text */}
                    <text
                      x={node.x}
                      y={node.y - 4}
                      textAnchor="middle"
                      fontSize={node.type === 'primary' ? '11' : '9.5'}
                      fontWeight="bold"
                      fill={colors.text}
                    >
                      {node.isNumber}
                    </text>

                    <text
                      x={node.x}
                      y={node.y + 11}
                      textAnchor="middle"
                      fontSize="7.5"
                      fill={colors.text}
                      opacity="0.9"
                    >
                      {node.status}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Graph Legend as per PDF */}
          <div className="p-3 bg-white border-t border-[#D9E1EA] flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-600">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold text-[#0B2447]">Node Types:</span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#123B63]" /> Primary
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" /> Current Allied
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> Certification (QCO)
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" /> Test Method
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#64748B]" /> Superseded
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" /> Warning / Amendment
              </span>
            </div>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-3">
              <span className="font-bold text-[#0B2447]">Relationships:</span>
              <span>Normative Reference</span>
              <span>·</span>
              <span>Test Method</span>
              <span>·</span>
              <span>Supersedes</span>
            </div>
          </div>
        </div>

        {/* Right-Side Detail Panel as per PDF Section 10 */}
        <div className="bg-white border border-[#D9E1EA] rounded-xl shadow-sm p-5 flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Node Specification Inspector
                </div>
                <div className="text-base font-extrabold text-[#0B2447] mt-1">
                  {selectedNode.isNumber}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-0.5">
                  {selectedNode.title}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase">Current Status</span>
                <div className="mt-1">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${
                      selectedNode.status.includes('Current')
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedNode.status.includes('Superseded')
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {selectedNode.status}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase">Why It Matters</span>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed bg-[#F5F7FA] p-3 rounded-lg border border-slate-200">
                  {selectedNode.whyItMatters}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase">Official Source</span>
                <div className="text-xs text-slate-800 font-medium mt-1 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-[#123B63]" />
                  <span>{selectedNode.officialSource}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleAddToReport(selectedNode.id)}
                  disabled={addedToReport[selectedNode.id]}
                  className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 ${
                    addedToReport[selectedNode.id]
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'bg-[#123B63] hover:bg-[#0B2447] text-white shadow-sm'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>
                    {addedToReport[selectedNode.id] ? 'Added to Tender Annexure' : 'Add to Tender Report'}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Click any node in the knowledge network to inspect its regulatory properties.
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Relationships are indexed from BIS committee normative cross-reference indices.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
