import React, { useState, useEffect, useRef } from 'react';
import { Linkedin, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { CursorSpotlight } from './components/CursorSpotlight';
import { Navigation } from './components/Navigation';
import { ExperienceCard } from './components/ExperienceCard';
import { SkillGraph } from './components/SkillGraph';
import { SkillRadar } from './components/SkillRadar';
import { JOBS, D3_DATA, SOCIAL_LINKS } from './constants';

const TypingEffect = ({ text }: { text: string }) => {
  const [display, setDisplay] = useState('');
  
  useEffect(() => {
    let i = 0;
    setDisplay('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplay(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [text]);
  
  return <span>{display}<span className="animate-pulse text-teal-400">_</span></span>;
};

const FadeIn = ({ children, delay = 0 }: React.PropsWithChildren<{ delay?: number }>) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900 relative">
      <CursorSpotlight />
      
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-4">
          
          {/* LEFT COLUMN (Sticky) */}
          <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                <a href="/">Andrej Dunajev</a>
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl min-h-[3.5rem] sm:min-h-[2rem]">
                <TypingEffect text="Chief Engineering Expert & Data Innovator" />
              </h2>
              <p className="mt-4 max-w-xs leading-normal text-slate-400">
                Merging 18+ years of energy infrastructure expertise with data analytics and digital transformation.
              </p>
              <Navigation />
            </div>

            <div className="ml-1 mt-8 flex items-center gap-5">
               {/* Socials */}
              <a href={SOCIAL_LINKS.linkedin} className="text-slate-500 hover:text-teal-400 transition-colors hover:-translate-y-1 transform duration-300" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-slate-500 hover:text-teal-400 transition-colors hover:-translate-y-1 transform duration-300" aria-label="Email">
                <Mail className="h-6 w-6" />
              </a>
               <div className="flex items-center text-slate-500 text-sm gap-2 hover:text-teal-400 transition-colors">
                 <Phone className="h-4 w-4" />
                 <span>{SOCIAL_LINKS.phone}</span>
               </div>
            </div>
          </header>

          {/* RIGHT COLUMN (Scrollable) */}
          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
            
            {/* ABOUT SECTION */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="About me">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">About</h2>
              </div>
              <FadeIn>
                <div className="space-y-4 text-lg">
                  <p>
                    I am a highly qualified energy infrastructure expert based in <span className="text-teal-300 inline-flex items-center gap-1 font-medium"><MapPin className="h-3 w-3"/> Belgrade, Serbia</span>. With over 18 years of experience managing large-scale gas pipeline and compressor station projects, I specialize in bridging the gap between traditional engineering and modern digital solutions.
                  </p>
                  <p>
                    My professional philosophy isn't just about climbing the ladder—it's about building systems that make complex processes transparent, reliable, and future-ready. I have extensive experience in <span className="text-slate-200 font-medium">FEED documentation</span>, stakeholder negotiations, and regulatory compliance (PED, ATEX, Ex, CE).
                  </p>
                  <p>
                    Beyond traditional engineering, I am passionate about <span className="text-slate-200 font-medium">Digital Transformation</span>. I develop custom tools using <span className="text-teal-300">Python</span> and <span className="text-teal-300">Excel (Power Query)</span> to automate engineering workflows, analyze big data trends, and optimize technical documentation.
                  </p>
                </div>
              </FadeIn>
              
              {/* Radar Chart Visualization */}
              <FadeIn delay={200}>
                <SkillRadar />
              </FadeIn>
            </section>

            {/* EXPERIENCE SECTION */}
            <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Work experience">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Experience</h2>
              </div>
              
              <div className="group/list">
                {JOBS.map((job, idx) => (
                  <FadeIn key={job.id} delay={idx * 100}>
                    <div className="mb-12">
                      <ExperienceCard job={job} />
                    </div>
                  </FadeIn>
                ))}
              </div>
              
              <FadeIn>
                <div className="mt-12">
                  <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base font-semibold" href="/resume.pdf" target="_blank" rel="noreferrer">
                    <span>View Full Résumé <span className="inline-block"><ArrowUpRight className="inline-block h-4 w-4 ml-1 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1"/></span></span>
                  </a>
                </div>
              </FadeIn>
            </section>

            {/* SKILLS & DATA SECTION */}
            <section id="skills" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Skills and Visualization">
               <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Skills & Data</h2>
              </div>
              <FadeIn>
                <p className="mb-4">
                  My expertise lies at the intersection of <span className="text-teal-300">Engineering</span>, <span className="text-teal-300">Project Management</span>, and <span className="text-teal-300">Data Analytics</span>. The interactive graph below illustrates how these domains connect in my daily workflows, from automating checklist generation to managing 3D design integration.
                </p>
              </FadeIn>
              
              <FadeIn delay={200}>
                <SkillGraph data={D3_DATA} />
              </FadeIn>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FadeIn delay={300}>
                  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-teal-500/30 transition-colors">
                      <h4 className="text-slate-200 font-semibold mb-2">Engineering Software</h4>
                      <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                          <li>AutoCAD</li>
                          <li>SolidWorks</li>
                          <li>Kompas 3D</li>
                          <li>Microsoft Office Suite</li>
                      </ul>
                  </div>
                </FadeIn>
                <FadeIn delay={400}>
                  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-teal-500/30 transition-colors">
                      <h4 className="text-slate-200 font-semibold mb-2">Digital & Analytics</h4>
                      <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                          <li>Python (Data Science)</li>
                          <li>Excel Power Query</li>
                          <li>Prompt Engineering</li>
                          <li>Big Data Visualization</li>
                      </ul>
                  </div>
                </FadeIn>
              </div>

            </section>

            {/* FOOTER */}
            <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
              <p>
                Designed and built with <span className="text-slate-200">React</span>, <span className="text-slate-200">Tailwind CSS</span>, and <span className="text-slate-200">D3.js</span>.
                <br/>
                Inspired by the portfolio of Brittany Chiang.
              </p>
            </footer>

          </main>
        </div>
      </div>
    </div>
  );
};

export default App;