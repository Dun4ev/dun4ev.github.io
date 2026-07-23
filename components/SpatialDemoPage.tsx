import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, X } from 'lucide-react';
import { JOBS, PROJECTS } from '../constants';
import './SpatialDemoPage.css';
import { SpatialRippleCanvas } from './SpatialRippleCanvas';

interface SpatialDemoPageProps {
  onNavigate: (path: string) => void;
}

const DEMO_PROJECTS = PROJECTS.slice(0, 5);
const TRANSITION_MS = 720;
const SECTION_WHEEL_THRESHOLD = 52;
const BOUNDARY_WHEEL_THRESHOLD = 96;
const WHEEL_END_MS = 110;
const WHEEL_PIXELS_PER_CARD = 320;
const DETAIL_CLOSE_MS = 480;
const LAST_SECTION_INDEX = 3;

type DetailSelection = {
  kind: 'experience' | 'project';
  index: number;
  originX: number;
  originY: number;
};

type LiquidRipple = {
  id: number;
  originX: number;
  originY: number;
};

const LEVELS = [
  { label: 'Profile', ariaLabel: 'Go to profile' },
  { label: 'Experience', ariaLabel: 'Go to experience' },
  { label: 'Projects', ariaLabel: 'Go to selected work' },
  { label: 'Explore', ariaLabel: 'Go to explore links' },
];

const EXPLORE_DESTINATIONS = [
  {
    label: 'Applied experiments',
    title: 'Labs',
    description: 'Interactive engineering concepts, prototypes and focused technical explorations.',
    path: '/labs',
  },
  {
    label: 'Reusable explanations',
    title: 'Knowledge base',
    description: 'Visual guides and structured notes for engineering and AI-assisted work.',
    path: '/knowledge-base',
  },
  {
    label: 'Field notes',
    title: 'Articles',
    description: 'Practical writing about automation, documentation and technical delivery.',
    path: '/articles',
  },
];

const clamp = (value: number, minimum: number, maximum: number) => (
  Math.max(minimum, Math.min(maximum, value))
);

const getCarouselCardStyle = (position: number, spacing = 100): React.CSSProperties => {
  const boundedPosition = clamp(position, -2.2, 2.2);
  const distance = Math.abs(boundedPosition);
  const scale = 1 - Math.min(distance, 1) * 0.28 - Math.max(0, distance - 1) * 0.1;
  const opacity = Math.max(0.06, 1 - distance * 0.55);
  const saturation = Math.max(0.42, 1 - distance * 0.35);

  return {
    '--carousel-x': `${boundedPosition * spacing}%`,
    '--carousel-scale': scale,
    opacity,
    filter: `saturate(${saturation})`,
    zIndex: Math.max(1, 10 - Math.round(distance * 3)),
  } as React.CSSProperties;
};

export const SpatialDemoPage: React.FC<SpatialDemoPageProps> = ({ onNavigate }) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [experiencePosition, setExperiencePosition] = useState(0);
  const [projectPosition, setProjectPosition] = useState(0);
  const [isWheelActive, setIsWheelActive] = useState(false);
  const [expandedDetail, setExpandedDetail] = useState<DetailSelection | null>(null);
  const [isDetailClosing, setIsDetailClosing] = useState(false);
  const [liquidRipple, setLiquidRipple] = useState<LiquidRipple | null>(null);
  const experiencePositionRef = useRef(0);
  const projectPositionRef = useRef(0);
  const animationLock = useRef(false);
  const unlockTimer = useRef<number | null>(null);
  const wheelResetTimer = useRef<number | null>(null);
  const detailCloseTimer = useRef<number | null>(null);
  const boundaryWheelAccumulator = useRef(0);
  const touchStart = useRef({ x: 0, y: 0 });
  const experienceIndex = clamp(Math.round(experiencePosition), 0, JOBS.length - 1);
  const projectIndex = clamp(Math.round(projectPosition), 0, DEMO_PROJECTS.length - 1);

  const updateExperiencePosition = useCallback((position: number) => {
    const nextPosition = clamp(position, 0, JOBS.length - 1);
    experiencePositionRef.current = nextPosition;
    setExperiencePosition(nextPosition);
  }, []);

  const updateProjectPosition = useCallback((position: number) => {
    const nextPosition = clamp(position, 0, DEMO_PROJECTS.length - 1);
    projectPositionRef.current = nextPosition;
    setProjectPosition(nextPosition);
  }, []);

  const openDetail = useCallback((
    kind: DetailSelection['kind'],
    index: number,
    source: HTMLElement,
    pointer?: { x: number; y: number },
  ) => {
    if (isWheelActive) return;

    const rect = source.getBoundingClientRect();
    const originX = pointer?.x ?? rect.left + rect.width / 2;
    const originY = pointer?.y ?? rect.top + rect.height / 2;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reducedMotion) {
      setLiquidRipple({ id: window.performance.now(), originX, originY });
    }

    setIsDetailClosing(false);
    setExpandedDetail({
      kind,
      index,
      originX,
      originY,
    });
  }, [isWheelActive]);

  const closeDetail = useCallback(() => {
    if (!expandedDetail || isDetailClosing) return;

    setLiquidRipple(null);
    setIsDetailClosing(true);
    if (detailCloseTimer.current) window.clearTimeout(detailCloseTimer.current);
    detailCloseTimer.current = window.setTimeout(() => {
      setExpandedDetail(null);
      setIsDetailClosing(false);
    }, DETAIL_CLOSE_MS);
  }, [expandedDetail, isDetailClosing]);

  const completeLiquidRipple = useCallback(() => {
    setLiquidRipple(null);
  }, []);

  const handleCardKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    kind: DetailSelection['kind'],
    index: number,
  ) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openDetail(kind, index, event.currentTarget);
  };

  const lockAnimation = useCallback(() => {
    animationLock.current = true;
    if (unlockTimer.current) window.clearTimeout(unlockTimer.current);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    unlockTimer.current = window.setTimeout(() => {
      animationLock.current = false;
    }, prefersReducedMotion ? 0 : TRANSITION_MS);
  }, []);

  const goToSection = useCallback((nextSection: number) => {
    const normalizedSection = Math.max(0, Math.min(LAST_SECTION_INDEX, nextSection));
    if (animationLock.current || normalizedSection === sectionIndex) return;

    lockAnimation();
    setSectionIndex(normalizedSection);
  }, [lockAnimation, sectionIndex]);

  const stepScene = useCallback((direction: -1 | 1) => {
    if (animationLock.current) return;

    if (sectionIndex === 0) {
      if (direction < 0) return;
      lockAnimation();
      setSectionIndex(1);
      return;
    }

    if (sectionIndex === 1) {
      const currentIndex = Math.round(experiencePositionRef.current);
      if (direction > 0 && currentIndex < JOBS.length - 1) {
        setIsWheelActive(false);
        updateExperiencePosition(currentIndex + 1);
        return;
      }

      if (direction < 0 && currentIndex > 0) {
        setIsWheelActive(false);
        updateExperiencePosition(currentIndex - 1);
        return;
      }

      lockAnimation();
      if (direction > 0) {
        updateProjectPosition(0);
        setSectionIndex(2);
      } else {
        setSectionIndex(0);
      }
      return;
    }

    if (sectionIndex === 2) {
      const currentIndex = Math.round(projectPositionRef.current);
      if (direction > 0 && currentIndex < DEMO_PROJECTS.length - 1) {
        setIsWheelActive(false);
        updateProjectPosition(currentIndex + 1);
        return;
      }

      if (direction < 0 && currentIndex > 0) {
        setIsWheelActive(false);
        updateProjectPosition(currentIndex - 1);
        return;
      }

      lockAnimation();
      if (direction > 0) {
        setSectionIndex(3);
      } else {
        updateExperiencePosition(JOBS.length - 1);
        setSectionIndex(1);
      }
      return;
    }

    if (direction < 0) {
      lockAnimation();
      updateProjectPosition(DEMO_PROJECTS.length - 1);
      setSectionIndex(2);
    }
  }, [lockAnimation, sectionIndex, updateExperiencePosition, updateProjectPosition]);

  const scheduleWheelEnd = useCallback(() => {
    if (wheelResetTimer.current) window.clearTimeout(wheelResetTimer.current);
    wheelResetTimer.current = window.setTimeout(() => {
      setIsWheelActive(false);
      boundaryWheelAccumulator.current = 0;

      if (sectionIndex === 1) {
        updateExperiencePosition(Math.round(experiencePositionRef.current));
      }

      if (sectionIndex === 2) {
        updateProjectPosition(Math.round(projectPositionRef.current));
      }
    }, WHEEL_END_MS);
  }, [sectionIndex, updateExperiencePosition, updateProjectPosition]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const primaryDelta = Math.abs(event.deltaY) >= Math.abs(event.deltaX)
      ? event.deltaY
      : event.deltaX;

    event.preventDefault();
    if (expandedDetail) return;
    scheduleWheelEnd();
    if (animationLock.current || primaryDelta === 0) return;

    setIsWheelActive(true);

    if (sectionIndex === 1) {
      const movement = primaryDelta / WHEEL_PIXELS_PER_CARD;
      const currentPosition = experiencePositionRef.current;
      const nextPosition = clamp(currentPosition + movement, 0, JOBS.length - 1);
      updateExperiencePosition(nextPosition);

      const isPastStart = currentPosition <= 0 && movement < 0;
      const isPastEnd = currentPosition >= JOBS.length - 1 && movement > 0;
      if (isPastStart || isPastEnd) {
        boundaryWheelAccumulator.current += Math.abs(primaryDelta);
        if (boundaryWheelAccumulator.current >= BOUNDARY_WHEEL_THRESHOLD) {
          boundaryWheelAccumulator.current = 0;
          setIsWheelActive(false);
          stepScene(movement > 0 ? 1 : -1);
        }
      } else {
        boundaryWheelAccumulator.current = 0;
      }
      return;
    }

    if (sectionIndex === 2) {
      const movement = primaryDelta / WHEEL_PIXELS_PER_CARD;
      const currentPosition = projectPositionRef.current;
      const nextPosition = clamp(currentPosition + movement, 0, DEMO_PROJECTS.length - 1);
      updateProjectPosition(nextPosition);

      const isPastStart = currentPosition <= 0 && movement < 0;
      const isPastEnd = currentPosition >= DEMO_PROJECTS.length - 1 && movement > 0;
      if (isPastStart || isPastEnd) {
        boundaryWheelAccumulator.current += Math.abs(primaryDelta);
        if (boundaryWheelAccumulator.current >= BOUNDARY_WHEEL_THRESHOLD) {
          boundaryWheelAccumulator.current = 0;
          setIsWheelActive(false);
          stepScene(movement > 0 ? 1 : -1);
        }
      } else {
        boundaryWheelAccumulator.current = 0;
      }
      return;
    }

    boundaryWheelAccumulator.current += primaryDelta;
    if (Math.abs(boundaryWheelAccumulator.current) >= SECTION_WHEEL_THRESHOLD) {
      const direction = boundaryWheelAccumulator.current > 0 ? 1 : -1;
      boundaryWheelAccumulator.current = 0;
      setIsWheelActive(false);
      stepScene(direction);
    }
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousTitle = document.title;
    document.body.style.overflow = 'hidden';
    document.title = 'Spatial navigation demo | Andrej Dunaev';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.title = previousTitle;
      if (unlockTimer.current) window.clearTimeout(unlockTimer.current);
      if (wheelResetTimer.current) window.clearTimeout(wheelResetTimer.current);
      if (detailCloseTimer.current) window.clearTimeout(detailCloseTimer.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (expandedDetail) {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeDetail();
        }
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        stepScene(1);
      }

      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        stepScene(-1);
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        stepScene(-1);
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        stepScene(1);
      }

      if (event.key === 'Escape') onNavigate('/');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeDetail, expandedDetail, onNavigate, stepScene]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (expandedDetail) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;

    if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 42) return;

    const direction = Math.abs(deltaY) > Math.abs(deltaX)
      ? (deltaY < 0 ? 1 : -1)
      : (deltaX < 0 ? 1 : -1);
    stepScene(direction);
  };

  const handleExit = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate('/');
  };

  const handleInternalNavigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    onNavigate(path);
  };

  const expandedJob = expandedDetail?.kind === 'experience'
    ? JOBS[expandedDetail.index]
    : null;
  const expandedProject = expandedDetail?.kind === 'project'
    ? DEMO_PROJECTS[expandedDetail.index]
    : null;

  return (
    <main
      className="spatial-demo"
      data-section={sectionIndex}
      data-wheel-active={isWheelActive}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="spatial-demo__atmosphere" aria-hidden="true">
        <div className="spatial-demo__grid" />
        <div className="spatial-demo__route spatial-demo__route--one" />
        <div className="spatial-demo__route spatial-demo__route--two" />
      </div>

      <header className="spatial-demo__header">
        <a className="spatial-demo__brand" href="/" onClick={handleExit}>
          <span>AD</span>
          <small>systems / automation</small>
        </a>

        <nav className="spatial-demo__nav" aria-label="Demo sections">
          <button
            className={sectionIndex === 0 ? 'is-active' : ''}
            type="button"
            onClick={() => goToSection(0)}
          >
            Profile
          </button>
          <button
            className={sectionIndex === 1 ? 'is-active' : ''}
            type="button"
            onClick={() => goToSection(1)}
          >
            Experience
          </button>
          <button
            className={sectionIndex === 2 ? 'is-active' : ''}
            type="button"
            onClick={() => goToSection(2)}
          >
            Projects
          </button>
          <button
            className={sectionIndex === 3 ? 'is-active' : ''}
            type="button"
            onClick={() => goToSection(3)}
          >
            Explore
          </button>
        </nav>

        <a className="spatial-demo__exit" href="/" onClick={handleExit} aria-label="Close demo and return to portfolio">
          <span>Portfolio</span>
          <X aria-hidden="true" />
        </a>
      </header>

      <div
        className="spatial-demo__stage"
        style={{ transform: `translate3d(0, -${sectionIndex * 100}svh, 0)` }}
      >
        <section className="spatial-demo__section spatial-demo__hero" aria-labelledby="spatial-demo-title">
          <div className="spatial-demo__hero-copy">
            <p className="spatial-demo__eyebrow">Engineering coordination · AI integration</p>
            <h1 id="spatial-demo-title">
              Complex systems,<br />
              <span>made legible.</span>
            </h1>
            <p className="spatial-demo__intro">
              I connect engineering data, technical documentation and automation into workflows people can actually control.
            </p>
          </div>

          <div className="spatial-demo__system-map" aria-hidden="true">
            <span className="spatial-demo__map-label spatial-demo__map-label--input">Field input</span>
            <span className="spatial-demo__map-label spatial-demo__map-label--logic">Structured logic</span>
            <span className="spatial-demo__map-label spatial-demo__map-label--output">Controlled output</span>
            <span className="spatial-demo__map-core">AD</span>
            <i className="spatial-demo__map-node spatial-demo__map-node--one" />
            <i className="spatial-demo__map-node spatial-demo__map-node--two" />
            <i className="spatial-demo__map-node spatial-demo__map-node--three" />
          </div>

          <button className="spatial-demo__down" type="button" onClick={() => goToSection(1)}>
            <span>Follow the timeline</span>
            <ArrowDown aria-hidden="true" />
          </button>
        </section>

        <section className="spatial-demo__section spatial-demo__experience" aria-labelledby="spatial-experience-title">
          <div className="spatial-demo__work-heading">
            <p className="spatial-demo__eyebrow">Level 01 · field experience</p>
            <h2 id="spatial-experience-title">Where systems became real</h2>
          </div>

          <div className="spatial-demo__career-carousel" aria-live="polite">
            {JOBS.map((job, index) => {
              const position = experiencePosition - index;
              const isActive = index === experienceIndex;

              return (
                <article
                  className={`spatial-demo__career-card ${isActive ? 'is-active' : ''}`}
                  style={getCarouselCardStyle(position, 96)}
                  aria-hidden={!isActive}
                  aria-label={isActive ? `Open details about ${job.company}` : undefined}
                  aria-haspopup={isActive ? 'dialog' : undefined}
                  role={isActive ? 'button' : undefined}
                  tabIndex={isActive ? 0 : -1}
                  onClick={(event) => isActive && openDetail('experience', index, event.currentTarget, { x: event.clientX, y: event.clientY })}
                  onKeyDown={(event) => isActive && handleCardKeyDown(event, 'experience', index)}
                  key={job.id}
                >
                  <div className="spatial-demo__career-index">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <i />
                    <span>{String(JOBS.length).padStart(2, '0')}</span>
                  </div>
                  <div className="spatial-demo__career-copy">
                    <div className="spatial-demo__career-meta">
                      <span>{job.company}</span>
                      <span>{job.location}</span>
                      <span>{job.period}</span>
                    </div>
                    <h3>{job.title}</h3>
                    <p>{job.description[0]}</p>
                    <ul aria-label="Key expertise">
                      {job.technologies.slice(0, 5).map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                    <span className="spatial-demo__expand-hint">
                      <Maximize2 aria-hidden="true" /> Click to expand
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="spatial-demo__carousel-controls spatial-demo__carousel-controls--career">
            <button type="button" onClick={() => stepScene(-1)} aria-label="Previous career step">
              <ArrowLeft aria-hidden="true" />
            </button>
            <span>{String(experienceIndex + 1).padStart(2, '0')} — {String(JOBS.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => stepScene(1)} aria-label={experienceIndex === JOBS.length - 1 ? 'Continue to projects' : 'Next career step'}>
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className="spatial-demo__section spatial-demo__work" aria-labelledby="spatial-work-title">
          <div className="spatial-demo__work-heading">
            <p className="spatial-demo__eyebrow">Level 02 · working systems</p>
            <h2 id="spatial-work-title">Selected work</h2>
          </div>

          <div className="spatial-demo__carousel" aria-live="polite">
            {DEMO_PROJECTS.map((project, index) => {
              const position = projectPosition - index;
              const isActive = index === projectIndex;

              return (
                <article
                  className={`spatial-demo__project ${isActive ? 'is-active' : ''}`}
                  style={getCarouselCardStyle(position, 96)}
                  aria-hidden={!isActive}
                  aria-label={isActive ? `Open details about ${project.title}` : undefined}
                  aria-haspopup={isActive ? 'dialog' : undefined}
                  role={isActive ? 'button' : undefined}
                  tabIndex={isActive ? 0 : -1}
                  onClick={(event) => isActive && openDetail('project', index, event.currentTarget, { x: event.clientX, y: event.clientY })}
                  onKeyDown={(event) => isActive && handleCardKeyDown(event, 'project', index)}
                  key={project.id}
                >
                  <div className="spatial-demo__project-image">
                    <img src={project.image} alt="" />
                    <span>{String(index + 1).padStart(2, '0')} / {String(DEMO_PROJECTS.length).padStart(2, '0')}</span>
                  </div>
                  <div className="spatial-demo__project-copy">
                    <p>{project.category}</p>
                    <h3>{project.title}</h3>
                    <div className="spatial-demo__project-detail">
                      <p>{project.description}</p>
                      <span className="spatial-demo__project-expand">
                        Expand details <Maximize2 aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="spatial-demo__carousel-controls">
            <button type="button" onClick={() => stepScene(-1)} aria-label="Previous project">
              <ArrowLeft aria-hidden="true" />
            </button>
            <span>{String(projectIndex + 1).padStart(2, '0')} — {String(DEMO_PROJECTS.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => stepScene(1)} aria-label={projectIndex === DEMO_PROJECTS.length - 1 ? 'Continue to explore' : 'Next project'}>
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className="spatial-demo__section spatial-demo__explore" aria-labelledby="spatial-explore-title">
          <div className="spatial-demo__explore-heading">
            <p className="spatial-demo__eyebrow">Level 03 · continue exploring</p>
            <h2 id="spatial-explore-title">The work continues beyond projects.</h2>
            <p>Choose the next layer without losing the clear, conventional portfolio underneath this experiment.</p>
          </div>

          <div className="spatial-demo__explore-grid">
            {EXPLORE_DESTINATIONS.map((destination, index) => (
              <a
                href={destination.path}
                onClick={(event) => handleInternalNavigate(event, destination.path)}
                key={destination.path}
              >
                <span>{String(index + 1).padStart(2, '0')} · {destination.label}</span>
                <h3>{destination.title}</h3>
                <p>{destination.description}</p>
                <i><ArrowUpRight aria-hidden="true" /></i>
              </a>
            ))}
          </div>

          <button className="spatial-demo__return" type="button" onClick={() => stepScene(-1)}>
            <ArrowLeft aria-hidden="true" /> Return to the last project
          </button>
        </section>
      </div>

      {liquidRipple && (
        <SpatialRippleCanvas
          key={liquidRipple.id}
          originX={liquidRipple.originX}
          originY={liquidRipple.originY}
          onComplete={completeLiquidRipple}
        />
      )}

      {expandedDetail && (
        <div
          className={`spatial-demo__detail-overlay is-liquid ${isDetailClosing ? 'is-closing' : ''}`}
          style={{
            '--reveal-x': `${expandedDetail.originX}px`,
            '--reveal-y': `${expandedDetail.originY}px`,
          } as React.CSSProperties}
          role="dialog"
          aria-modal="true"
          aria-labelledby="spatial-detail-title"
          onClick={(event) => event.target === event.currentTarget && closeDetail()}
        >
          <div className={`spatial-demo__detail-panel ${expandedJob ? 'is-experience' : 'is-project'}`}>
            <button
              className="spatial-demo__detail-close"
              type="button"
              onClick={closeDetail}
              aria-label="Close details"
              autoFocus
            >
              <X aria-hidden="true" />
            </button>

            {expandedJob && (
              <div className="spatial-demo__detail-layout">
                <aside className="spatial-demo__detail-meta">
                  <p>Experience · {String(expandedDetail.index + 1).padStart(2, '0')}</p>
                  <dl>
                    <div><dt>Company</dt><dd>{expandedJob.company}</dd></div>
                    <div><dt>Period</dt><dd>{expandedJob.period}</dd></div>
                    <div><dt>Location</dt><dd>{expandedJob.location}</dd></div>
                  </dl>
                  <ul aria-label="Technologies and expertise">
                    {expandedJob.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </aside>

                <div className="spatial-demo__detail-content">
                  <p className="spatial-demo__eyebrow">What I worked on</p>
                  <h2 id="spatial-detail-title">{expandedJob.title}</h2>
                  <ol className="spatial-demo__responsibility-list">
                    {expandedJob.description.map((description, index) => (
                      <li key={description}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <p>{description}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {expandedProject && (
              <div className="spatial-demo__project-dialog">
                <div className="spatial-demo__detail-image">
                  <img src={expandedProject.image} alt="" />
                  <span>{expandedProject.category}</span>
                </div>

                <div className="spatial-demo__detail-content">
                  <p className="spatial-demo__eyebrow">Project · {String(expandedDetail.index + 1).padStart(2, '0')}</p>
                  <h2 id="spatial-detail-title">{expandedProject.title}</h2>
                  <p className="spatial-demo__detail-lead">{expandedProject.description}</p>

                  <dl className="spatial-demo__project-facts">
                    <div><dt>Role</dt><dd>{expandedProject.role}</dd></div>
                    <div><dt>Status</dt><dd>{expandedProject.status}</dd></div>
                    <div><dt>Impact</dt><dd>{expandedProject.impact}</dd></div>
                  </dl>

                  <ul className="spatial-demo__detail-tools" aria-label="Project tools">
                    {expandedProject.tools.map((tool) => <li key={tool}>{tool}</li>)}
                  </ul>

                  <a href={expandedProject.link} target="_blank" rel="noreferrer">
                    Open live project <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <aside className="spatial-demo__levels" aria-label="Current scene level">
        {LEVELS.map((level, index) => (
          <React.Fragment key={level.label}>
            <button
              className={sectionIndex === index ? 'is-active' : ''}
              type="button"
              onClick={() => goToSection(index)}
              aria-label={level.ariaLabel}
            >
              <span>{String(index).padStart(2, '0')}</span>
              <i />
            </button>
            {index < LEVELS.length - 1 && <div aria-hidden="true" />}
          </React.Fragment>
        ))}
      </aside>

      <p className="spatial-demo__hint">
        {sectionIndex === 0 && 'Scroll down to enter the timeline'}
        {sectionIndex === 1 && `${experienceIndex + 1}/${JOBS.length} · vertical wheel moves the timeline sideways`}
        {sectionIndex === 2 && `${projectIndex + 1}/${DEMO_PROJECTS.length} · vertical wheel moves projects sideways`}
        {sectionIndex === 3 && 'Scroll up to retrace the route'}
      </p>
    </main>
  );
};
