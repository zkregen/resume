import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import FallingLeaves from './components/FallingLeaves';

function App() {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!glowRef.current) return;
      
      const x = e.clientX;
      const y = e.clientY;
      
      // М'яке смарагдове світіння, яке слідує за курсором
      glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.07), transparent 45%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative bg-[#e3f0e6] text-zinc-800 min-h-screen antialiased selection:bg-emerald-500/20">
      {/* Падаючі листочки на фоні */}
      <FallingLeaves />

      {/* Ефект світіння за курсором */}
      <div 
        ref={glowRef}
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      />
      
      {/* Основний контент поверх фону */}
      <div className="relative z-10">
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
