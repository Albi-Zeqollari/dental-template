import { createElement, type CSSProperties, type ReactNode } from 'react';
import { useAnimatedNumber, useInView } from '../hooks';

interface RevealProps {
  as?: 'div' | 'li' | 'section' | 'aside';
  id?: string;
  delay?: number;
  className?: string;
  children: ReactNode;
}

/** Fades and lifts its content in when it scrolls into view. */
export function Reveal({ as = 'div', id, delay = 0, className = '', children }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();
  return createElement(
    as,
    {
      ref,
      id,
      className: `reveal${inView ? ' is-visible' : ''}${className ? ` ${className}` : ''}`,
      style: { '--reveal-delay': `${delay}ms` } as CSSProperties,
    },
    children,
  );
}

interface AnimatedNumberProps {
  value: number;
  format: (n: number) => string;
  duration?: number;
}

export function AnimatedNumber({ value, format, duration }: AnimatedNumberProps) {
  const current = useAnimatedNumber(value, duration);
  return <>{format(Math.round(current))}</>;
}

/** Counts up from 0 the first time it scrolls into view. */
export function CountUp({ to, format }: { to: number; format: (n: number) => string }) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.6 });
  return (
    <span ref={ref}>
      <AnimatedNumber value={inView ? to : 0} format={format} duration={1400} />
    </span>
  );
}
