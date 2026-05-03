'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'secondary' | 'white';
  arrow?: boolean;
  as?: 'button' | 'a';
  href?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      arrow = true,
      children,
      className = '',
      size = 'md',
      as: Tag = 'button',
      href,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center gap-2.5 rounded-xl font-display font-medium transition-all duration-200 cursor-pointer relative overflow-hidden group select-none active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]';

    const sizes = {
      sm: 'text-[13px] px-5 py-3',
      md: 'text-[13.5px] px-6 py-3.5',
      lg: 'text-[14px] px-7 py-4',
    };

    const variants = {
      primary:
        'bg-[var(--ink)] text-white border border-[var(--ink)] hover:bg-[var(--red-hover)] hover:border-[var(--red-hover)] shadow-[0_2px_12px_var(--shadow-red)] hover:shadow-[0_4px_20px_var(--shadow-red-hover)] transition-all duration-200',
      ghost:
        'bg-transparent text-[var(--ink)] border border-[var(--dim)] hover:border-[var(--dim)] hover:text-[var(--red-hover)]',
      secondary:
        'bg-transparent text-[var(--ink)] border border-[var(--dim)] hover:border-[var(--dim)] hover:text-[var(--red-hover)]',
      white:
        'bg-white text-[var(--ink)] border border-white hover:bg-[var(--ink)] hover:text-white hover:border-[var(--ink)] transition-all duration-200',
    };

    const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

    const inner = (
      <>
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
        <Link href={href} className={cls}>
          {inner}
        </Link>
      );
    }

    const { type = 'button', ...rest } = props;

    return (
      <button ref={ref} type={type} className={cls} {...rest}>
        {inner}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
