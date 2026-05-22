import { Job, Project, KnowledgeItem, GraphData } from './types';

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills & Data', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Knowledge Base', href: '#knowledge' },
];

export const SOCIAL_LINKS = {
  email: 'andreydunaev1@gmail.com',
  linkedin: 'https://www.linkedin.com/in/andreydunaev',
  phone: '+381698015343'
};

export const JOBS: Job[] = [
  {
    id: 'comita',
    company: 'Comita Technics',
    title: 'Chief Engineering Expert (Planning, Monitoring & Reporting)',
    period: 'Aug 2025 — Present',
    location: 'Serbia',
    description: [
      'Coordinate engineering activities, project monitoring, reporting, RFQ documentation, vendor communication, and follow-up control for energy infrastructure projects.',
      'Connect clients, design institutes, subcontractors, vendors, and internal teams through structured documentation, planning discipline, and reliable reporting.',
      'Prepare and coordinate RFQ packages, support technical clarifications, review vendor inputs, and monitor open issues through closure.',
      'Developed a Python/Django-based internal system for meeting protocols, issue tracking, action item control, task filtering, discussion history, and automated XLSX reporting.',
      'Built tools for maintenance report processing, documentation package preparation, file sorting, Excel-template population, archive generation, and structured logging.'
    ],
    technologies: ['Python', 'Django', 'RFQ Packages', 'Vendor Coordination', 'Issue Tracking', 'XLSX Reporting']
  },
  {
    id: 'idc-2',
    company: 'IDC d.o.o.',
    title: 'Chief Engineering Expert (Project Management)',
    period: 'Mar 2022 — Aug 2025',
    location: 'Belgrade, Serbia',
    description: [
      'Provided comprehensive technical support for project and operational documentation, including pre-commissioning for main gas pipelines and compressor stations.',
      'Reviewed subcontractor reports, monitored recurring maintenance issues, and automated comment sheet generation with Python.',
      'Developed Python-based graphical tools for big data trend analysis and equipment status monitoring.',
      'Created detailed equipment maintenance checklists based on manufacturer documentation.',
      'Prepared analytical data and technical conclusions for EPC contract documentation to resolve disputes.',
      'Produced ~120 visual analytical reports comparing design vs. as-built conditions for legal claims.',
      'Updated ~350 as-built documents, including mechanical drawings, electrical diagrams, instrumentation, automation tables, and settings.'
    ],
    technologies: ['Python', 'Big Data', 'EPC Contracts', 'As-built Docs', 'Checklist Automation']
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
      'Coordinated RFQ processes, procurement packages, and vendor relations to align manufacturers with project requirements.',
      'Participated in HAZOP reviews and ensured PED, ATEX, Ex, CE compliance.'
    ],
    technologies: ['Project Coordination', 'FEED', 'RFQ', 'MDR/MDI', 'Vendor Management']
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

export const PROJECTS: Project[] = [
  {
    id: 'slotbot-booking-landing',
    title: 'SlotBot: Telegram Booking Landing',
    description: 'A static landing page concept for a Telegram-based booking assistant: clients browse services, prices, and available slots, then book directly through Telegram.',
    tools: ['HTML', 'Landing Page', 'Telegram Bot', 'Booking Automation', 'Static Site'],
    link: 'https://dun4ev.github.io/slotbot-booking-landing/',
    image: '/images/projects/slotbot-booking-landing.png',
    category: 'Interactive Web App',
    role: 'Concept Designer',
    status: 'Demo Landing',
    impact: 'Shows how a small business can combine a static website with Telegram booking to reduce manual scheduling'
  },
  {
    id: 'electricity-theft-detector',
    title: 'EnergyGuard AI: Electricity Theft Detector',
    description: 'An interactive MVP concept for non-invasive electricity theft detection using feeder balance, pole-mounted split sensors, UAV thermal inspection, GIS topology, and AI-assisted anomaly localization.',
    tools: ['HTML', 'Interactive UI', 'Energy Analytics', 'GIS', 'AI Concept'],
    link: 'https://dun4ev.github.io/electricity-theft-detector/index.html',
    image: '/images/projects/pipeline-analytics.png',
    category: 'Interactive Web App',
    role: 'Concept Designer',
    status: 'MVP Concept',
    impact: 'Demonstrates a practical architecture for detecting commercial electricity losses without entering private properties'
  },
  {
    id: 'auto-comment-sheets',
    title: 'TOiR Reporting Automation',
    description: 'A Python-based automation tool designed to streamline the creation of engineering reports and technical documentation.',
    tools: ['Python', 'Pandas', 'OpenPyXL', 'Automation'],
    link: 'https://github.com/Dun4ev/toir_tra_report',
    image: '/images/projects/documentation-generator.png',
    category: 'Automation',
    role: 'Creator',
    status: 'Production-ready',
    impact: 'Reduced routine report preparation from minutes to seconds'
  },
  {
    id: 'pipeline-analytics',
    title: 'TOiR Documentation Dispatcher',
    description: 'An intelligent Python utility for automatically distributing incoming project PDF reports into target directories with automated transliteration and logging.',
    tools: ['Python', 'Tkinter', 'JSONL', 'Automation'],
    link: 'https://github.com/Dun4ev/toir_raspredelenije_report',
    image: '/images/projects/pipeline-analytics.png',
    category: 'Documentation',
    role: 'Creator',
    status: 'Internal tool',
    impact: 'Automated PDF routing and operation logging for engineering document flows'
  },
  {
    id: 'portfolio-v2',
    title: 'AI-Powered PDF Search Engine',
    description: 'A semantic search and question-answering system for PDF documents using RAG architecture and LLMs.',
    tools: ['Python', 'LLM', 'RAG', 'FAISS', 'LangChain'],
    link: 'https://github.com/Dun4ev/ai-pdf-search-system',
    image: '/images/projects/portfolio-website.png',
    category: 'AI / RAG',
    role: 'Creator',
    status: 'Prototype',
    impact: 'Turns local technical PDFs into searchable, grounded answers'
  },
  {
    id: 'graf-html',
    title: 'Interactive Trend Visualization',
    description: 'A Python-based toolkit for converting raw Excel/CSV data into interactive HTML plots using Dash and Plotly.',
    tools: ['Python', 'Dash', 'Plotly', 'Pandas'],
    link: 'https://github.com/Dun4ev/graf_html',
    image: '/images/projects/pipeline-analytics.png',
    category: 'Data Visualization',
    role: 'Creator',
    status: 'Reusable toolkit',
    impact: 'Converts raw Excel and CSV data into interactive engineering trend views'
  }
];

export const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: 'karpathy-agent-guide',
    title: 'Software Engineering Agent Guide',
    description: 'A visual guide to working with AI coding agents: task definition, planning, iterative delivery, quality checks, integration, and follow-up improvement loops.',
    category: 'AI Agents',
    format: 'Interactive HTML',
    href: '/knowledge-base/karpathy-agent-guide/index.html',
    tags: ['AI Agents', 'Coding Workflow', 'Delivery', 'Quality Checks']
  }
];

export const D3_DATA: GraphData = {
  nodes: [
    // Groups: 1=Engineering, 2=Data/Tech, 3=Management
    { id: "Engineering", group: 1, radius: 30 },
    { id: "Project Mgmt", group: 3, radius: 25 },
    { id: "Data & AI", group: 2, radius: 25 },

    // Engineering
    { id: "Gas Pipelines", group: 1, radius: 18 },
    { id: "Compressor St.", group: 1, radius: 18 },
    { id: "UGS", group: 1, radius: 14 },
    { id: "FEED", group: 1, radius: 15 },
    { id: "Detailed Design", group: 1, radius: 15 },
    { id: "HAZOP", group: 1, radius: 12 },
    { id: "Regulatory", group: 1, radius: 15 }, // PED, ATEX, CE
    { id: "3D Modeling", group: 1, radius: 15 },

    // Tech / Tools
    { id: "Python", group: 2, radius: 18 },
    { id: "Big Data", group: 2, radius: 15 },
    { id: "Power Query", group: 2, radius: 15 },
    { id: "Automation", group: 2, radius: 18 },
    { id: "Prompt Eng", group: 2, radius: 15 },
    { id: "Django", group: 2, radius: 12 },
    { id: "AutoCAD", group: 1, radius: 12 },
    { id: "SolidWorks", group: 1, radius: 12 },
    { id: "Kompas 3D", group: 1, radius: 10 },

    // Management
    { id: "EPC Contracts", group: 3, radius: 15 },
    { id: "Stakeholder Mgmt", group: 3, radius: 15 },
    { id: "RFQ Packages", group: 3, radius: 14 },
    { id: "Vendor Docs", group: 3, radius: 14 },
    { id: "Issue Tracking", group: 3, radius: 14 },
    { id: "Planning & Reporting", group: 3, radius: 14 },
    { id: "Risk Mgmt", group: 3, radius: 12 },
    { id: "Doc Control", group: 3, radius: 12 }, // MDR/MDI
    { id: "Cost Est.", group: 3, radius: 12 }
  ],
  links: [
    // Engineering Center
    { source: "Engineering", target: "Gas Pipelines", value: 5 },
    { source: "Engineering", target: "Compressor St.", value: 5 },
    { source: "Engineering", target: "UGS", value: 3 },
    { source: "Engineering", target: "FEED", value: 4 },
    { source: "Engineering", target: "Detailed Design", value: 4 },
    { source: "Engineering", target: "Regulatory", value: 3 },
    { source: "Engineering", target: "3D Modeling", value: 4 },
    { source: "Engineering", target: "HAZOP", value: 3 },

    // 3D Modeling Tools
    { source: "3D Modeling", target: "AutoCAD", value: 3 },
    { source: "3D Modeling", target: "SolidWorks", value: 3 },
    { source: "3D Modeling", target: "Kompas 3D", value: 2 },

    // Mgmt Center
    { source: "Project Mgmt", target: "Engineering", value: 5 },
    { source: "Project Mgmt", target: "EPC Contracts", value: 4 },
    { source: "Project Mgmt", target: "Stakeholder Mgmt", value: 4 },
    { source: "Project Mgmt", target: "RFQ Packages", value: 4 },
    { source: "Project Mgmt", target: "Vendor Docs", value: 4 },
    { source: "Project Mgmt", target: "Issue Tracking", value: 4 },
    { source: "Project Mgmt", target: "Planning & Reporting", value: 4 },
    { source: "Project Mgmt", target: "Risk Mgmt", value: 3 },
    { source: "Project Mgmt", target: "Doc Control", value: 3 },
    { source: "Project Mgmt", target: "Cost Est.", value: 3 },

    // Data Center
    { source: "Data & AI", target: "Python", value: 5 },
    { source: "Data & AI", target: "Big Data", value: 4 },
    { source: "Data & AI", target: "Power Query", value: 4 },
    { source: "Data & AI", target: "Automation", value: 5 },
    { source: "Data & AI", target: "Prompt Eng", value: 4 },
    { source: "Data & AI", target: "Django", value: 3 },

    // Cross-Domain
    { source: "Automation", target: "Doc Control", value: 4 }, // Python for docs
    { source: "Automation", target: "Engineering", value: 3 }, // Checklists
    { source: "Automation", target: "Issue Tracking", value: 3 },
    { source: "Vendor Docs", target: "RFQ Packages", value: 3 },
    { source: "Big Data", target: "Risk Mgmt", value: 3 }, // Analytics for risk
    { source: "Data & AI", target: "Project Mgmt", value: 3 },
    { source: "Regulatory", target: "Doc Control", value: 2 },
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
