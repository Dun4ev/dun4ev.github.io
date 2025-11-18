export interface Job {
  id: string;
  company: string;
  title: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tools: string[];
  link?: string;
}

export interface SkillNode {
  id: string;
  group: number; // 1: Engineering, 2: Data/Tech, 3: Management
  radius: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface SkillLink {
  source: string | SkillNode;
  target: string | SkillNode;
  value: number;
}

export interface GraphData {
  nodes: SkillNode[];
  links: SkillLink[];
}