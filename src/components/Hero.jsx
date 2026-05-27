import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Folder } from 'lucide-react';

// --- Count-up hook with IntersectionObserver ---
function useCountUp(target, duration = 2200, isLoaded = false) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!isLoaded || !started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isLoaded]);

  return { count, ref };
}

// --- Stat item ---
function StatItem({ target, prefix = '', suffix = '', label, isLoaded }) {
  const { count, ref } = useCountUp(target, 2200, isLoaded);
  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5 px-5 first:pl-0 last:pr-0">
      <span
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #00d97e, #80f0c8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {prefix}{count}{suffix}
      </span>
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.72rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--tx-3)',
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </div>
  );
}

const roles = ['Motion Designer', 'Animator', 'Video Editor', 'Project Manager'];

const highlights = [
  'Керував міжнародними YouTube-каналами з мільйонними охопленнями.',
  'Оптимізував продакшн, збільшивши охоплення мережі на понад 300%.',
  'Співпрацюю із закордонними брендами та клієнтами.',
  'Супроводжую весь цикл: від розробки ідеї до саунд-дизайну та публікації.',
];

const Hero = ({ isLoaded }) => {
  return (
    <>
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Hidden states before load */
        .h-f1, .h-f2, .h-f3, .h-f4, .h-f5, .h-f6 {
          opacity: 0;
        }

        .is-loaded .h-f1 { animation: heroFadeUp 0.65s ease both; }
        .is-loaded .h-f2 { animation: heroFadeUp 0.65s ease both; animation-delay: 0.15s; }
        .is-loaded .h-f3 { animation: heroFadeUp 0.65s ease both; animation-delay: 0.25s; }
        .is-loaded .h-f4 { animation: heroFadeUp 0.65s ease both; animation-delay: 0.35s; }
        .is-loaded .h-f5 { animation: heroFadeUp 0.65s ease both; animation-delay: 0.45s; }
        .is-loaded .h-f6 { animation: heroFadeIn 0.9s ease both;  animation-delay: 0.55s; }

        .h-name {
          cursor: default;
        }

        .h-tag {
          display: inline-flex;
          align-items: center;
          padding: 4px 13px;
          border-radius: 9999px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.74rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          border: 1px solid var(--border-subtle);
          background: rgba(255,255,255,0.03);
          color: var(--tx-2);
          transition: all 0.22s ease;
          cursor: default;
        }
        .h-tag:hover {
          border-color: var(--em-border);
          color: var(--em);
          background: rgba(0,217,126,0.06);
        }
        .h-tag-em {
          border-color: var(--em-border);
          background: var(--em-dim);
          color: var(--em);
        }
        .h-tag-em:hover {
          border-color: var(--purple-border);
          color: var(--purple);
          background: var(--purple-dim);
        }

        .h-highlight {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 7px 12px;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.84rem;
          line-height: 1.55;
          color: var(--tx-2);
          transition: background 0.2s ease, color 0.2s ease;
          cursor: default;
        }
        .h-highlight:hover {
          color: var(--tx-1);
        }
        .h-dot {
          flex-shrink: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--em);
          box-shadow: 0 0 8px rgba(0,217,126,0.6);
          transform: translateY(2px);
        }

        .h-stat-sep {
          width: 1px;
          height: 38px;
          align-self: center;
          background: var(--border-subtle);
          flex-shrink: 0;
        }
      `}</style>

      <section
        id="hero"
        style={{ paddingTop: '112px', paddingBottom: '20px', position: 'relative' }}
      >
        <div className="col-wide">
          <div className="flex flex-col items-center lg:flex-row lg:items-end gap-10 lg:gap-14">

            {/* ── LEFT COLUMN ── */}
            <div className="flex-1 flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left w-full">

              {/* Name & Roles */}
              <div className="h-f1">
                <h1
                  className="h-name"
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(2.6rem, 5.8vw, 4.3rem)',
                    letterSpacing: '-0.035em',
                    lineHeight: 1.05,
                    color: 'var(--tx-1)',
                    marginBottom: '10px',
                  }}
                >
                  Микита{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #00d97e, #80f0c8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Ніколаєнко
                  </span>
                </h1>
                <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                  {roles.map((role, i) => (
                    <span key={role} className={i === 0 ? 'h-tag h-tag-em' : 'h-tag'}>
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <p
                className="h-f2"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.08rem',
                  lineHeight: 1.8,
                  color: 'var(--tx-2)',
                  maxWidth: '540px',
                  margin: '0 auto 0 0',
                }}
              >
                Створюю відеоконтент, який{' '}
                <span style={{
                  color: 'var(--tx-1)',
                  fontWeight: 600,
                  borderBottom: '1px solid var(--em-border)',
                  paddingBottom: '1px',
                }}>
                  вартий уваги
                </span>
                . Спеціалізуюся на моушн-дизайні, анімації та динамічному монтажі для{' '}
                <span style={{ color: 'var(--tx-1)', fontWeight: 500 }}>YouTube</span>,{' '}
                <span style={{ color: 'var(--tx-1)', fontWeight: 500 }}>Reels</span> та{' '}
                <span style={{ color: 'var(--tx-1)', fontWeight: 500 }}>TikTok</span>.
              </p>

              {/* Stats row */}
              <div className="h-f3 flex items-center justify-center lg:justify-start">
                <StatItem target={12}  prefix="" suffix="M+" label="переглядів / міс." isLoaded={isLoaded} />
                <div className="h-stat-sep" />
                <StatItem target={300} prefix="+" suffix="%" label="зростання охоплення" isLoaded={isLoaded} />
                <div className="h-stat-sep" />
                <StatItem target={100} prefix="" suffix="%" label="дедлайни виконані" isLoaded={isLoaded} />
              </div>

              {/* CTA buttons */}
              <div className="h-f4 flex flex-wrap gap-3 justify-center lg:justify-start">
                <a
                  href="https://freelancehunt.com/freelancer/thirtyass.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Замовити проєкт
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href="https://drive.google.com/drive/folders/1dHnZJL8DctbLkW8KM1Q5ADQ15FMPYMNy?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Folder size={15} />
                  Портфоліо на Drive
                </a>
              </div>

            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="flex-shrink-0 w-full max-w-[360px] lg:w-[360px] order-1 lg:order-2 h-f6">
              <div
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  background: 'rgba(14,17,28,0.70)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-card)',
                  padding: '24px 28px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '18px',
                  overflow: 'hidden',
                }}
              >
                {/* Glow behind avatar */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 240,
                    height: 240,
                    borderRadius: '9999px',
                    background: 'radial-gradient(circle, rgba(0,217,126,0.20) 0%, rgba(167,139,250,0.10) 50%, transparent 72%)',
                    filter: 'blur(36px)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Avatar */}
                <div className="h-ring relative z-10 p-1">
                  <img
                    src="/photo.jpg"
                    alt="Микита Ніколаєнко"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    style={{
                      width: 148,
                      height: 148,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  {/* Fallback */}
                  <div style={{
                    display: 'none',
                    width: 148,
                    height: 148,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00d97e, #00b868)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#040b07',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 900,
                    fontSize: '36px',
                  }}>
                    МН
                  </div>
                </div>

                {/* Separator */}
                <div style={{
                  width: '100%',
                  height: '1px',
                  background: 'var(--border-subtle)',
                  position: 'relative',
                  zIndex: 1,
                }} />

                {/* Highlights */}
                <div className="w-full flex flex-col gap-0.5 relative z-10">
                  {highlights.map((item, i) => (
                    <div key={i} className="h-highlight">
                      <div style={{ height: '1.55em', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                        <span className="h-dot" aria-hidden="true" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
