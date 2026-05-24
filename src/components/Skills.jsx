import React, { useEffect, useRef } from 'react';

const skillGroups = [
  {
    title: 'Motion Design',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
    items: [
      'Анімація тексту та титрів',
      'Анімовані лого та брендинг',
      'Графічне оформлення каналів',
      '2D-графіка та акценти',
    ],
    level: 95,
    accent: 'em',
  },
  {
    title: 'Video Production',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="15" height="15" rx="2"/><path d="M17 8l4 2-4 2V8z"/>
      </svg>
    ),
    items: [
      'Монтаж (YouTube / Reels / TikTok)',
      'Динамічна склейка під ритм',
      'Корекція кольору',
      'Sound Design',
      'Анімовані субтитри',
    ],
    level: 92,
    accent: 'em',
  },
  {
    title: 'Tools & Software',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    items: [
      'After Effects',
      'Premiere Pro',
      'DaVinci Resolve',
      'Figma',
      'Illustrator',
      'Cinema 4D',
    ],
    level: 90,
    accent: 'gold',
  },
  {
    title: 'Project Management',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
    items: [
      'Керування продакшном',
      'Організація команди 8+ чол.',
      'Аналітика та оптимізація',
      'Автоматизація процесів',
    ],
    level: 88,
    accent: 'gold',
  },
];

const SkillCard = ({ title, icon, items, level, accent }) => {
  const barRef = useRef(null);
  const cardRef = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && barRef.current && !mounted.current) {
          mounted.current = true;
          setTimeout(() => {
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${level / 100})`;
            }
          }, 300);
        }
      },
      { threshold: 0.4 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [level]);

  const isGold = accent === 'gold';
  const accentColor = isGold ? 'var(--gold)' : 'var(--em)';
  const accentDim = isGold ? 'var(--gold-dim)' : 'var(--em-dim)';
  const accentBorder = isGold ? 'var(--gold-border)' : 'var(--em-border)';

  return (
    <div
      ref={cardRef}
      className="card"
      style={{ padding: '24px', cursor: 'default', height: '100%' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = accentBorder;
        e.currentTarget.style.boxShadow = `var(--shadow-card), 0 0 40px ${isGold ? 'rgba(240,192,64,0.10)' : 'rgba(0,217,126,0.12)'}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: accentDim,
            border: `1px solid ${accentBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: accentColor,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: '15px',
              color: 'var(--tx-1)',
              letterSpacing: '-0.02em',
              marginBottom: '6px',
            }}
          >
            {title}
          </h3>
          {/* Skill bar */}
          <div className="skill-bar-track">
            <div
              ref={barRef}
              className="skill-bar-fill"
              style={{
                transform: 'scaleX(0)',
                background: isGold
                  ? 'linear-gradient(90deg, #c8960a, #f0c040)'
                  : 'linear-gradient(90deg, #00b868, #00d97e)',
              }}
            />
          </div>
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            fontWeight: 600,
            color: accentColor,
            opacity: 0.85,
          }}
        >
          {level}%
        </span>
      </div>

      {/* Items */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
        {items.map(item => (
          <li key={item} className="skill-dot">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.skill-card-wrap');
          cards.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, i * 90);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="col-wide" ref={sectionRef}>

        {/* Section heading */}
        <div style={{ marginBottom: '40px' }}>
          <p className="section-eyebrow">Навички</p>
          <div className="section-divider" style={{ marginBottom: '24px' }} />
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 38px)',
              letterSpacing: '-0.03em',
              color: 'var(--tx-1)',
              lineHeight: 1.1,
            }}
          >
            Що я <span className="grad-em">вмію</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillGroups.map(group => (
            <div
              key={group.title}
              className="skill-card-wrap"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'opacity 0.55s var(--ease-spring), transform 0.55s var(--ease-spring)',
              }}
            >
              <SkillCard {...group} />
            </div>
          ))}
        </div>

        {/* Tools visual row */}
        <div
          style={{
            marginTop: '24px',
            padding: '20px 24px',
            borderRadius: '14px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: 'var(--tx-3)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginRight: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            Stack
          </span>
          {[
            'After Effects', 'Premiere Pro', 'DaVinci Resolve',
            'Cinema 4D', 'Figma', 'Illustrator',
          ].map(tool => (
            <span
              key={tool}
              className="tag"
              style={{ fontSize: '12px', cursor: 'default' }}
            >
              {tool}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
