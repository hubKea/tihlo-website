'use client';

import { ArrowRight } from 'lucide-react';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'white';
  arrow?: boolean;
  as?: 'button' | 'a';
  href?: string;
  size?: 'sm' | 'md';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', arrow = true, children, className = '', size = 'md', as: Tag = 'button', href, ...props }, ref) => {
    const base =
      'inline-flex items-center gap-2.5 font-display font-medium rounded-none transition-all duration-200 cursor-pointer relative overflow-hidden group select-none';

    const sizes = {
      sm: 'text-[13px] px-5 py-3',
      md: 'text-[13px] px-6 py-3.5',
    };

    const variants = {
      primary:
        'bg-[var(--red)] text-[var(--paper)] hover:bg-[var(--ink)] border border-[var(--red)] hover:border-[var(--ink)]',
      ghost:
        'bg-transparent text-[var(--ink)] border border-[var(--rule-2)] hover:text-[var(--red)] hover:border-[var(--red)]',
      white:
        'bg-[var(--paper)] text-[var(--ink)] border border-[var(--paper)] hover:bg-[var(--red)] hover:text-[var(--paper)] hover:border-[var(--red)]',
    };

    const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

    const inner = (
      <>
        {variant === 'primary' && (
          <span
            className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ animation: 'shimmer 4s ease-in-out infinite 1.5s' }}
          />
        )}
        <span>{children}</span>
        {arrow && (
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        )}
      </>
    );

    if (href) {
      return (
        <a href={href} className={cls}>
          {inner}
        </a>
      );
    }

    return (
      <button ref={ref} className={cls} {...props}>
        {inner}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
