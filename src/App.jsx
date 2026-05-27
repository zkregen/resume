import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import AmbientOrbs from './components/AmbientOrbs';
import Preloader from './components/Preloader';
import { gsap } from 'gsap';

function App() {
  const glowRef = useRef(null);
  const wrapRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const handlePreloaderComplete = () => {
    setIsLoaded(true);
    const wrap = wrapRef.current;
    if (!wrap) return;

    gsap.fromTo(
      wrap,
      { opacity: 0 },
      { opacity: 1, duration: 0.85, ease: 'power2.out' }
    );
  };

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />

      <div
        ref={wrapRef}
        className={isLoaded ? 'is-loaded' : ''}
        style={{
          position: 'relative',
          minHeight: '100svh',
          background: 'var(--bg-base)',
          color: 'var(--tx-1)',
          opacity: 0,
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
            <Hero isLoaded={isLoaded} />
            <Skills isLoaded={isLoaded} />
            <Portfolio isLoaded={isLoaded} />
          </main>
          <footer
            style={{
              textAlign: 'center',
              padding: '20px 24px 32px',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.08em',
                color: 'var(--tx-3)',
              }}
            >
              Спеціально для сервісу{' '}
              <a
                href="https://freelancehunt.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--tx-3)',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.10)',
                  paddingBottom: '1px',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--em)';
                  e.currentTarget.style.borderBottomColor = 'var(--em-border)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--tx-3)';
                  e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.10)';
                }}
              >
                Freelancehunt
              </a>
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
