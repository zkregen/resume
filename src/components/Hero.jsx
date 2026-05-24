import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const roles = ['Motion Designer', 'Animator', 'Video Editor', 'Project Manager'];

const stats = [
  { target: 12, prefix: '', suffix: 'M+', label: 'переглядів / міс.' },
  { target: 300, prefix: '+', suffix: '%', label: 'зростання охоплення' },
  { target: 100, prefix: '', suffix: '%', label: 'дедлайни виконані' },
];

/* ── Smooth Count Up Sub-component ── */
const CountUp = ({ target, prefix = '', suffix = '', delay = 800, duration = 1200 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let timerId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress * (2 - progress); // Ease Out Quad
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        timerId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const delayId = setTimeout(() => {
      timerId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(delayId);
      if (timerId) cancelAnimationFrame(timerId);
    };
  }, [target, delay, duration]);

  return (
    <>
      {prefix}
      {count}
      {suffix}
    </>
  );
};

const highlights = [
  {
    text: 'Управління міжнародною мережею YouTube-каналів із мільйонними охопленнями.',
    accent: null,
  },
  {
    text: ['Оптимізував виробництво та збільшив охоплення мережі ', 'більш ніж на 300%', '.'],
    accent: 1,
  },
  {
    text: ['Закордонні клієнти та бренди — ', 'США, Німеччина, Фінляндія', '.'],
    accent: 1,
  },
  {
    text: 'Від ідеї та скетчу — до фінального рендеру, саунд-дизайну та публікації.',
    accent: null,
  },
];

const Hero = () => {
  return (
    <section
      id="hero"
      style={{ paddingTop: '128px', paddingBottom: '48px', position: 'relative' }}
    >
      <div className="col-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* ── Left Column: Bio & Info ── */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            
            {/* Name and tags */}
            <div>
              <h1
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(36px, 6vw, 54px)',
                  letterSpacing: '-0.035em',
                  lineHeight: 1.05,
                  color: 'var(--tx-1)',
                  marginBottom: '24px',
                }}
              >
                Микита <span className="grad-em">Ніколаєнко</span>
              </h1>
              
              {/* Role tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {roles.map((role, i) => (
                  <span
                    key={role}
                    className={i === 0 ? 'tag-em' : 'tag'}
                    style={{ fontSize: '11px' }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Bio text */}
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.75,
                color: 'var(--tx-2)',
                maxWidth: '600px',
              }}
            >
              Створюю відеоконтент, який{' '}
              <span
                style={{
                  color: 'var(--tx-1)',
                  fontWeight: 600,
                  borderBottom: '1px solid var(--em-border)',
                  paddingBottom: '1px',
                }}
              >
                вартий уваги
              </span>
              . Спеціалізуюся на моушн-дизайні, анімації та динамічному монтажі для YouTube, Reels та TikTok.
            </p>

            {/* Highlights List */}
            <div className="glass" style={{ padding: '24px 28px' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {highlights.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      fontSize: '14px',
                      lineHeight: 1.65,
                      color: 'var(--tx-2)',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--em)',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700,
                        fontSize: '15px',
                        lineHeight: 1.4,
                        flexShrink: 0,
                        marginTop: '1px',
                      }}
                    >
                      ›
                    </span>
                    <span>
                      {Array.isArray(item.text) ? (
                        item.text.map((part, j) =>
                          j === item.accent ? (
                            <span key={j} style={{ color: 'var(--em)', fontWeight: 700 }}>{part}</span>
                          ) : (
                            <span key={j}>{part}</span>
                          )
                        )
                      ) : (
                        item.text
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '8px' }}>
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
                Портфоліо на Drive
              </a>
            </div>

          </div>

          {/* ── Right Column: Avatar & Stats ── */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-8">
            
            {/* Avatar container */}
            <div style={{ position: 'relative' }}>
              <img
                src="/photo.jpg"
                alt="Микита Ніколаєнко"
                onError={e => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
                className="avatar-ring"
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  animation: 'float 6s ease-in-out infinite',
                }}
              />
              {/* Fallback */}
              <div
                className="avatar-ring"
                style={{
                  display: 'none',
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00d97e, #00b868)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#040b07',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  fontSize: '36px',
                  animation: 'float 6s ease-in-out infinite',
                }}
              >
                МН
              </div>
            </div>

            {/* Stats list */}
            <div
              style={{
                width: '100%',
                maxWidth: '320px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {stats.map(({ target, prefix, suffix, label }) => (
                <div
                  key={label}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '16px',
                    border: '1px solid var(--border-subtle)',
                    background: 'rgba(0, 217, 126, 0.025)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(0, 217, 126, 0.065)';
                    e.currentTarget.style.borderColor = 'var(--em-border)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(0, 217, 126, 0.025)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '12px',
                      color: 'var(--tx-3)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontWeight: 600,
                      lineHeight: 1.3,
                      maxWidth: '140px',
                    }}
                  >
                    {label}
                  </span>
                  <span className="stat-val grad-em" style={{ fontSize: '24px', flexShrink: 0 }}>
                    <CountUp target={target} prefix={prefix} suffix={suffix} />
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
