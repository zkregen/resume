import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

const navLinks = [
  { href: '#skills',    label: 'Скіли' },
  { href: '#portfolio', label: 'Кейси' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/85 backdrop-blur-md border-b border-emerald-100' : 'bg-transparent'
      }`}
    >
      <div className="page-col flex items-center justify-center h-14">
        <nav className="flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-xs text-zinc-500 hover:text-emerald-700 transition-colors tracking-wide font-medium"
            >
              {label}
            </a>
          ))}
          <a
            href="https://freelancehunt.com/freelancer/thirtyass.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-100/60 hover:bg-emerald-100 border border-emerald-200/85 px-3 py-1 rounded-full font-bold transition-all shadow-sm shadow-emerald-900/5 hover:scale-105 active:scale-95"
          >
            <span>Freelancehunt</span>
            <ExternalLink size={11} className="text-emerald-700" />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
