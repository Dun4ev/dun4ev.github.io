import React, { useState, useEffect, useRef } from 'react';
import { Linkedin, Mail, Phone, ArrowUpRight, ExternalLink } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { CursorSpotlight } from './components/CursorSpotlight';
import { Navigation } from './components/Navigation';
import { ExperienceCard } from './components/ExperienceCard';
import { ProjectCard } from './components/ProjectCard';
import { SkillCloud } from './components/SkillCloud';
import { SkillRadar } from './components/SkillRadar';
import { JOBS, D3_DATA, SOCIAL_LINKS, PROJECTS, ARTICLES } from './constants';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ProjectsPage } from './components/ProjectsPage';
import { KnowledgeBasePage } from './components/KnowledgeBasePage';
import { ArticlesPage } from './components/ArticlesPage';
import { GitHubContributions } from './components/GitHubContributions';

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
      className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const getRoutePath = () => {
  const redirectPath = new URLSearchParams(window.location.search).get('redirect');

  if (redirectPath) {
    window.history.replaceState(null, '', redirectPath);
    return redirectPath;
  }

  return window.location.pathname;
};

const App: React.FC = () => {
  const { t } = useTranslation();
  const [routePath, setRoutePath] = useState(getRoutePath);

  useEffect(() => {
    const handlePopState = () => setRoutePath(window.location.pathname);

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    setRoutePath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateTo('/');
  };

  const handleProjectsClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateTo('/projects');
  };

  const handleKnowledgeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateTo('/knowledge-base');
  };

  const handleArticlesClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateTo('/articles');
  };

  const isProjectsPage = routePath === '/projects';
  const isKnowledgeBasePage = routePath === '/knowledge-base';
  const isArticlesPage = routePath === '/articles';

  if (isProjectsPage) {
    return (
      <div className="bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900 relative">
        <CursorSpotlight />
        <ProjectsPage onNavigate={navigateTo} />
      </div>
    );
  }

  if (isKnowledgeBasePage) {
    return (
      <div className="bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-cyan-300 selection:text-cyan-950 relative">
        <CursorSpotlight />
        <KnowledgeBasePage onNavigate={navigateTo} />
      </div>
    );
  }

  if (isArticlesPage) {
    return (
      <div className="bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-amber-300 selection:text-amber-950 relative">
        <CursorSpotlight />
        <ArticlesPage onNavigate={navigateTo} />
      </div>
    );
  }

  return (
    <div className="bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900 relative">
      <CursorSpotlight />

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-4">

          {/* LEFT COLUMN (Sticky) */}
          <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <div className="mb-8 lg:hidden">
                <LanguageSwitcher />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                <a href="/" onClick={handleHomeClick}>{t('header.title')}</a>
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl min-h-[3.5rem] sm:min-h-[2rem]">
                <TypingEffect text={t('header.subtitle')} />
              </h2>
              <p className="mt-4 max-w-xs leading-normal text-slate-400">
                {t('header.description')}
              </p>
              <Navigation onNavigate={navigateTo} />
            </div>

            <div className="ml-1 mt-8 flex flex-col gap-8">
              <div className="hidden lg:block">
                <LanguageSwitcher />
              </div>
              <div className="flex items-center gap-5">
                {/* Socials */}
                <a href={SOCIAL_LINKS.linkedin} className="text-slate-500 hover:text-teal-400 transition-colors hover:-translate-y-1 transform duration-300" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-slate-500 hover:text-teal-400 transition-colors hover:-translate-y-1 transform duration-300" aria-label="Email">
                  <Mail className="h-6 w-6" />
                </a>
                <div className="group flex items-center text-slate-500 text-sm gap-2 hover:text-teal-400 transition-colors cursor-default">
                  <Phone className="h-4 w-4" />
                  <span className="max-w-0 overflow-hidden opacity-0 whitespace-nowrap transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100">
                    {SOCIAL_LINKS.phone}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* RIGHT COLUMN (Scrollable) */}
          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">

            {/* ABOUT SECTION */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label={t('nav.about')}>
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">{t('nav.about')}</h2>
              </div>
              <FadeIn>
                <div className="space-y-4 text-lg">
                  <p>{t('about.p1')}</p>
                  <p>{t('about.p2')}</p>
                  <p>{t('about.p3')}</p>
                  <p>{t('about.p4')}</p>
                </div>
              </FadeIn>

              {/* Radar Chart Visualization */}
              <FadeIn delay={200}>
                <SkillRadar />
              </FadeIn>
            </section>

            {/* EXPERIENCE SECTION */}
            <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label={t('nav.experience')}>
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">{t('experience.title')}</h2>
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
                  <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base font-semibold" href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noreferrer">
                    <span>{t('experience.view_resume')} <span className="inline-block"><ArrowUpRight className="inline-block h-4 w-4 ml-1 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" /></span></span>
                  </a>
                </div>
              </FadeIn>
            </section>

            {/* SKILLS & DATA SECTION */}
            <section id="skills" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label={t('nav.skills')}>
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">{t('skills.title')}</h2>
              </div>
              <FadeIn>
                <p className="mb-4">
                  <Trans
                    i18nKey="skills.description"
                    components={[
                      <span className="text-teal-300" />,
                      <span className="text-teal-300" />,
                      <span className="text-teal-300" />
                    ]}
                  />
                </p>
              </FadeIn>

              <FadeIn delay={200}>
                <SkillCloud data={D3_DATA} />
              </FadeIn>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FadeIn delay={300}>
                  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-teal-500/30 transition-colors">
                    <h4 className="text-slate-200 font-semibold mb-2">{t('skills.software')}</h4>
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
                    <h4 className="text-slate-200 font-semibold mb-2">{t('skills.digital')}</h4>
                    <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                      <li>Python (Data Science)</li>
                      <li>Excel Power Query</li>
                      <li>Prompt Engineering</li>
                      <li>Big Data Visualization</li>
                    </ul>
                  </div>
                </FadeIn>
              </div> {/* Added missing closing div for the grid */}

              <FadeIn delay={500}>
                <div className="mt-8 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
                  <h4 className="text-slate-200 font-semibold mb-4 text-center">{t('skills.key_expertise')}</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['AI Automation', 'Industrial Engineering', 'Data Analytics', 'Technical Documentation', 'RFQ Coordination', 'Vendor Documentation', 'Issue Tracking', 'Planning & Reporting', 'Python', 'Django', 'Power Query', 'UGS', 'EPC Projects', 'PED/ATEX Compliance'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-teal-500/10 text-teal-300 border border-teal-500/20 rounded-full text-xs font-medium hover:bg-teal-500/20 transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label={t('nav.projects')}>
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">{t('projects.title')}</h2>
              </div>
              <FadeIn>
                <GitHubContributions />
              </FadeIn>
              <div className="group/list">
                {PROJECTS.map((project, idx) => (
                  <FadeIn key={project.id} delay={idx * 100}>
                    <div className="mb-12">
                      <ProjectCard project={project} />
                    </div>
                  </FadeIn>
                ))}
              </div>
              <FadeIn>
                <div className="mt-12">
                  <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base font-semibold" href="/projects" onClick={handleProjectsClick}>
                    <span>{t('projects.view_archive')} <span className="inline-block"><ArrowUpRight className="inline-block h-4 w-4 ml-1 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" /></span></span>
                  </a>
                </div>
              </FadeIn>
            </section>

            {/* KNOWLEDGE BASE SECTION */}
            <section id="knowledge" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label={t('nav.knowledge')}>
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">{t('knowledge.title')}</h2>
              </div>
              <FadeIn>
                <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-5 transition-colors hover:border-cyan-300/40 hover:bg-slate-800/60">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-300">{t('knowledge.eyebrow')}</p>
                  <h3 className="text-xl font-semibold text-slate-100">{t('knowledge.title')}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{t('knowledge.description')}</p>
                  <a
                    className="mt-5 inline-flex items-baseline font-semibold leading-tight text-slate-200 hover:text-cyan-300 focus-visible:text-cyan-300 group/link text-base"
                    href="/knowledge-base"
                    onClick={handleKnowledgeClick}
                  >
                    <span>{t('knowledge.view_all')} <span className="inline-block"><ArrowUpRight className="inline-block h-4 w-4 ml-1 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" /></span></span>
                  </a>
                </div>
              </FadeIn>
            </section>

            {/* ARTICLES SECTION */}
            <section id="articles" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label={t('nav.articles')}>
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">{t('articles.title')}</h2>
              </div>
              <FadeIn>
                <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-5 transition-colors hover:border-amber-300/40 hover:bg-slate-800/60">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-300">{t('articles.eyebrow')}</p>
                  <h3 className="text-xl font-semibold text-slate-100">{t('articles.title')}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{t('articles.description')}</p>
                  <div className="mt-6 space-y-4">
                    {ARTICLES.map((article) => (
                      <a
                        key={article.id}
                        href={article.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group/article block rounded-lg border border-slate-800 bg-slate-950/30 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/30 hover:bg-slate-800/70"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-amber-300">{article.category}</p>
                            <h4 className="mt-2 text-base font-semibold leading-snug text-slate-100">
                              {t(`articles.items.${article.id}.title`)}
                            </h4>
                          </div>
                          <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover/article:text-amber-300" />
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {t(`articles.items.${article.id}.description`)}
                        </p>
                      </a>
                    ))}
                  </div>
                  <a
                    className="mt-5 inline-flex items-baseline font-semibold leading-tight text-slate-200 hover:text-amber-300 focus-visible:text-amber-300 group/link text-base"
                    href="/articles"
                    onClick={handleArticlesClick}
                  >
                    <span>{t('articles.view_all')} <span className="inline-block"><ArrowUpRight className="inline-block h-4 w-4 ml-1 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" /></span></span>
                  </a>
                </div>
              </FadeIn>
            </section>

            {/* FOOTER */}
            <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
              <p>
                <Trans
                  i18nKey="footer.built_with"
                  components={[
                    <span className="text-slate-200" />,
                    <span className="text-slate-200" />,
                    <span className="text-slate-200" />
                  ]}
                />
                <br />
                {t('footer.inspired_by')}
              </p>
            </footer>

          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
