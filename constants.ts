import { Job, ExperienceStage, Project, KnowledgeItem, ArticleItem, LabItem, GraphData } from './types';

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills & Data', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Writing', href: '#writing' },
];

export const SOCIAL_LINKS = {
  email: 'andreydunaev1@gmail.com',
  linkedin: 'https://www.linkedin.com/in/andreydunaev',
  phone: '+381698015343'
};

export const JOBS: Job[] = [
  {
    id: 'comita',
    company: 'Comita Technics d.o.o.',
    title: 'Chief Engineering Expert in the Planning, Monitoring, and Reporting Group',
    period: 'Aug 2025 — Present',
    location: 'Belgrade, Serbia',
    description: [
      'Review multidisciplinary design packages and contractor proposals. Work with several design institutes, contractors and suppliers to resolve discrepancies across piping, civil, electrical and instrumentation drawings.',
      'Built a semi-automated workflow that tracks vendor document revisions, flags missing deliverables, consolidates comments and prepares transmittals. A team member checks and sends each outgoing package.',
      'Built a searchable master document register (MDR) with about 2,000-2,500 entries. It cross-checks files against the client’s register and directs engineers to the current revision on SharePoint.',
      'Automated the preparation of technical queries (TQRs) and linked them to project records in Obsidian. Used the workflow to prepare, track and issue 38 queries by November 2026.',
      'Automated distribution of reviewed maintenance reports. In one batch of about 100 reports, routing took 5-10 seconds compared with about 29 minutes manually.',
    ],
    technologies: ['Technical Review', 'Vendor Documentation', 'MDR', 'TQR', 'Python', 'Excel']
  },
  {
    id: 'idc',
    company: 'IDC d.o.o.',
    title: 'Chief Engineering Expert',
    period: 'Mar 2019 — Aug 2025',
    location: 'Belgrade, Serbia',
    description: [
      'Project Management Department, Mar 2022 - Aug 2025. Project Implementation Department, Mar 2019 - Mar 2022.',
      'Reviewed piping, mechanical and civil drawings for consistency. Cross-checked P&IDs, instrumentation documents and vendor data against purchased and delivered equipment. Worked with designers to correct discrepancies.',
      'Revised about 350 design and as-built documents. In Vojvodina, checked pipeline as-built drawings (PIO) against survey data for levels and clearances. Prepared field sketches and redlines for foundation and utility discrepancies.',
      'Coordinated front-end engineering design (FEED) and detailed design for a compressor station and a 400 km gas pipeline section. Worked across design institutes and provided engineering support for gas metering and block valve stations.',
      'Coordinated requests for quotation (RFQs) and technical clarifications with more than 30 suppliers. Assembled equipment certification dossiers and supported commissioning documentation.',
      'Prepared about 120 illustrated technical reports comparing design documents with as-built conditions for the legal team\'s review of EPC claims and counterclaims.',
    ],
    technologies: ['Piping and Civil Drawings', 'FEED', 'Redlines', 'PIO', 'MDR/MDI']
  },
  {
    id: 'gazprom',
    company: 'Gazprom Invest Ltd.',
    title: 'Chief Specialist, Design and Survey Works',
    period: 'Sep 2015 — Sep 2017',
    location: 'St. Petersburg, Russia',
    description: [
      'Supported planning, schedule coordination, cost-estimate reviews and contractor reporting for gas infrastructure design work, including pipeline, compressor and pumping station projects.',
      'Maintained technical correspondence, tracked contractual deliverables and recorded meeting decisions and follow-up actions.',
    ],
    technologies: ['Gas Infrastructure', 'Design and Survey Works', 'Cost Estimate Review']
  },
  {
    id: 'kuban',
    company: 'Kubanvodproekt JSC',
    title: 'Lead Design Engineer for Pipeline Systems',
    period: 'Oct 2014 — Jul 2015',
    location: 'Krasnodar, Russia',
    description: [
      'Helped establish a pipeline design department and led a team of design engineers.',
      'Prepared design documentation, specifications and calculations. Reviewed engineering solutions and resolved technical questions with clients and inspectors.',
    ],
    technologies: ['Pipeline Systems', 'Engineering Design', 'Design Review']
  },
  {
    id: 'yuzh-1',
    company: 'YUZHNIIGIPROGAZ',
    title: 'Pipeline Systems Design',
    period: 'Aug 2006 — Oct 2014',
    location: 'Donetsk, Ukraine',
    description: [
      'Lead Design Engineer for Pipeline Systems, Jul 2013 - Oct 2014. Design Engineer for Pipeline Systems (Category II), Oct 2008 - Jun 2013. Design Engineer for Pipeline Systems, Aug 2006 - Sep 2008.',
      'Designed piping and equipment layouts in AutoCAD and SolidWorks. Routed pipework, selected valves and actuators, laid out supports and prepared design inputs for civil engineers.',
      'Built parametric SolidWorks libraries for piping and valve assemblies. Changing a diameter updated the linked components and specifications. Used the models to produce drawings and material take-offs.',
      'Produced the 3D piping model, drawings and specifications for a proposed gas receiving terminal in Bulgaria. Also provided site design support on construction projects in northern Russia.',
    ],
    technologies: ['AutoCAD', 'SolidWorks', 'Piping Layout', 'Parametric Libraries']
  }
];

export const EXPERIENCE_STAGES: ExperienceStage[] = [
  {
    id: 'delivery',
    jobIds: ['comita', 'idc'],
  },
  {
    id: 'coordination',
    jobIds: ['gazprom'],
  },
  {
    id: 'design',
    jobIds: ['kuban', 'yuzh-1'],
  },
];

export const BLACKBURN_FLIGHT: Project = {
  id: 'blackburn-flight',
  title: 'Blackburn Type D (1912)',
  description: 'Inspect the wooden frame, then fly the monoplane from its open cockpit. Pass through four rings to see photographs of the original aircraft and follow its story.',
  tools: ['Blender', 'Three.js', 'GPT-6.2 Astra'],
  link: 'https://blackburn-flight.pages.dev/?fly=1',
  image: '/images/projects/blackburn-flight.webp',
  imageWidth: 960,
  imageHeight: 540,
  category: 'Interactive Demo',
};

export const PROJECTS: Project[] = [
  {
    id: 'tabverta',
    title: 'Tabverta',
    description: 'A published Chrome extension that replaces the new tab with a customizable dashboard: search, top-site shortcuts, city weather and a background map, market charts and optional RSS news. Includes dark and light themes, adjustable map visibility and blur, and English, Russian and Serbian interfaces. Settings stay in the browser profile; no Tabverta account is required.',
    tools: ['JavaScript', 'Chrome Extensions', 'MapLibre', 'Open-Meteo', 'RSS'],
    link: 'https://chromewebstore.google.com/detail/lbdlpjddmimegoodhdicokeemllppjdm',
    image: '/images/projects/tabverta.webp',
    imageWidth: 1280,
    imageHeight: 800,
    category: 'Browser Extension',
    role: 'Design & Development',
    status: 'Published on Chrome Web Store',
    impact: 'Brings everyday information into one new tab while keeping the existing Chrome search provider.'
  },
  {
    id: 'action-register',
    title: 'Action Register',
    description: 'A bilingual web app for tracking team actions, deadlines and outcomes. Managers review progress and accept completed work; registrars maintain records; employees see their assigned tasks. Includes a table, a drag-and-drop board, comments and email-to-draft import.',
    tools: ['JavaScript', 'Node.js', 'Cloudflare Workers', 'D1', 'Workflow UX', 'EN / RU'],
    link: 'https://action-register-demo.andreydunaev1.workers.dev/',
    caseStudy: '/projects/action-register/',
    image: '/images/projects/action-register.png',
    imageWidth: 1280,
    imageHeight: 720,
    category: 'Interactive Demo',
    role: 'Design & Development',
    status: 'Live Demo / Fictional Data',
    impact: 'Brings assignments, deadlines and the latest update into one shared workflow instead of separate spreadsheet extracts.'
  },
  {
    id: 'pizza-tt426-3d',
    title: 'Pizza TT426 3D · Codex',
    description: 'Built with Codex GPT-6.1 Sol (High) from a 2D equipment plan. Explore 57 equipment objects and labels, select equipment, review dimensions with their stated sources, change camera angles, and export a PNG. The geometry follows the source plan; heights and materials are illustrative. This visualization supports layout discussions and is not a measured survey or installation design.',
    tools: ['React', 'Three.js', 'Vite', 'RU / EN'],
    link: 'https://pizza-tt426-3d.pages.dev/',
    variants: [
      { label: 'Codex · GPT-6.1 Sol (High)', href: 'https://pizza-tt426-3d.pages.dev/' },
    ],
    image: '/images/projects/pizza-plan.png',
    imageWidth: 1700,
    imageHeight: 941,
    category: 'Interactive Demo',
    role: 'Design & Development',
    status: 'Interactive visualisation / Preliminary layout',
    impact: 'Makes a preliminary equipment layout easier to review through interactive selection, source-aware dimensions, and multiple views.'
  },
  {
    id: 'pizza-tt426-3d-g4argon',
    title: 'Pizza TT426 3D · Gemini 4 Argon',
    description: 'Built with Gemini 4 Argon using a detailed prompt and the same 2D equipment plan. Explore 57 records, switch between four visual themes and six camera views, adjust the wall cutaway, inspect animated menu screens, and export a PNG. Includes the anonymized English PDF plan. Heights and materials are illustrative; this is a preliminary visualization.',
    tools: ['HTML', 'JavaScript', 'WebGL', 'RU / EN'],
    link: 'https://pizza-tt426-3d-g4argon.pages.dev/',
    variants: [
      { label: 'Gemini 4 Argon', href: 'https://pizza-tt426-3d-g4argon.pages.dev/' },
    ],
    image: '/images/projects/pizza-plan-gemini.png',
    imageWidth: 1920,
    imageHeight: 1080,
    category: 'Interactive Demo',
    role: 'Design & Development',
    status: 'Interactive visualisation / Preliminary layout',
    impact: 'Offers a second interpretation of the same plan, with visual themes, adjustable wall cutaways, and a dedicated menu-screen inspector.'
  },
  {
    id: 'ostatak',
    title: 'Ostatak',
    description: 'A working restaurant delivery reconciliation prototype. Match orders and payouts from two CSV templates, review deductions and discrepancies, and export the results. Runs in the browser in English and Russian. Uses synthetic demo data; AI document reading and Wolt/Glovo connections are not enabled.',
    tools: ['JavaScript', 'CSV Reconciliation', 'Local Processing', 'RU / EN'],
    link: `${import.meta.env.BASE_URL}demos/ostatak/?lang=en`,
    linkRu: `${import.meta.env.BASE_URL}demos/ostatak/?lang=ru`,
    image: '/images/projects/ostatak.png',
    imageWidth: 1512,
    imageHeight: 1080,
    category: 'Interactive Demo',
    role: 'Research, Design & Development',
    status: 'Working Prototype / Synthetic Data',
    impact: 'Makes each calculation traceable to source rows; discrepancies require review and do not establish an underpayment.'
  },
  {
    id: 'document-intake',
    title: 'Document Intake',
    description: 'An interactive demo of a logistics document workflow: review prepared fields from a sample email and PDF, resolve missing information, and export a load record as CSV or JSON. Includes a logistics workbench and an email request for a paid pilot. Uses synthetic examples; live PDF recognition, AI processing, and TMS integrations are not enabled.',
    tools: ['JavaScript', 'Workflow UX', 'CSV / JSON', 'Responsive Design'],
    link: 'https://document-intake.pages.dev/',
    image: '/images/projects/document-intake.jpg',
    imageWidth: 1280,
    imageHeight: 720,
    category: 'Interactive Demo',
    role: 'Design & Development',
    status: 'Live Demo / Synthetic Data',
    impact: 'Demonstrates a document review workflow and provides a starting point for a paid pilot tailored to a client process'
  },
  {
    id: "vila-mirava",
    title: "Vila Mirava",
    description: "A self-initiated SR/EN website concept for a fictional riverside villa with a pool. An immersive hero, interactive photo gallery, illustrative floor plan, and restrained motion use AI-generated imagery. Booking and payments are not enabled.",
    tools: ["React", "TypeScript", "CSS", "AI Imagery"],
    link: "https://vila-mirava-borika.pages.dev/?lang=en",
    image: "/images/projects/vila-mirava.jpg",
    imageWidth: 1440,
    imageHeight: 900,
    category: "Website Concept",
    role: "Design & Development",
    status: "Independent Concept",
    impact: "Explores a calm hospitality website with accessible galleries, dialogs, and responsive navigation.",
  },
  {
    id: "vila-borika",
    title: "Vila Borika",
    description: "A self-initiated SR/EN website concept for a fictional timber mountain chalet. A split-screen hero, cream and terracotta palette, interactive gallery, and curved mobile menu create a distinct visual identity. Images are AI-generated; booking and payments are not enabled.",
    tools: ["React", "TypeScript", "CSS", "AI Imagery"],
    link: "https://vila-mirava-borika.pages.dev/idila/?lang=en",
    image: "/images/projects/vila-borika.jpg",
    imageWidth: 1440,
    imageHeight: 900,
    category: "Website Concept",
    role: "Design & Development",
    status: "Independent Concept",
    impact: "Explores a mountain-stay identity with responsive layouts, keyboard navigation, and reduced-motion support.",
  },
  {
    id: 'vila-tihora',
    title: 'Vila Tihora',
    description: 'An independent website concept for a fictional countryside villa. It combines an editorial layout, responsive navigation, an interactive gallery, an illustrative map, and a demo enquiry form. The seven images were generated from text descriptions without reference photos; the form sends no data.',
    tools: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    link: '/demos/vila-tihora/',
    image: '/images/projects/vila-tihora.jpg',
    imageWidth: 1440,
    imageHeight: 900,
    category: 'Website Concept',
    role: 'Design & Development',
    status: 'Independent Concept',
    impact: 'Demonstrates the journey from exploring a villa to preparing an enquiry, with a fictional property and illustrative images'
  },
  {
    id: 'engineering-process-management-system',
    title: 'Meeting Protocol Tracker (MPT)',
    description: 'An internal system for managing meeting protocols, engineering issues, and action items. It provides organization-based filtering, discussion history, responsibility and status tracking, and automated XLSX reporting. The repository contains the source code; no public application instance or operational data is available.',
    tools: ['Python', 'Django', 'Issue Tracking', 'Action Items', 'XLSX Reporting'],
    link: 'https://github.com/Dun4ev/Protocol',
    image: '/images/projects/meeting-protocol-tracker.optimized.webp',
    imageWidth: 1280,
    imageHeight: 631,
    category: 'Internal Tool',
    usedAtWork: true,
    role: 'Creator',
    status: 'Source Code / No Public Demo',
    impact: 'Improves traceability of decisions and responsibilities while reducing missed actions and repetitive reporting work'
  },
  {
    id: 'geofuse',
    title: 'GeoFuse',
    description: 'A web product for evaluating business locations before signing a lease. GeoFuse combines OSM and Overpass, Google Places when available, Overture and PostGIS building and POI layers, saved-location comparison, source-aware estimates, and decision-ready reports.',
    tools: ['React', 'TypeScript', 'Geospatial Analytics', 'PostGIS', 'Supabase'],
    link: 'https://geofuse-gamma.vercel.app/',
    image: '/images/projects/geofuse-public-beta.optimized.webp',
    imageWidth: 1280,
    imageHeight: 720,
    category: 'Product / Geo Analytics',
    role: 'Product Design & Development',
    status: 'Public Beta',
    impact: 'Turns fragmented geospatial data into a structured, source-aware workflow for comparing business locations'
  },
  {
    id: 'auto-comment-sheets',
    title: 'TOiR Reporting Automation',
    description: 'A Python-based automation tool designed to streamline the creation of engineering reports and technical documentation.',
    tools: ['Python', 'Pandas', 'OpenPyXL', 'Automation'],
    link: 'https://github.com/Dun4ev/toir_tra_report',
    image: '/images/projects/toir-reporting-automation.optimized.webp',
    imageWidth: 1280,
    imageHeight: 577,
    category: 'Automation',
    usedAtWork: true,
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
    image: '/images/projects/pipeline-analytics.optimized.webp',
    imageWidth: 1201,
    imageHeight: 725,
    category: 'Documentation',
    usedAtWork: true,
    role: 'Creator',
    status: 'Internal tool',
    impact: 'Automated PDF routing and operation logging for engineering document flows'
  },
  {
    id: 'graf-html',
    title: 'Interactive Trend Visualization',
    description: 'A Python/Dash tool for analyzing HVAC trend data exported from SCADA systems. It converts CSV and Excel measurements into interactive multi-signal charts, helping engineers compare equipment behavior, identify dependencies, and investigate anomalies.',
    tools: ['Python', 'Dash', 'Plotly', 'Pandas'],
    link: 'https://github.com/Dun4ev/graf_html',
    image: '/images/projects/interactive-trend-visualization.optimized.webp',
    imageWidth: 1280,
    imageHeight: 633,
    category: 'Data Visualization',
    usedAtWork: true,
    role: 'Creator',
    status: 'Reusable toolkit',
    impact: 'Simplifies HVAC trend analysis and helps reveal relationships between system parameters without manually building charts'
  },
  {
    id: 'portfolio-v2',
    title: 'AI-Powered PDF Search Engine',
    description: 'A semantic search and question-answering system for PDF documents using RAG architecture and LLMs.',
    tools: ['Python', 'LLM', 'RAG', 'FAISS', 'LangChain'],
    link: 'https://github.com/Dun4ev/ai-pdf-search-system',
    image: '/images/projects/portfolio-website.optimized.webp',
    imageWidth: 1024,
    imageHeight: 1024,
    category: 'AI / RAG',
    role: 'Creator',
    status: 'Prototype',
    impact: 'Turns local technical PDFs into searchable, grounded answers'
  },
  {
    id: 'bb-invest-website',
    title: 'BB INVEST Real Estate Website',
    description: 'A client website for a residential developer in Velika Plana, designed to turn a complex property portfolio into a clear buyer journey. The trilingual experience presents projects, apartment layouts and availability, construction progress, buying steps, location details, FAQs, and direct inquiry forms.',
    tools: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'SR / EN / RU'],
    link: 'https://bbinvest.rs/',
    image: '/images/projects/bb-invest-website.optimized.webp',
    imageWidth: 1280,
    imageHeight: 720,
    category: 'Client Website',
    role: 'Design & Development',
    status: 'Live',
    impact: 'Gives buyers one clear path from exploring a property to sending a direct inquiry'
  },
  {
    id: 'krasnova-residence-website',
    title: 'Krasnova Residence Website',
    description: 'A premium presentation website developed for a residential project in Vracar, Belgrade. It combines video-led storytelling with an interactive floor selector, detailed plans, real photo galleries, building technologies, location context, and direct inquiry forms.',
    tools: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'SR / EN'],
    link: 'https://krasnovresidence.rs/',
    image: '/images/projects/krasnova-residence-website.optimized.webp',
    imageWidth: 1280,
    imageHeight: 922,
    category: 'Client Website',
    role: 'Design & Development',
    status: 'Live',
    impact: 'Turns architectural, technical, and sales materials into a focused digital presentation for prospective buyers'
  },
  {
    id: 'natalya-psychologist-website',
    title: 'Psychologist Natalya Website',
    description: 'A client website for a practicing psychologist in Rostov-on-Don, designed to present consultation topics, formats, pricing, and contact options in a calm and accessible journey. The launch included a custom domain, responsive static delivery, local SEO, Yandex Webmaster verification, canonical metadata, structured data, robots.txt, and sitemap.xml.',
    tools: ['React', 'TypeScript', 'Vinext', 'Responsive Design', 'SEO'],
    link: 'https://natalyapsiholog.ru/',
    image: '/images/projects/natalya-psychologist-website.optimized.webp',
    imageWidth: 1280,
    imageHeight: 720,
    category: 'Client Website',
    role: 'Design, Development & Launch',
    status: 'Live',
    impact: 'Delivered the complete path from content and interface design to domain launch, Yandex verification, and search-ready technical indexing'
  },
  {
    id: 'belgrade-parking-guide',
    title: 'Park in Belgrade',
    description: 'A guide I created to help visitors pay for street parking in Belgrade. It covers zones, prices, time limits, payment with or without a Serbian SIM, parking signs, and printable QR cards for hotels and car rentals. Available in English and Spanish.',
    tools: ['HTML', 'CSS', 'JavaScript', 'Python', 'EN / ES'],
    link: 'https://belgrade-parking-guide.pages.dev/',
    image: '/images/projects/belgrade-parking-guide.optimized.webp',
    imageWidth: 1280,
    imageHeight: 720,
    category: 'Visitor Guide',
    role: 'Creator',
    status: 'Live',
    impact: 'Helps visitors understand local parking rules and choose a suitable payment method'
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

export const ARTICLES: ArticleItem[] = [
  {
    id: 'epc-document-flow',
    title: 'AI-Assisted EPC Document Review Animation',
    description: 'A bilingual, 24-second visual note showing how AI supports vendor-document review within EPC: classification, requirement checks, inconsistency detection, initial comments, and consolidation of stakeholder feedback before EPC issues the reply.',
    category: 'AI-Assisted Engineering Review',
    date: 'Sep 16, 2026',
    readTime: '24 sec demo',
    href: `${import.meta.env.BASE_URL}demos/epc-document-flow/?lang=en`,
    image: '/images/articles/epc-document-flow.optimized.webp',
    imageWidth: 1080,
    imageHeight: 1920,
    tags: ['EPC', 'AI Analysis', 'Document Review', 'RU / EN'],
    highlight: 'Vendor → EPC → AI analysis → stakeholder review → AI consolidation → EPC reply'
  },
  {
    id: 'agent-incident-map',
    title: 'The OpenAI × Hugging Face Incident: An Agent Action Map',
    description: 'An interactive forensic reconstruction of how isolated agents built a covert message board, coordinated reward-hacking research, and escalated into an attack on Hugging Face infrastructure.',
    category: 'AI Safety & Agents',
    date: 'Aug 29, 2026',
    readTime: '18 min read',
    href: '/articles/agent-incident-map/',
    tags: ['AI Agents', 'AI Safety', 'Incident Analysis', 'Interactive'],
    highlight: 'Seven days of coordination, spoofing, lateral movement, and the safeguards that failed'
  },
  {
    id: 'ai-architectural-presentation',
    title: 'From Idea to Concept Site in Hours: AI and Early Architectural Presentation',
    description: 'How AI can turn an early architectural idea into a presentable digital pitch with images, video, narrative structure, and a shareable website.',
    category: 'AI & Architecture',
    date: 'Apr 30, 2026',
    readTime: '3 min read',
    href: 'https://medium.com/@andreydunaev1/from-idea-to-concept-site-in-hours-ai-and-early-architectural-presentation-c10aadc681a9',
    tags: ['AI', 'Architecture', 'Website', 'Concept'],
    highlight: 'Idea -> images -> video -> landing page -> publication'
  },
  {
    id: 'pdf-busywork-automation',
    title: 'How We Tamed `.pdf` and Saved Hours of Busywork',
    description: 'A practical story about replacing manual PDF folder handling with a Python conveyor, structured logs, flexible paths, and operator-friendly automation.',
    category: 'Automation',
    date: 'Nov 12, 2025',
    readTime: '4 min read',
    href: 'https://medium.com/@andreydunaev1/how-we-tamed-pdf-and-saved-hours-of-busywork-c131a65ad1e5',
    tags: ['Python', 'PDF', 'Documentation', 'Workflow'],
    highlight: '59 reports: from 25 minutes of focus to one controlled run'
  },
  {
    id: 'it-levels-l0-l11',
    title: 'IT levels, what L0-L11 levels are hiding in large companies',
    description: 'A compact explanation of engineering career levels, responsibilities, impact, compensation ranges, and what usually signals readiness for the next step.',
    category: 'Career Frameworks',
    date: 'Jul 23, 2025',
    readTime: '3 min read',
    href: 'https://medium.com/@andreydunaev1/it-levels-what-l0-l11-levels-are-hiding-in-large-companies-7ba457d8021e',
    tags: ['Career', 'Engineering Levels', 'Leadership', 'Growth'],
    highlight: 'L0-L11 as a map of responsibility, influence, and impact'
  }
];

export const LABS: LabItem[] = [
  {
    id: 'slotbot-booking-landing',
    title: 'SlotBot: Telegram Booking Landing',
    description: 'A static landing page concept for a Telegram-based booking assistant: clients browse services, prices, and available slots, then book directly through Telegram.',
    category: 'Interactive Demo',
    date: 'May 2026',
    href: 'https://dun4ev.github.io/slotbot-booking-landing/',
    image: '/images/projects/slotbot-booking-landing.optimized.webp',
    imageWidth: 1280,
    imageHeight: 720,
    tags: ['HTML', 'Telegram Bot', 'Booking Automation'],
    status: 'Live demo',
    highlight: 'Shows how a lightweight website can connect with Telegram booking and reduce manual scheduling.'
  },
  {
    id: 'electricity-theft-detector',
    title: 'EnergyGuard AI: Electricity Theft Detector',
    description: 'An interactive MVP concept for non-invasive electricity theft detection using feeder balance, pole-mounted split sensors, UAV thermal inspection, GIS topology, and AI-assisted anomaly localization.',
    category: 'Engineering Concept',
    date: 'May 2026',
    href: 'https://dun4ev.github.io/electricity-theft-detector/index.html',
    image: '/images/projects/electricity-theft-detector.optimized.webp',
    imageWidth: 1280,
    imageHeight: 720,
    tags: ['Energy Analytics', 'GIS', 'AI Concept'],
    status: 'MVP concept',
    highlight: 'Demonstrates a practical architecture for detecting commercial electricity losses through remote monitoring.'
  },
  {
    id: 'vegaboost-business-overview',
    title: 'VegaBoost Business Overview',
    description: 'A lightweight business presentation site for quickly explaining a product idea, commercial logic, and key project signals in a shareable format.',
    category: 'Business Presentation',
    date: 'Jun 2026',
    href: 'https://vegaboost-business-overview.netlify.app/',
    image: '/images/projects/vegaboost-business-overview.optimized.webp',
    imageWidth: 1280,
    imageHeight: 720,
    tags: ['Business Overview', 'Presentation Site', 'Netlify'],
    status: 'Live demo',
    highlight: 'Turns a compact business concept into a clear web-based presentation.'
  },
  {
    id: 'tank-nitrogen-blanketing',
    title: 'Tank Nitrogen Blanketing',
    description: 'An interactive engineering report about nitrogen blanketing for atmospheric storage tanks, including process physics, pressure limits, safety notes, and economic reasoning.',
    category: 'Engineering Report',
    date: 'May 2026',
    href: 'https://dun4ev.github.io/2026-05-26_tank-nitrogen-blanketing/',
    image: '/images/projects/tank-nitrogen-blanketing.optimized.webp',
    imageWidth: 1280,
    imageHeight: 720,
    tags: ['Engineering', 'Interactive Report', 'Storage Tanks'],
    status: 'Published',
    highlight: 'Combines technical explanation, interactive presentation, and decision support.'
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
    { id: "Equipment Certification", group: 1, radius: 15 }, // PED, ATEX, CE
    { id: "Piping Layout and Design", group: 1, radius: 15 },

    // Tech / Tools
    { id: "Python", group: 2, radius: 18 },
    { id: "Document Checks", group: 2, radius: 15 },
    { id: "Power Query", group: 2, radius: 15 },
    { id: "Document Automation", group: 2, radius: 18 },
    { id: "Revision Tracking", group: 2, radius: 15 },
    { id: "Django", group: 2, radius: 12 },
    { id: "AutoCAD", group: 1, radius: 12 },
    { id: "SolidWorks", group: 1, radius: 12 },
    { id: "Kompas 3D", group: 1, radius: 10 },
    { id: "Excel and VBA", group: 2, radius: 10 },

    // Management
    { id: "EPC Contracts", group: 3, radius: 15 },
    { id: "Stakeholder Mgmt", group: 3, radius: 15 },
    { id: "RFQ Packages", group: 3, radius: 14 },
    { id: "Vendor Documentation", group: 3, radius: 14 },
    { id: "Issue Tracking", group: 3, radius: 14 },
    { id: "Engineering Interfaces", group: 3, radius: 14 },
    { id: "Technical Queries", group: 3, radius: 12 },
    { id: "MDR/MDI", group: 3, radius: 12 }, // MDR/MDI
    { id: "Cost Est.", group: 3, radius: 12 }
  ],
  links: [
    // Engineering Center
    { source: "Engineering", target: "Gas Pipelines", value: 5 },
    { source: "Engineering", target: "Compressor St.", value: 5 },
    { source: "Engineering", target: "UGS", value: 3 },
    { source: "Engineering", target: "FEED", value: 4 },
    { source: "Engineering", target: "Detailed Design", value: 4 },
    { source: "Engineering", target: "Equipment Certification", value: 3 },
    { source: "Engineering", target: "Piping Layout and Design", value: 4 },
    { source: "Engineering", target: "HAZOP", value: 3 },

    // 3D Modeling Tools
    { source: "Piping Layout and Design", target: "AutoCAD", value: 3 },
    { source: "Piping Layout and Design", target: "SolidWorks", value: 3 },
    { source: "Piping Layout and Design", target: "Kompas 3D", value: 2 },

    // Mgmt Center
    { source: "Project Mgmt", target: "Engineering", value: 5 },
    { source: "Project Mgmt", target: "EPC Contracts", value: 4 },
    { source: "Project Mgmt", target: "Stakeholder Mgmt", value: 4 },
    { source: "Project Mgmt", target: "RFQ Packages", value: 4 },
    { source: "Project Mgmt", target: "Vendor Documentation", value: 4 },
    { source: "Project Mgmt", target: "Issue Tracking", value: 4 },
    { source: "Project Mgmt", target: "Engineering Interfaces", value: 4 },
    { source: "Project Mgmt", target: "Technical Queries", value: 3 },
    { source: "Project Mgmt", target: "MDR/MDI", value: 3 },
    { source: "Project Mgmt", target: "Cost Est.", value: 3 },

    // Data Center
    { source: "Data & AI", target: "Python", value: 5 },
    { source: "Data & AI", target: "Document Checks", value: 4 },
    { source: "Data & AI", target: "Power Query", value: 4 },
    { source: "Data & AI", target: "Document Automation", value: 5 },
    { source: "Data & AI", target: "Revision Tracking", value: 4 },
    { source: "Data & AI", target: "Django", value: 3 },

    // Cross-Domain
    { source: "Document Automation", target: "MDR/MDI", value: 4 }, // Python for docs
    { source: "Document Automation", target: "Engineering", value: 3 }, // Checklists
    { source: "Document Automation", target: "Issue Tracking", value: 3 },
    { source: "Vendor Documentation", target: "RFQ Packages", value: 3 },
    { source: "Document Checks", target: "Technical Queries", value: 3 }, // Analytics for risk
    { source: "Data & AI", target: "Project Mgmt", value: 3 },
    { source: "Equipment Certification", target: "MDR/MDI", value: 2 },
  ]
};

export const SKILL_METRICS = [
  { name: 'three_d', value: 95, fullMark: 100 },
  { name: 'experience', value: 90, fullMark: 100 },
  { name: 'design', value: 75, fullMark: 100 },
  { name: 'documents', value: 85, fullMark: 100 },
  { name: 'updates', value: 80, fullMark: 100 },
  { name: 'lifecycle', value: 85, fullMark: 100 },
];
