import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import AmbientOrbs from './components/AmbientOrbs';

function App() {
  const glowRef = useRef(null);

  useEffect(() => {
    let rafId;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(680px circle at ${currentX}px ${currentY}px, rgba(0, 217, 126, 0.048), transparent 50%)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: 'var(--bg-base)',
        color: 'var(--tx-1)',
      }}
    >
      {/* Cinematic ambient background */}
      <AmbientOrbs />

      {/* Cursor spotlight glow */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          transition: 'none',
        }}
      />

      {/* Page content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Portfolio />
        </main>
      </div>
    </div>
  );
}

export default App;
