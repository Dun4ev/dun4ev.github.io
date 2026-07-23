import React, { useEffect, useState } from 'react';
import { NAV_LINKS } from '../constants';
import { useTranslation } from 'react-i18next';
import LineSidebar, { type LineSidebarItem } from './LineSidebar';

interface NavigationProps {
  onNavigate?: (path: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const { t } = useTranslation();
  const items: LineSidebarItem[] = NAV_LINKS.map((link) => ({
    href: link.href,
    label: t(`nav.${link.name.toLowerCase().split(' ')[0]}`),
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-15% 0px -75% 0px',
        threshold: 0,
      }
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

  const activeIndex = NAV_LINKS.findIndex(
    (link) => link.href.substring(1) === activeSection,
  );

  return (
    <div className="mt-16 hidden lg:block">
      <LineSidebar
        items={items}
        activeIndex={activeIndex >= 0 ? activeIndex : null}
        onItemClick={(_, item, event) => handleNavClick(event, item.href)}
      />
    </div>
  );
};
