import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';

const SkillRadar = lazy(() => import('./SkillRadar').then((module) => ({ default: module.SkillRadar })));

export const DeferredRadar = () => {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={container} className="min-h-[396px]">
    {visible && <Suspense fallback={null}><SkillRadar /></Suspense>}
  </div>;
};
