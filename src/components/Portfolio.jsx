import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Eye, TrendingUp, Clock, Folder, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const projects = [
  {
    id: 'motion-promo',
    type: 'Motion Design',
    title: 'Motion Graphic Intro для летсплей-каналу',
    video: '/video_intro.mp4',
    description: 'Повноцінний моушн-ролик від скетчу до рендеру. Адаптація під YouTube, Reels і TikTok.',
    tasks: [
      'Розробка концепції та мудборду',
      'Анімація в After Effects',
      'Інтеграція ігрових VFX та SFX',
      'Візуальний хук для утримання глядача',
    ],
    metrics: [{ icon: Eye, value: '1.9M+', label: 'охоплення' }],
    accentColor: '#00d97e',
    tagColor: 'em',
  },
  {
    id: 'youtube-management',
    type: 'Motion Design',
    title: 'Створення 2.5D Паралакс-ефекту',
    video: '/parallax.mp4',
    description: 'Розділення статичного зображення на багатовимірні шари та їх анімація у 3D-просторі After Effects. Додавання глибини різкості (DOF) та світлового об’єму.',
    tasks: [
      'Підготовка та домальовування шарів у Photoshop',
      'Налаштування 3D-камери та фокусної відстані',
      'Створення частинок пилу та туману для атмосфери',
      'Корекція кольору та фінальний рендер у 4K',
    ],
    metrics: [
      { icon: Eye,       value: '2.5D', label: 'Анімація' },
      { icon: Clock,     value: '4K UHD', label: 'Рендер' },
    ],
    accentColor: '#f0c040',
    tagColor: 'gold',
  },
  {
    id: 'viral-shortform',
    type: 'Video Editing',
    title: 'Viral Short-form серія для TikTok/Reels',
    description: 'Серія вертикального контенту з максимальним утриманням у перші 3 секунди: динамічний монтаж, трендові переходи, субтитри, hook-формули.',
    tasks: [
      'Hook-формули для утримання',
      'Монтаж під трендовий звук',
      'Субтитри з анімацією',
      'Постінг-стратегія та аналітика',
    ],
    metrics: [
      { icon: Eye,   value: '8M+', label: 'переглядів серії' },
      { icon: Clock, value: '78%', label: 'completion rate' },
    ],
    accentColor: '#00d97e',
    tagColor: 'em',
  },
];

/* ── Video sub-component ── */
const CardVideo = ({ src, isPlay, accentColor, onDuration }) => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animId;
    let handleDuration;

    if (isPlay) {
      video.play().catch(() => {});
      
      handleDuration = () => {
        if (video.duration && onDuration) {
          onDuration(video.duration * 1000);
        }
      };

      if (video.duration) {
        handleDuration();
      } else {
        video.addEventListener('loadedmetadata', handleDuration);
      }

      // Smooth timeline interpolation to bypass browser video decoder refresh jumps
      let lastTime = performance.now();
      let estimatedTime = video.currentTime;
      
      const updateProgress = () => {
        if (videoRef.current && progressRef.current) {
          const v = videoRef.current;
          const now = performance.now();
          const dt = (now - lastTime) / 1000;
          lastTime = now;

          if (!v.paused) {
            estimatedTime += dt;
            const diff = estimatedTime - v.currentTime;
            
            // If drifted by more than 150ms (like loops/seeks), snap. Otherwise soft-sync.
            if (Math.abs(diff) > 0.15) {
              estimatedTime = v.currentTime;
            } else {
              estimatedTime = estimatedTime * 0.96 + v.currentTime * 0.04;
            }
          } else {
            estimatedTime = v.currentTime;
          }

          if (v.duration) {
            const t = Math.max(0, Math.min(estimatedTime, v.duration));
            const pct = (t / v.duration) * 100;
            progressRef.current.style.width = `${pct}%`;
          }
        }
        animId = requestAnimationFrame(updateProgress);
      };
      animId = requestAnimationFrame(updateProgress);
    } else {
      video.pause();
      video.currentTime = 0;
      if (progressRef.current) {
        progressRef.current.style.width = '0%';
      }
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (video && handleDuration) {
        video.removeEventListener('loadedmetadata', handleDuration);
      }
    };
  }, [isPlay, onDuration]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
        loop
        muted
        playsInline
        preload="metadata"
      />
      {isPlay && (
        <div
          ref={progressRef}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '0%',
            height: '4px',
            background: accentColor,
            boxShadow: `0 0 10px ${accentColor}`,
            zIndex: 3,
            transition: 'none',
          }}
        />
      )}
    </>
  );
};

/* ── Single project card ── */
const ProjectCard = ({ project, isCenter, onVideoDuration }) => {
  const hasVideo = Boolean(project.video);
  const isGold = project.tagColor === 'gold';

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        borderRadius: '22px',
        overflow: 'hidden',
        background: hasVideo ? '#030608' : 'var(--bg-card)',
        border: `1px solid ${isCenter
          ? isGold ? 'rgba(240,192,64,0.28)' : 'rgba(0,217,126,0.28)'
          : 'rgba(255,255,255,0.05)'}`,
        boxShadow: isCenter
          ? `var(--shadow-float), 0 0 60px ${isGold ? 'rgba(240,192,64,0.10)' : 'rgba(0,217,126,0.12)'}`
          : 'none',
        backdropFilter: 'blur(28px)',
        transition: 'border-color 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out)',
      }}
    >
      {/* Video background */}
      {hasVideo && (
        <CardVideo
          src={project.video}
          isPlay={isCenter}
          accentColor={project.accentColor}
          onDuration={onVideoDuration}
        />
      )}

      {/* Gradient overlay */}
      {hasVideo && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(160deg, rgba(3,6,8,0.75) 0%, rgba(3,6,8,0.35) 35%, rgba(3,6,8,0.90) 100%)',
          }}
        />
      )}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '26px',
        }}
      >
        {/* Top block */}
        <div>
          {/* Type badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: project.accentColor,
                background: isGold ? 'var(--gold-dim)' : 'var(--em-dim)',
                border: `1px solid ${isGold ? 'var(--gold-border)' : 'var(--em-border)'}`,
                padding: '4px 11px',
                borderRadius: '99px',
              }}
            >
              {project.type}
            </span>

            {hasVideo && isCenter && (
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Play size={13} fill="white" color="white" />
              </div>
            )}
          </div>

          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: '19px',
              lineHeight: 1.22,
              letterSpacing: '-0.025em',
              color: hasVideo ? '#fff' : 'var(--tx-1)',
              marginBottom: '12px',
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.68,
              color: hasVideo ? 'rgba(255,255,255,0.60)' : 'var(--tx-2)',
              marginBottom: '18px',
            }}
          >
            {project.description}
          </p>

          {/* Tasks */}
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {project.tasks.map(task => (
              <li
                key={task}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '9px',
                  fontSize: '12.5px',
                  color: hasVideo ? 'rgba(255,255,255,0.50)' : 'var(--tx-3)',
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    color: project.accentColor,
                    fontWeight: 800,
                    fontSize: '14px',
                    lineHeight: 1.4,
                    flexShrink: 0,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  ›
                </span>
                {task}
              </li>
            ))}
          </ul>
        </div>

        {/* Metrics row */}
        <div
          style={{
            display: 'flex',
            gap: 0,
            borderTop: `1px solid ${hasVideo ? 'rgba(255,255,255,0.10)' : 'var(--border-subtle)'}`,
            paddingTop: '18px',
            marginTop: '20px',
          }}
        >
          {project.metrics.map(({ icon: Icon, value, label }, i) => (
            <div
              key={label}
              style={{
                flex: 1,
                textAlign: 'center',
                borderRight: i < project.metrics.length - 1
                  ? `1px solid ${hasVideo ? 'rgba(255,255,255,0.08)' : 'var(--border-subtle)'}`
                  : 'none',
                padding: '0 12px',
              }}
            >
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  fontSize: '24px',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '5px',
                  background: isGold
                    ? 'linear-gradient(135deg, #f0c040, #ffe090)'
                    : 'linear-gradient(135deg, #00d97e, #80f0c8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {value}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
                <Icon size={11} color={project.accentColor} />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: hasVideo ? 'rgba(255,255,255,0.40)' : 'var(--tx-3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.10em',
                    fontWeight: 500,
                  }}
                >
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   PORTFOLIO SECTION
══════════════════════════════════════════════════════════════ */
const Portfolio = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [intervalDuration, setIntervalDuration] = useState(8000);

  const next = () => setActive(p => (p + 1) % projects.length);
  const prev = () => setActive(p => (p - 1 + projects.length) % projects.length);

  useEffect(() => {
    setIntervalDuration(8000);
  }, [active]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, intervalDuration);
    return () => clearInterval(id);
  }, [paused, active, intervalDuration]);

  return (
    <section id="portfolio" style={{ paddingTop: '24px', paddingBottom: '96px', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 24px' }}>

        {/* Section heading */}
        <div style={{ marginBottom: '40px' }}>
          <p className="section-eyebrow">Портфоліо</p>
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
            Вибрані <span className="grad-gold">кейси</span>
          </h2>
        </div>

        {/* 3-D Carousel */}
        <div
          style={{
            position: 'relative',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1400px',
            perspectiveOrigin: '50% 45%',
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {projects.map((project, index) => {
            let pos = 'right';
            if (index === active) pos = 'center';
            else if (index === (active - 1 + projects.length) % projects.length) pos = 'left';

            const isCenter = pos === 'center';
            const isLeft = pos === 'left';

            const transform = isCenter
              ? 'translate3d(0,0,0) scale(1) rotateY(0deg)'
              : isLeft
              ? 'translate3d(-54%, 0, -120px) scale(0.82) rotateY(16deg)'
              : 'translate3d(54%, 0, -120px) scale(0.82) rotateY(-16deg)';

            return (
              <div
                key={project.id}
                onClick={() => !isCenter && setActive(index)}
                style={{
                  position: 'absolute',
                  width: '100%',
                  maxWidth: '400px',
                  height: '480px',
                  transition: 'transform 650ms var(--ease-spring), opacity 500ms var(--ease-out), filter 500ms var(--ease-out)',
                  transform,
                  opacity: isCenter ? 1 : 0.30,
                  filter: isCenter ? 'blur(0)' : 'blur(3px)',
                  zIndex: isCenter ? 20 : 10,
                  cursor: isCenter ? 'default' : 'pointer',
                  willChange: 'transform, opacity, filter',
                }}
              >
                <ProjectCard
                  project={project}
                  isCenter={isCenter}
                  onVideoDuration={(dur) => {
                    if (isCenter) {
                      setIntervalDuration(dur + 150); // add a slight buffer (150ms) to ensure smooth transition
                    }
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '32px',
          }}
        >
          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Попередній проєкт"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              border: '1px solid var(--border-mid)',
              background: 'rgba(255,255,255,0.04)',
              color: 'var(--tx-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s var(--ease-out)',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--em-border)';
              e.currentTarget.style.color = 'var(--em)';
              e.currentTarget.style.background = 'var(--em-dim)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-mid)';
              e.currentTarget.style.color = 'var(--tx-2)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                aria-label={`Кейс ${idx + 1}`}
                style={{
                  height: '6px',
                  width: idx === active ? '28px' : '6px',
                  borderRadius: '99px',
                  background: idx === active ? 'var(--em)' : 'rgba(255,255,255,0.18)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.35s var(--ease-spring)',
                  boxShadow: idx === active ? '0 0 12px var(--em-glow)' : 'none',
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Наступний проєкт"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              border: '1px solid var(--border-mid)',
              background: 'rgba(255,255,255,0.04)',
              color: 'var(--tx-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s var(--ease-out)',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--em-border)';
              e.currentTarget.style.color = 'var(--em)';
              e.currentTarget.style.background = 'var(--em-dim)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-mid)';
              e.currentTarget.style.color = 'var(--tx-2)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Drive CTA */}
        <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'center' }}>
          <a
            id="btn-google-drive"
            href="https://drive.google.com/drive/folders/1dHnZJL8DctbLkW8KM1Q5ADQ15FMPYMNy?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Folder size={14} style={{ color: 'var(--em)' }} />
            Повне портфоліо на Google Drive
            <ArrowUpRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
