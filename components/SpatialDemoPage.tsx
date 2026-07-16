import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { PROJECTS } from '../constants';
import './SpatialDemoPage.css';

interface SpatialDemoPageProps {
  onNavigate: (path: string) => void;
}

const DEMO_PROJECTS = PROJECTS.slice(0, 5);
const TRANSITION_MS = 780;

const getRelativeProjectPosition = (index: number, activeIndex: number) => {
  const count = DEMO_PROJECTS.length;
  let position = index - activeIndex;

  if (position > Math.floor(count / 2)) position -= count;
  if (position < -Math.floor(count / 2)) position += count;

  return position;
};

export const SpatialDemoPage: React.FC<SpatialDemoPageProps> = ({ onNavigate }) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const animationLock = useRef(false);
  const unlockTimer = useRef<number | null>(null);
  const touchStart = useRef({ x: 0, y: 0 });

  const lockAnimation = useCallback(() => {
    animationLock.current = true;
    if (unlockTimer.current) window.clearTimeout(unlockTimer.current);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    unlockTimer.current = window.setTimeout(() => {
      animationLock.current = false;
    }, prefersReducedMotion ? 0 : TRANSITION_MS);
  }, []);

  const goToSection = useCallback((nextSection: number) => {
    const normalizedSection = Math.max(0, Math.min(1, nextSection));
    if (animationLock.current || normalizedSection === sectionIndex) return;

    lockAnimation();
    setSectionIndex(normalizedSection);
  }, [lockAnimation, sectionIndex]);

  const changeProject = useCallback((direction: -1 | 1) => {
    if (animationLock.current || sectionIndex !== 1) return;

    lockAnimation();
    setProjectIndex((current) => (
      (current + direction + DEMO_PROJECTS.length) % DEMO_PROJECTS.length
    ));
  }, [lockAnimation, sectionIndex]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousTitle = document.title;
    document.body.style.overflow = 'hidden';
    document.title = 'Spatial navigation demo | Andrej Dunaev';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.title = previousTitle;
      if (unlockTimer.current) window.clearTimeout(unlockTimer.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        goToSection(1);
      }

      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        goToSection(0);
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        changeProject(-1);
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        changeProject(1);
      }

      if (event.key === 'Escape') onNavigate('/');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeProject, goToSection, onNavigate]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && sectionIndex === 1) {
      if (Math.abs(event.deltaX) > 18) changeProject(event.deltaX > 0 ? 1 : -1);
      return;
    }

    if (Math.abs(event.deltaY) > 18) {
      goToSection(event.deltaY > 0 ? 1 : 0);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;

    if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 42) return;

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      goToSection(deltaY < 0 ? 1 : 0);
      return;
    }

    changeProject(deltaX < 0 ? 1 : -1);
  };

  const handleExit = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate('/');
  };

  return (
    <main
      className="spatial-demo"
      data-section={sectionIndex}
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
            Selected work
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
            <span>Explore selected work</span>
            <ArrowDown aria-hidden="true" />
          </button>
        </section>

        <section className="spatial-demo__section spatial-demo__work" aria-labelledby="spatial-work-title">
          <div className="spatial-demo__work-heading">
            <p className="spatial-demo__eyebrow">Level 01 · working systems</p>
            <h2 id="spatial-work-title">Selected work</h2>
          </div>

          <div className="spatial-demo__carousel" aria-live="polite">
            {DEMO_PROJECTS.map((project, index) => {
              const position = getRelativeProjectPosition(index, projectIndex);
              const isActive = position === 0;

              return (
                <article
                  className={`spatial-demo__project ${isActive ? 'is-active' : ''}`}
                  data-offset={position}
                  aria-hidden={!isActive}
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
                      <a href={project.link} target="_blank" rel="noreferrer" tabIndex={isActive ? 0 : -1}>
                        Open project <ArrowUpRight aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="spatial-demo__carousel-controls">
            <button type="button" onClick={() => changeProject(-1)} aria-label="Previous project">
              <ArrowLeft aria-hidden="true" />
            </button>
            <span>{String(projectIndex + 1).padStart(2, '0')} — {String(DEMO_PROJECTS.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => changeProject(1)} aria-label="Next project">
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>

      <aside className="spatial-demo__levels" aria-label="Current scene level">
        <button
          className={sectionIndex === 0 ? 'is-active' : ''}
          type="button"
          onClick={() => goToSection(0)}
          aria-label="Go to profile"
        >
          <span>00</span>
          <i />
        </button>
        <div aria-hidden="true" />
        <button
          className={sectionIndex === 1 ? 'is-active' : ''}
          type="button"
          onClick={() => goToSection(1)}
          aria-label="Go to selected work"
        >
          <span>01</span>
          <i />
        </button>
      </aside>

      <p className="spatial-demo__hint">
        {sectionIndex === 0 ? 'Scroll or swipe down' : 'Swipe or use arrow keys'}
      </p>
    </main>
  );
};
