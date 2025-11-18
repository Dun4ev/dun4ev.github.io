import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GraphData, SkillNode, SkillLink } from '../types';

interface SkillGraphProps {
  data: GraphData;
}

export const SkillGraph: React.FC<SkillGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 500;
    const height = 400;

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("class", "max-w-full h-auto overflow-visible");

    // Add glow defs
    const defs = svg.append("defs");
    const filter = defs.append("filter")
      .attr("id", "glow");
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "2.5")
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const simulation = d3.forceSimulation<SkillNode>(JSON.parse(JSON.stringify(data.nodes)))
      .force("link", d3.forceLink<SkillNode, SkillLink>(JSON.parse(JSON.stringify(data.links))).id(d => d.id).distance(60))
      .force("charge", d3.forceManyBody().strength(-150))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(d => (d as SkillNode).radius + 10));

    const link = svg.append("g")
      .attr("stroke", "#233554")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(JSON.parse(JSON.stringify(data.links)) as SkillLink[])
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

    const nodeGroup = svg.append("g")
      .selectAll("g")
      .data(JSON.parse(JSON.stringify(data.nodes)) as SkillNode[])
      .join("g")
      .call(d3.drag<SVGGElement, SkillNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    nodeGroup.append("circle")
      .attr("r", d => d.radius)
      .attr("fill", d => {
        if (d.group === 1) return "#64ffda"; // Engineering
        if (d.group === 2) return "#8892b0"; // Data
        return "#ccd6f6"; // Mgmt
      })
      .attr("fill-opacity", 0.2)
      .attr("stroke", d => {
        if (d.group === 1) return "#64ffda";
        if (d.group === 2) return "#8892b0";
        return "#ccd6f6";
      })
      .attr("stroke-width", 2)
      .style("filter", "url(#glow)")
      .style("cursor", "pointer");

    const labels = nodeGroup.append("text")
      .text(d => d.id)
      .attr("font-size", d => d.radius < 15 ? "10px" : "12px")
      .attr("fill", "#e2e8f0")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .style("pointer-events", "none")
      .style("text-shadow", "1px 1px 2px #0f172a");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodeGroup
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: SkillNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      (d as any).fx = d.x;
      (d as any).fy = d.y;
    }

    function dragged(event: any, d: SkillNode) {
      (d as any).fx = event.x;
      (d as any).fy = event.y;
    }

    function dragended(event: any, d: SkillNode) {
      if (!event.active) simulation.alphaTarget(0);
      (d as any).fx = null;
      (d as any).fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <div className="my-8 rounded-lg bg-slate-800/30 p-4 border border-slate-700/50 hover:border-teal-500/30 transition-colors">
        <h4 className="text-sm font-semibold text-slate-200 mb-2 uppercase tracking-wider text-center">Skill Interaction Network</h4>
        <div ref={svgRef as any} className="w-full h-[400px]" />
        <div className="flex gap-4 text-xs justify-center mt-2 text-slate-400">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#64ffda] opacity-50"></span>Engineering</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#8892b0] opacity-50"></span>Tech/Data</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#ccd6f6] opacity-50"></span>Management</span>
        </div>
    </div>
  );
};