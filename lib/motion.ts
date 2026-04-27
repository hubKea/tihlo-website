import type { Variants } from 'framer-motion';

// Three curves. No others.
export const ease = {
  cinematic: [0.16, 1, 0.3, 1] as const,
  soft: [0.4, 0, 0.2, 1] as const,
  scroll: [0.22, 1, 0.36, 1] as const,
} as const;

export const durations = {
  micro: 0.18,
  short: 0.4,
  medium: 0.7,
  long: 1.0,
  hero: 1.4,
} as const;

// FadeUp — standard scroll reveal
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.long,
      ease: ease.cinematic,
      delay,
    },
  }),
};

// FadeIn — opacity only, no movement
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: durations.medium,
      ease: ease.soft,
      delay,
    },
  }),
};

// Stagger container
export const stagger = (staggerChildren = 0.15): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
    },
  },
});

// Mask reveal — clip-path wipe for hero headlines
export const maskReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: (delay: number = 0) => ({
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      duration: durations.long,
      ease: ease.cinematic,
      delay,
    },
  }),
};

// Line draw — for SVG stroke animations
export const lineDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: durations.hero,
        ease: ease.cinematic,
        delay,
      },
      opacity: {
        duration: 0.1,
        delay,
      },
    },
  }),
};

// Scale in — for dots, circles
export const scaleIn: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (delay: number = 0) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: durations.medium,
      ease: ease.cinematic,
      delay,
    },
  }),
};

// Intersection observer options (standard)
export const inViewOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -10% 0px',
};
