import React, { useEffect, useRef, useState } from 'react';
import { Mail, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SOCIAL_LINKS } from '../constants';
import { LanguageSwitcher } from './LanguageSwitcher';

interface MobileNavigationProps {
  routePath: string;
  onNavigate: (path: string) => void;
}

interface MobileNavItem {
  key: string;
  labelKey: string;
  path: string;
  section?: string;
}

const MOBILE_NAV_ITEMS: readonly MobileNavItem[] = [
  { key: 'home', labelKey: 'mobileNav.home', path: '/' },
  { key: 'about', labelKey: 'nav.about', path: '/#about', section: 'about' },
  { key: 'experience', labelKey: 'nav.experience', path: '/#experience', section: 'experience' },
  { key: 'skills', labelKey: 'nav.skills', path: '/#skills', section: 'skills' },
  { key: 'projects', labelKey: 'nav.projects', path: '/projects', section: 'projects' },
  { key: 'labs', labelKey: 'nav.labs', path: '/labs', section: 'labs' },
  { key: 'knowledge', labelKey: 'nav.knowledge', path: '/knowledge-base', section: 'knowledge' },
  { key: 'articles', labelKey: 'nav.articles', path: '/articles', section: 'articles' },
] as const;

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  routePath,
  onNavigate,
}) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (routePath !== '/') {
      setActiveSection('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [routePath]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches && dialogRef.current?.open) {
        dialogRef.current.close();
      }
    };

    desktopQuery.addEventListener('change', closeOnDesktop);
    return () => desktopQuery.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
  }, []);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) {
      return;
    }

    dialog.showModal();
    window.requestAnimationFrame(() => {
      setIsOpen(true);
      closeButtonRef.current?.focus();
    });
  };

  const closeMenu = () => {
    if (!dialogRef.current?.open) {
      return;
    }

    setIsOpen(false);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    closeTimerRef.current = window.setTimeout(() => {
      dialogRef.current?.close();
      closeTimerRef.current = null;
    }, reduceMotion ? 0 : 200);
  };

  const handleNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    event.preventDefault();
    closeMenu();
    onNavigate(path);
  };

  const isItemActive = (item: MobileNavItem) => {
    if (item.section && routePath === '/' && activeSection === item.section) {
      return true;
    }

    return item.path === routePath && !activeSection;
  };

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-lightestNavy bg-navy backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6 md:px-12">
          <a
            href="/"
            onClick={(event) => handleNavigate(event, '/')}
            className="inline-flex h-11 items-center text-sm font-bold tracking-[0.18em] text-lightestSlate transition-colors hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            DUN4EV
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={openMenu}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-lightestNavy bg-lightNavy px-4 text-sm font-semibold text-lightestSlate transition-colors hover:border-teal hover:text-teal active:bg-lightestNavy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            aria-controls="mobile-navigation-dialog"
            aria-expanded={isOpen}
          >
            {t('mobileNav.menu')}
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-navigation-dialog"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-left text-lightSlate backdrop:bg-navy lg:hidden"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => {
          setIsOpen(false);
          menuButtonRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeMenu();
          }
        }}
        aria-label={t('mobileNav.primary_label')}
      >
        <div
          className={`ml-auto flex h-dvh w-full max-w-md flex-col overflow-y-auto overscroll-contain border-l border-lightestNavy bg-navy px-6 py-5 shadow-2xl shadow-black/50 transition-all duration-200 ease-out motion-reduce:transition-none md:px-10 ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
          }`}
        >
          <div className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-lightestNavy bg-navy pb-5">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-lightestSlate">
              {t('mobileNav.title')}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-lightestNavy text-lightSlate transition-colors hover:border-teal hover:text-teal active:bg-lightNavy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              aria-label={t('mobileNav.close')}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 py-6" aria-label={t('mobileNav.primary_label')}>
            <ol>
              {MOBILE_NAV_ITEMS.map((item, index) => {
                const isActive = isItemActive(item);

                return (
                  <li key={item.key} className="border-b border-lightestNavy">
                    <a
                      href={item.path}
                      onClick={(event) => handleNavigate(event, item.path)}
                      className={`group flex min-h-14 items-center gap-4 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal ${
                        isActive
                          ? 'text-teal'
                          : 'text-lightSlate hover:text-lightestSlate'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span
                        className={`w-7 text-xs font-semibold tabular-nums ${
                          isActive ? 'text-teal' : 'text-slate'
                        }`}
                        aria-hidden="true"
                      >
                        {String(index).padStart(2, '0')}
                      </span>
                      <span className="flex-1 text-lg font-semibold">
                        {t(item.labelKey)}
                      </span>
                      {isActive && (
                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
                          {t('mobileNav.current')}
                        </span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="border-t border-lightestNavy pt-5">
            <LanguageSwitcher size="touch" />
            <div className="mt-5 flex items-center gap-5 text-sm font-semibold">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center text-slate transition-colors hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="inline-flex min-h-11 items-center gap-2 text-slate transition-colors hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
