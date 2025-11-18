import React, { useEffect, useState } from 'react';
import { NAV_LINKS } from '../constants';

export const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');

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
              className={`group flex items-center py-3 ${
                activeSection === link.href.substring(1)
                  ? 'text-teal-400'
                  : 'text-slate-500 hover:text-slate-200'
              }`}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              <span
                className={`mr-4 h-px transition-all duration-300 group-hover:w-16 group-hover:bg-slate-200 ${
                  activeSection === link.href.substring(1)
                    ? 'w-16 bg-teal-400'
                    : 'w-8 bg-slate-600'
                }`}
              ></span>
              <span className="text-xs font-bold uppercase tracking-widest">
                {link.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};