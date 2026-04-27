'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Lightweight value-noise for terrain displacement (no external dep).
function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}
function noise2(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  const u = smoothstep(xf);
  const v = smoothstep(yf);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}
function fbm(x: number, y: number) {
  let f = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < 4; i++) {
    f += amp * noise2(x * freq, y * freq);
    amp *= 0.5;
    freq *= 2;
  }
  return f;
}

export default function HeroTerrain() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    // Memory + connection gating
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    if (nav.deviceMemory && nav.deviceMemory < 2) return;
    if (nav.connection?.saveData) return;

    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0e1014, 8, 28);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 6, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Terrain
    const SEG = 64;
    const SIZE = 32;
    const geom = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
    geom.rotateX(-Math.PI / 2);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const n = fbm(x * 0.18, z * 0.18);
      // Push edges down slightly to suggest a basin/escarpment
      const edgeFalloff = 1 - Math.min(1, Math.max(Math.abs(x), Math.abs(z)) / (SIZE / 2));
      const h = (n - 0.4) * 4.2 * (0.4 + edgeFalloff * 0.6);
      pos.setY(i, h);
    }
    geom.computeVertexNormals();

    const wireMat = new THREE.LineBasicMaterial({
      color: 0xf4f1ea,
      transparent: true,
      opacity: 0.22,
    });
    const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geom), wireMat);

    const fillMat = new THREE.MeshBasicMaterial({
      color: 0x0e1014,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    });
    const fill = new THREE.Mesh(geom, fillMat);
    fill.position.y = -0.02;

    const group = new THREE.Group();
    group.add(fill);
    group.add(wire);
    scene.add(group);

    // Corridor markers — 3 red dots at approx Mpumalanga / Limpopo / Northern Cape positions on the plane
    const markerData = [
      { x: 6, z: -2, label: 'MPU' },
      { x: 3, z: -7, label: 'LIM' },
      { x: -8, z: 3, label: 'NCP' },
    ];
    const markers: THREE.Mesh[] = [];
    const markerGeom = new THREE.SphereGeometry(0.22, 16, 16);
    markerData.forEach((m) => {
      const mat = new THREE.MeshBasicMaterial({ color: 0xb42318, transparent: true, opacity: 0.95 });
      const sphere = new THREE.Mesh(markerGeom, mat);
      // Sample terrain height at marker
      const localY = fbm(m.x * 0.18, m.z * 0.18);
      const edge = 1 - Math.min(1, Math.max(Math.abs(m.x), Math.abs(m.z)) / (SIZE / 2));
      const h = (localY - 0.4) * 4.2 * (0.4 + edge * 0.6);
      sphere.position.set(m.x, h + 0.4, m.z);
      group.add(sphere);
      markers.push(sphere);

      // Halo ring
      const ringGeom = new THREE.RingGeometry(0.4, 0.42, 32);
      ringGeom.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xb42318,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.set(m.x, h + 0.05, m.z);
      ring.userData.baseScale = 1;
      group.add(ring);
      markers.push(ring);
    });

    let raf = 0;
    const start = performance.now();
    let running = true;

    function loop(now: number) {
      if (!running) return;
      const t = (now - start) / 1000;
      group.rotation.y = t * 0.04;
      // Subtle breathing on markers
      markers.forEach((m, i) => {
        if ('isMesh' in m && (m as THREE.Mesh).geometry instanceof THREE.RingGeometry) {
          const s = 1 + Math.sin(t * 1.6 + i) * 0.4 + 0.4;
          m.scale.setScalar(s);
          (m.material as THREE.MeshBasicMaterial).opacity = 0.55 - Math.min(0.45, (s - 1) * 0.4);
        } else {
          m.scale.setScalar(1 + Math.sin(t * 2 + i * 1.2) * 0.08);
        }
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }

    function onResize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    function onVis() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    }

    raf = requestAnimationFrame(loop);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      renderer.dispose();
      geom.dispose();
      wireMat.dispose();
      fillMat.dispose();
      markerGeom.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5]"
      style={{ mixBlendMode: 'screen', opacity: 0.55 }}
    />
  );
}
