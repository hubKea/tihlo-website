'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  priority?: boolean;
  quality?: number;
  className?: string;
  imgClassName?: string;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  priority = false,
  quality = 85,
  className = '',
  imgClassName = '',
}: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!wrap || !img) return;
        const rect = wrap.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        const offset = center * speed;
        img.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <div ref={imgRef} className="will-change-transform" style={{ marginTop: `-${speed * 60}px`, marginBottom: `-${speed * 60}px` }}>
        <Image
          src={src}
          alt={alt}
          fill
          quality={quality}
          priority={priority}
          className={`object-cover ${imgClassName}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>
    </div>
  );
}
