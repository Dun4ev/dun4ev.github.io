import React, { useEffect, useState } from 'react';
import { NAV_LINKS } from '../constants';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  onNavigate?: (path: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) {
      e.preventDefault();
      onNavigate?.(href);
      return;
    }

    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
      setActiveSection(targetId);
    }
  };

  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="mt-16 w-max">
        {NAV_LINKS.map((link) => (
          <li key={link.name}>
            <a
              className={`group flex items-center py-3 transition-colors duration-300 ${activeSection === link.href.substring(1)
                ? 'text-teal-400'
                : 'text-slate-500 hover:text-slate-200'
                }`}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              <span
                className={`mr-4 h-px transition-all duration-300 ease-in-out motion-reduce:transition-none ${activeSection === link.href.substring(1)
                  ? 'w-16 bg-teal-400'
                  : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200'
                  }`}
              ></span>
              <span className="text-xs font-bold uppercase tracking-widest transition-colors duration-300">
                {t(`nav.${link.name.toLowerCase().split(' ')[0]}`)}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
