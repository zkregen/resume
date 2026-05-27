import React, { useState, useEffect } from 'react';
import { X, Send, Mail, ExternalLink } from 'lucide-react';

const navLinks = [
  { href: '#skills',    label: 'Навички' },
  { href: '#portfolio', label: 'Портфоліо' },
  { href: '#contacts',  label: 'Контакти' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setMobileOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const handleNavClick = (e, href) => {
    if (href === '#contacts') {
      e.preventDefault();
      setModalOpen(true);
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
          background: scrolled ? 'rgba(5,5,8,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.045)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1040px',
            margin: '0 auto',
            padding: '0 24px',
            height: '64px',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
          }}
        >
          {/* Left — logo mark only */}
          <a
            href="#hero"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #00d97e 0%, #00b868 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(0,217,126,0.30)',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  fontSize: '13px',
                  color: '#040b07',
                  letterSpacing: '-0.04em',
                }}
              >
                МН
              </span>
            </div>
          </a>

          {/* Center — nav links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
            className="hidden-mobile"
          >
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={e => handleNavClick(e, href)}
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--tx-2)',
                  textDecoration: 'none',
                  padding: '7px 16px',
                  borderRadius: '8px',
                  transition: 'all 0.2s var(--ease-out)',
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--em)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--tx-2)';
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right — empty spacer / mobile hamburger */}
          <div
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Закрити меню' : 'Відкрити меню'}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                border: '1px solid var(--border-mid)',
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--tx-1)',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'none',
              }}
              className="show-mobile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
                }
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            zIndex: 99,
            background: 'rgba(5,5,8,0.97)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={e => {
                setMobileOpen(false);
                handleNavClick(e, href);
              }}
              style={{
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: "'Outfit', sans-serif",
                color: 'var(--tx-1)',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}

      {/* Contact Modal */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {/* Backdrop with blur */}
          <div
            onClick={() => setModalOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 5, 8, 0.75)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          />

          {/* Modal Content */}
          <div
            className="card"
            style={{
              position: 'relative',
              zIndex: 1000,
              width: '100%',
              maxWidth: '440px',
              background: 'rgba(12, 15, 24, 0.90)',
              border: '1px solid var(--em-border)',
              borderRadius: '24px',
              padding: '36px 32px',
              boxShadow: 'var(--shadow-float), 0 0 50px rgba(0, 217, 126, 0.15)',
              animation: 'fadeUp 0.4s var(--ease-spring)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Закрити"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid var(--border-mid)',
                background: 'rgba(255,255,255,0.03)',
                color: 'var(--tx-2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--em-border)';
                e.currentTarget.style.color = 'var(--em)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-mid)';
                e.currentTarget.style.color = 'var(--tx-2)';
              }}
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <p className="section-eyebrow" style={{ display: 'inline-flex', gap: '8px' }}>Зв'язок</p>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  fontSize: '28px',
                  letterSpacing: '-0.02em',
                  marginTop: '8px',
                  marginBottom: '10px',
                  color: 'var(--tx-1)',
                }}
              >
                Почнімо новий <span className="grad-em">проєкт</span>
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--tx-2)', lineHeight: 1.5 }}>
                Оберіть зручний спосіб для зв’язку. Відповідаю швидко!
              </p>
            </div>

            {/* Links Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="https://t.me/thirtyass"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  justifyContent: 'center',
                  padding: '14px',
                  fontSize: '14px',
                  width: '100%',
                }}
              >
                <Send size={16} />
                Написати в Telegram
              </a>

              <a
                href="mailto:thirtyass@gmail.com"
                className="btn-secondary"
                style={{
                  justifyContent: 'center',
                  padding: '14px',
                  fontSize: '14px',
                  width: '100%',
                }}
              >
                <Mail size={16} style={{ color: 'var(--em)' }} />
                Email
              </a>

              <a
                href="https://freelancehunt.com/freelancer/thirtyass.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  justifyContent: 'center',
                  padding: '14px',
                  fontSize: '14px',
                  width: '100%',
                }}
              >
                <ExternalLink size={16} style={{ color: 'var(--em)' }} />
                Freelancehunt
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </>
  );
};

export default Navbar;
