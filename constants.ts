import { Job, Project, GraphData } from './types';

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills & Data', href: '#skills' },
];

export const SOCIAL_LINKS = {
  email: 'andreydunaev1@gmail.com',
  linkedin: 'https://www.linkedin.com/in/andreydunaev',
  phone: '+381698015343'
};

export const JOBS: Job[] = [
  {
    id: 'idc-2',
    company: 'IDC d.o.o.',
    title: 'Chief Engineering Expert (Project Management)',
    period: 'Mar 2022 — Aug 2025',
    location: 'Belgrade, Serbia',
    description: [
      'Provided comprehensive technical support for project and operational documentation, including pre-commissioning for main gas pipelines and compressor stations.',
      'Developed automated Python scripts to generate comment sheets and analyze big data trends for equipment status.',
      'Created detailed equipment maintenance checklists based on manufacturer documentation.',
      'Prepared analytical data and technical conclusions for EPC contract documentation to resolve disputes.',
      'Produced ~120 visual analytical reports comparing design vs. as-built conditions for legal claims.'
    ],
    technologies: ['Python', 'Big Data', 'EPC Contracts', 'Documentation Control', 'Checklist Automation']
  },
  {
    id: 'idc-1',
    company: 'IDC d.o.o.',
    title: 'Chief Engineering Expert (Implementation)',
    period: 'Mar 2019 — Mar 2022',
    location: 'Belgrade, Serbia',
    description: [
      'Coordinated implementation of a 400km main gas pipeline and compressor station.',
      'Oversaw FEED documentation and Detailed Design finalization.',
      'Managed coordination among design institutes (Saipem, Giprogaztsentr, etc.), processing ~20,000 documents.',
      'Implemented MDR/MDI procedures for automated data storage.',
      'Participated in HAZOP reviews and ensured PED, ATEX, Ex, CE compliance.'
    ],
    technologies: ['Project Coordination', 'FEED', 'HAZOP', 'MDR/MDI', 'Vendor Management']
  },
  {
    id: 'gazprom',
    company: 'OOO "Gazprom Invest"',
    title: 'Junior Project Coordinator',
    period: 'Sep 2015 — Sep 2017',
    location: 'St. Petersburg, Russia',
    description: [
      'Coordinated a portfolio of 8+ large-scale gas infrastructure projects valued between $30M and $23B.',
      'Boosted forecast accuracy by 5-10% through validated cost estimates.',
      'Reduced potential timeline slippage by 5-10% through early risk identification.',
      'Maintained ~250 stakeholder meetings with a 93-95% action item completion rate.'
    ],
    technologies: ['Portfolio Management', 'Risk Assessment', 'Cost Estimation', 'Stakeholder Mgmt']
  },
  {
    id: 'kuban',
    company: 'Kubanvodproekt OJSC',
    title: 'Lead Design Engineer',
    period: 'Oct 2014 — Aug 2015',
    location: 'Krasnodar, Russia',
    description: [
      'Participated in creating a new trunk pipeline design department.',
      'Performed technical expertise of design solutions to optimize costs.',
      'Provided technical support to customer inspectors.'
    ],
    technologies: ['Trunk Pipelines', 'Design Optimization', 'Department Setup']
  },
  {
    id: 'yuzh-1',
    company: 'YUZHNIIGIPROGAZ PJSC',
    title: 'Lead Design Engineer',
    period: 'Aug 2008 — Oct 2014',
    location: 'Donetsk, Ukraine',
    description: [
      'Worked on "South Stream" and "Bovanenkovo–Ukhta" GTS.',
      'Implemented 3D design solutions increasing productivity by 50%.',
      'Optimized design processes by linking Excel and AutoCAD.',
      'Designed intake terminals, pig launcher/receivers, and valve assemblies in SolidWorks.'
    ],
    technologies: ['SolidWorks', 'AutoCAD', '3D Modeling', 'South Stream', 'Excel Automation']
  }
];

export const D3_DATA: GraphData = {
  nodes: [
    { id: "Engineering", group: 1, radius: 25 },
    { id: "Project Mgmt", group: 3, radius: 20 },
    { id: "Data & AI", group: 2, radius: 20 },
    { id: "Python", group: 2, radius: 15 },
    { id: "AutoCAD", group: 1, radius: 15 },
    { id: "SolidWorks", group: 1, radius: 15 },
    { id: "Kompas 3D", group: 1, radius: 10 },
    { id: "FEED", group: 1, radius: 12 },
    { id: "EPC", group: 3, radius: 12 },
    { id: "HAZOP", group: 1, radius: 10 },
    { id: "Power Query", group: 2, radius: 12 },
    { id: "Automation", group: 2, radius: 15 },
    { id: "Regulatory", group: 3, radius: 10 },
    { id: "Pipelines", group: 1, radius: 18 },
    { id: "Prompt Eng", group: 2, radius: 12 }
  ],
  links: [
    { source: "Engineering", target: "Pipelines", value: 5 },
    { source: "Engineering", target: "AutoCAD", value: 3 },
    { source: "Engineering", target: "SolidWorks", value: 3 },
    { source: "Engineering", target: "Kompas 3D", value: 2 },
    { source: "Engineering", target: "FEED", value: 4 },
    { source: "Engineering", target: "HAZOP", value: 2 },
    { source: "Project Mgmt", target: "EPC", value: 4 },
    { source: "Project Mgmt", target: "Regulatory", value: 3 },
    { source: "Project Mgmt", target: "Engineering", value: 5 },
    { source: "Data & AI", target: "Python", value: 5 },
    { source: "Data & AI", target: "Power Query", value: 3 },
    { source: "Data & AI", target: "Prompt Eng", value: 4 },
    { source: "Data & AI", target: "Automation", value: 5 },
    { source: "Automation", target: "Engineering", value: 4 },
    { source: "Python", target: "Project Mgmt", value: 2 }, // Analytics for mgmt
    { source: "Data & AI", target: "Project Mgmt", value: 3 },
  ]
};

export const SKILL_METRICS = [
  { name: 'Project Mgmt', value: 95, fullMark: 100 },
  { name: 'Pipeline Design', value: 90, fullMark: 100 },
  { name: 'Python/Automation', value: 75, fullMark: 100 },
  { name: 'Regulatory (ATEX/CE)', value: 85, fullMark: 100 },
  { name: 'Data Analysis', value: 80, fullMark: 100 },
  { name: '3D Modeling', value: 85, fullMark: 100 },
];
