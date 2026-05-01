'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode, type SVGProps } from 'react';

interface DrawnSVGProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  children: ReactNode;
  duration?: number;
  delay?: number;
  /** Stagger between children paths in seconds. */
  stagger?: number;
  /** Once the element enters viewport, only animate once (default true). */
  once?: boolean;
}

/**
 * Wraps an SVG and animates `pathLength` from 0 → 1 on every direct
 * <path>, <line>, <circle>, <polyline>, <rect>, or <ellipse> child when the SVG
 * enters the viewport. Children are rendered as motion-svg primitives by passing
 * them through unchanged — call sites use motion.path / motion.circle directly
 * with `pathLength={progress}` and the helpers below.
 */
export function DrawnSVG({
  children,
  className,
  ...props
}: DrawnSVGProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });
  const reduced = useReducedMotion();

  return (
    <svg
      ref={ref}
      className={className}
      data-in-view={inView ? 'true' : 'false'}
      data-reduced={reduced ? 'true' : 'false'}
      {...props}
    >
      {children}
    </svg>
  );
}

type ConflictingHandlers =
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onDragStart'
  | 'onDrag'
  | 'onDragEnd'
  | 'onTransitionEnd';

type DrawnPathProps = Omit<
  React.SVGProps<SVGPathElement>,
  'ref' | ConflictingHandlers
> & {
  delay?: number;
  duration?: number;
  /** Whether the path should be drawn (true) or appear immediately (false). */
  draw?: boolean;
};

export function DrawnPath({
  delay = 0,
  duration = 1.6,
  draw = true,
  ...props
}: DrawnPathProps) {
  const ref = useRef<SVGPathElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });
  const reduced = useReducedMotion();

  if (!draw || reduced) {
    return <path ref={ref} {...(props as React.SVGProps<SVGPathElement>)} />;
  }

  return (
    <motion.path
      ref={ref}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{
        pathLength: { duration, ease: [0.16, 1, 0.3, 1], delay },
        opacity: { duration: 0.35, delay },
      }}
      {...props}
    />
  );
}

type DrawnCircleProps = Omit<
  React.SVGProps<SVGCircleElement>,
  'ref' | ConflictingHandlers
> & {
  delay?: number;
  duration?: number;
};

export function DrawnCircle({
  delay = 0,
  duration = 1.2,
  ...props
}: DrawnCircleProps) {
  const ref = useRef<SVGCircleElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });
  const reduced = useReducedMotion();

  if (reduced) {
    return <circle ref={ref} {...(props as React.SVGProps<SVGCircleElement>)} />;
  }

  return (
    <motion.circle
      ref={ref}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{
        pathLength: { duration, ease: [0.16, 1, 0.3, 1], delay },
        opacity: { duration: 0.35, delay },
      }}
      {...props}
    />
  );
}

type DrawnLineProps = Omit<
  React.SVGProps<SVGLineElement>,
  'ref' | ConflictingHandlers
> & {
  delay?: number;
  duration?: number;
};

export function DrawnLineEl({
  delay = 0,
  duration = 1.0,
  ...props
}: DrawnLineProps) {
  const ref = useRef<SVGLineElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });
  const reduced = useReducedMotion();

  if (reduced) {
    return <line ref={ref} {...(props as React.SVGProps<SVGLineElement>)} />;
  }

  return (
    <motion.line
      ref={ref}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{
        pathLength: { duration, ease: [0.16, 1, 0.3, 1], delay },
        opacity: { duration: 0.35, delay },
      }}
      {...props}
    />
  );
}
