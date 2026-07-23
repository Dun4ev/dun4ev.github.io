import {
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './LineSidebar.css';

type Falloff = 'linear' | 'smooth' | 'sharp';

export interface LineSidebarItem {
  href: string;
  label: string;
}

interface LineSidebarProps {
  items: LineSidebarItem[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  activeIndex?: number | null;
  defaultActive?: number | null;
  onItemClick?: (
    index: number,
    item: LineSidebarItem,
    event: MouseEvent<HTMLAnchorElement>,
  ) => void;
  className?: string;
  ariaLabel?: string;
}

const FALLOFF_CURVES: Record<Falloff, (proximity: number) => number> = {
  linear: (proximity) => proximity,
  smooth: (proximity) => proximity * proximity * (3 - 2 * proximity),
  sharp: (proximity) => proximity * proximity * proximity,
};

const LineSidebar = ({
  items,
  accentColor = '#2dd4bf',
  textColor = '#64748b',
  markerColor = '#475569',
  showIndex = false,
  showMarker = true,
  proximityRadius = 88,
  maxShift = 16,
  falloff = 'smooth',
  markerLength = 52,
  markerGap = 16,
  tickScale = 0.38,
  scaleTick = true,
  itemGap = 2,
  fontSize = 0.75,
  smoothing = 140,
  activeIndex,
  defaultActive = null,
  onItemClick,
  className = '',
  ariaLabel = 'In-page jump links',
}: LineSidebarProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const smoothingRef = useRef(smoothing);
  const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActive);
  const resolvedActiveIndex = activeIndex === undefined ? internalActiveIndex : activeIndex;
  const activeIndexRef = useRef(resolvedActiveIndex);

  activeIndexRef.current = resolvedActiveIndex;
  smoothingRef.current = smoothing;

  const runFrame = useCallback((now: number) => {
    const deltaTime = Math.min((now - lastFrameRef.current) / 1000, 0.05);
    lastFrameRef.current = now;
    const smoothingTime = Math.max(smoothingRef.current, 1) / 1000;
    const easing = reducedMotionRef.current ? 1 : 1 - Math.exp(-deltaTime / smoothingTime);
    let moving = false;

    itemRefs.current.forEach((element, index) => {
      if (!element) return;

      const target = Math.max(
        targetsRef.current[index] ?? 0,
        activeIndexRef.current === index ? 1 : 0,
      );
      const current = currentRef.current[index] ?? 0;
      const next = current + (target - current) * easing;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;

      currentRef.current[index] = value;
      element.style.setProperty('--effect', value.toFixed(4));
      if (!settled) moving = true;
    });

    animationFrameRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (animationFrameRef.current !== null) return;
    lastFrameRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLUListElement>) => {
      if (event.pointerType === 'touch') return;

      const list = listRef.current;
      if (!list) return;

      const listRect = list.getBoundingClientRect();
      const pointerY = event.clientY - listRect.top;
      const ease = FALLOFF_CURVES[falloff];

      itemRefs.current.forEach((element, index) => {
        if (!element) return;

        const center = element.offsetTop + element.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        const proximity = Math.max(0, 1 - distance / proximityRadius);
        targetsRef.current[index] = ease(proximity);
      });

      startLoop();
    },
    [falloff, proximityRadius, startLoop],
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = items.map(() => 0);
    startLoop();
  }, [items, startLoop]);

  const handleFocus = useCallback(
    (index: number) => {
      targetsRef.current[index] = 1;
      startLoop();
    },
    [startLoop],
  );

  const handleBlur = useCallback(
    (index: number) => {
      targetsRef.current[index] = 0;
      startLoop();
    },
    [startLoop],
  );

  const handleClick = useCallback(
    (
      index: number,
      item: LineSidebarItem,
      event: MouseEvent<HTMLAnchorElement>,
    ) => {
      if (activeIndex === undefined) setInternalActiveIndex(index);
      onItemClick?.(index, item, event);
    },
    [activeIndex, onItemClick],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => {
      reducedMotionRef.current = mediaQuery.matches;
      startLoop();
    };

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);
    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, [startLoop]);

  useEffect(() => {
    targetsRef.current = items.map((_, index) => targetsRef.current[index] ?? 0);
    currentRef.current = items.map((_, index) => currentRef.current[index] ?? 0);
    itemRefs.current = itemRefs.current.slice(0, items.length);
    startLoop();
  }, [items, resolvedActiveIndex, startLoop]);

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    },
    [],
  );

  const style = {
    '--accent-color': accentColor,
    '--text-color': textColor,
    '--marker-color': markerColor,
    '--marker-length': `${markerLength}px`,
    '--marker-gap': `${markerGap}px`,
    '--tick-scale': tickScale,
    '--max-shift': `${maxShift}px`,
    '--item-gap': `${itemGap}px`,
    '--font-size': `${fontSize}rem`,
  } as CSSProperties;

  return (
    <nav
      aria-label={ariaLabel}
      className={`line-sidebar${showMarker ? ' line-sidebar--markers' : ''}${scaleTick ? ' line-sidebar--scale-tick' : ''}${className ? ` ${className}` : ''}`}
      style={style}
    >
      <ul
        ref={listRef}
        className="line-sidebar__list"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {items.map((item, index) => (
          <li
            key={`${item.href}-${item.label}`}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            className="line-sidebar__item"
          >
            <a
              className="line-sidebar__link"
              href={item.href}
              aria-current={resolvedActiveIndex === index ? 'location' : undefined}
              onBlur={() => handleBlur(index)}
              onClick={(event) => handleClick(index, item, event)}
              onFocus={() => handleFocus(index)}
            >
              {showMarker && (
                <span className="line-sidebar__marker" aria-hidden="true" />
              )}
              <span className="line-sidebar__label">
                {showIndex && (
                  <span className="line-sidebar__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
                <span className="line-sidebar__text">{item.label}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LineSidebar;
