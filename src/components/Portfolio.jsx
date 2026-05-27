import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowUpRight, Eye, TrendingUp, Clock, Folder, ChevronLeft, ChevronRight, Play, Pause, Heart } from 'lucide-react';

/* ── Card styles injected once ── */
const CARD_STYLES = `
  /* Badge & item fade-up — matches heroFadeUp */
  @keyframes cardFadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes cardMetricFadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Badge — slightly faster, leads the list */
  .card-badge-active {
    animation: cardFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
    animation-delay: 0s;
  }

  /* Task items — staggered */
  .card-item-anim {
    animation: cardFadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both;
  }
  .card-item-anim-0 { animation-delay: 0.08s; }
  .card-item-anim-1 { animation-delay: 0.16s; }
  .card-item-anim-2 { animation-delay: 0.24s; }
  .card-item-anim-3 { animation-delay: 0.32s; }
  .card-item-anim-4 { animation-delay: 0.40s; }

  /* Task item hover — same as h-highlight */
  .card-task-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 12.5px;
    line-height: 1.55;
    padding: 5px 8px;
    border-radius: 8px;
    cursor: default;
    transition: background 0.2s ease, color 0.2s ease;
  }
  .card-task-item:hover {
    background: rgba(255,255,255,0.04);
  }
  .card-task-item.is-active-card:hover {
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.90) !important;
  }

  .card-metric-wrap {
    animation: cardMetricFadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both;
  }
`;

/* ── Parse a metric value into { numericPart, suffix }
   Examples:  '1.9M+' → { base: 1.9, mult: 1e6, suffix: '+', isFloat: true }
              '52K'   → { base: 52,  mult: 1e3, suffix: '', isFloat: false }
              '4K UHD'→ non-numeric → returns null (render as-is)
              '2.5D'  → non-numeric → returns null                            ── */
function parseMetric(val) {
  const m = String(val).match(/^(\d+(?:\.\d+)?)\s*([KMkm])?\s*([^0-9]*)$/);
  if (!m) return null;
  const num   = parseFloat(m[1]);
  const multi = { K: 1e3, k: 1e3, M: 1e6, m: 1e6 }[m[2]] || 1;
  const suf   = (m[2] ? m[2].toUpperCase() : '') + (m[3] || '');
  const isFloat = m[1].includes('.');
  return { num, multi, suf, isFloat };
}

/* ── Animated metric value ── */
function AnimatedMetric({ value, isActive, sectionVisible, isSteel, isOrange, isPurple, noAnim }) {
  const parsed = parseMetric(value);
  const [display, setDisplay] = useState(value);
  const rafRef   = useRef(null);
  const triggered = useRef(false); // fired for this activation session?

  useEffect(() => {
    if (!parsed || noAnim) return;

    const canAnimate = isActive && sectionVisible;

    if (canAnimate && !triggered.current) {
      // Section is visible + card is center → start count-up
      triggered.current = true;
      const start  = performance.now();
      const dur    = 1800;
      const target = parsed.num;

      const tick = (now) => {
        const prog  = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - prog, 3);
        const cur   = parsed.isFloat
          ? (eased * target).toFixed(1)
          : Math.floor(eased * target);
        setDisplay(`${cur}${parsed.suf}`);
        if (prog < 1) rafRef.current = requestAnimationFrame(tick);
        else setDisplay(value);
      };
      rafRef.current = requestAnimationFrame(tick);
    }

    if (!isActive) {
      // Card left center — reset so it animates again next visit
      triggered.current = false;
      setDisplay(value);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isActive, sectionVisible, value]);

  const gradient = isSteel
    ? 'linear-gradient(135deg, #7b94b8, #b0c5e3)'
    : isOrange
    ? 'linear-gradient(135deg, #ff7a00, #ffb066)'
    : isPurple
    ? 'linear-gradient(135deg, #a78bfa, #d8b4fe)'
    : 'linear-gradient(135deg, #00d97e, #80f0c8)';

  return (
    <div
      className={isActive && sectionVisible ? 'card-metric-wrap' : ''}
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 900,
        fontSize: '24px',
        letterSpacing: '-0.04em',
        lineHeight: 1,
        marginBottom: '5px',
        backgroundImage: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {display}
    </div>
  );
}

const projects = [
  {
    id: 'motion-promo',
    type: 'Motion Design',
    title: 'Motion Graphic Intro для летсплей-каналу',
    video: '/video_intro.mp4',
    link: 'https://drive.google.com/file/d/1wLy9R18XibbOxhiDttZUbjxNjT933s7k/view?usp=sharing',
    description: 'Повноцінний моушн-ролик від скетчу до рендеру. Адаптація під YouTube, Reels і TikTok.',
    tasks: [
      'Розробка концепції та мудборду',
      'Анімація в After Effects',
      'Інтеграція ігрових VFX та SFX',
      'Візуальний хук для утримання глядача',
    ],
    metrics: [
      { icon: Eye,   value: '1.9M+', label: 'охоплення' },
      { icon: Heart, value: '52K',   label: 'лайків' },
    ],
    accentColor: '#00d97e',
    tagColor: 'em',
  },
  {
    id: 'youtube-management',
    type: 'Motion Design',
    title: 'Створення 2.5D Паралакс-ефекту',
    video: '/parallax.mp4',
    link: 'https://drive.google.com/file/d/1JmCGrIz1S5wnAPAp8wBqKg5wvlp19RpN/view?usp=sharing',
    description: 'Розділення статичного зображення на багатовимірні шари та їх анімація у 3D-просторі After Effects. Додавання глибини різкості (DOF) та світлового об’єму.',
    tasks: [
      'Підготовка та домальовування шарів у Photoshop',
      'Налаштування 3D-камери та фокусної відстані',
      'Створення частинок пилу та туману для атмосфери',
      'Корекція кольору та фінальний рендер у 4K',
    ],
    metrics: [
      { icon: Eye,   value: '2.5D',   label: 'Анімація' },
      { icon: Clock, value: '4K UHD', label: 'Рендер',   noAnim: true },
    ],
    accentColor: '#a78bfa',
    tagColor: 'purple',
  },
  {
    id: 'viral-shortform',
    type: 'Video Editing',
    title: 'Short-form відео на баскетбольну тематику',
    video: '/basket2.mp4',
    link: 'https://drive.google.com/file/d/1xyO10ElHWyDATpcen7Z_pZ9AADpmFAob/view?usp=sharing',
    description: 'Динамічний монтаж спортивного контенту з фокусом на видовищність та передачу атмосфери гри.',
    tasks: [
      'Створення плавних Speed Ramps',
      'Синхронізація відеоряду з ритмом та акцентами треку',
      'Динамічна робота з камерою',
      'Корекція кольору',
    ],
    metrics: [
      { icon: Eye,   value: '3.3M', label: 'переглядів' },
      { icon: Heart, value: '47K',  label: 'лайків' },
    ],
    accentColor: '#ff7a00',
    tagColor: 'orange',
  },
];

/* ── Video sub-component ── */
const CardVideo = ({ src, isPlay, accentColor, onDuration, onEnded }) => {
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
        muted
        playsInline
        preload="metadata"
        onEnded={onEnded}
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
const ProjectCard = ({ project, isCenter, sectionVisible, onVideoDuration, onEnded }) => {
  const hasVideo = Boolean(project.video);
  const isSteel  = project.tagColor === 'steel';
  const isOrange = project.tagColor === 'orange';
  const isPurple = project.tagColor === 'purple';

  // animKey changes each time card becomes center AND section visible
  // — both badge and task items use it to re-trigger stagger animation
  const [animKey, setAnimKey] = useState(0);
  const prevCenter = useRef(false);
  useEffect(() => {
    if (isCenter && sectionVisible && !prevCenter.current) setAnimKey(k => k + 1);
    prevCenter.current = isCenter;
  }, [isCenter, sectionVisible]);

  const badgeGlow = isSteel
    ? 'rgba(141,166,201,0.55)'
    : isOrange
    ? 'rgba(255,122,0,0.55)'
    : isPurple
    ? 'rgba(167,139,250,0.55)'
    : 'rgba(0,217,126,0.55)';

  // Dot color matches accent, glow matches accent
  const dotGlow = isSteel
    ? 'rgba(141,166,201,0.65)'
    : isOrange
    ? 'rgba(255,122,0,0.65)'
    : isPurple
    ? 'rgba(167,139,250,0.65)'
    : 'rgba(0,217,126,0.65)';

  return (
    <>
      {/* Inject card CSS once */}
      <style>{CARD_STYLES}</style>

      <div
        style={{
          position: 'relative',
          height: '100%',
          borderRadius: '22px',
          overflow: 'hidden',
          background: hasVideo ? '#030608' : 'var(--bg-card)',
          border: `1px solid ${isCenter
            ? isSteel
              ? 'rgba(141,166,201,0.22)'
              : isOrange
              ? 'rgba(255,122,0,0.30)'
              : isPurple
              ? 'rgba(167,139,250,0.30)'
              : 'rgba(0,217,126,0.28)'
            : 'rgba(255,255,255,0.05)'}`,
          boxShadow: isCenter
            ? `var(--shadow-float), 0 0 60px ${
                isSteel
                  ? 'rgba(141,166,201,0.08)'
                  : isOrange
                  ? 'rgba(255,122,0,0.14)'
                  : isPurple
                  ? 'rgba(167,139,250,0.14)'
                  : 'rgba(0,217,126,0.12)'
              }`
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
            onEnded={onEnded}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Type badge — animates when card becomes center */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span
                key={animKey}
                className={isCenter && sectionVisible ? 'card-badge-active' : ''}
                style={{
                  '--badge-glow': badgeGlow,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: project.accentColor,
                  background: 'none',
                  border: 'none',
                  padding: '0',
                  display: 'inline-block',
                }}
              >
                {project.type}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: '19px',
                lineHeight: 1.22,
                letterSpacing: '-0.025em',
                color: hasVideo ? '#fff' : 'var(--tx-1)',
              }}
            >
              {project.title}
            </h3>

            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.68,
                color: hasVideo ? 'rgba(255,255,255,0.60)' : 'var(--tx-2)',
              }}
            >
              {project.description}
            </p>

            {/* Tasks — hero-highlight style: dot + fade-up stagger */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px', margin: '0 -8px' }}>
              {project.tasks.map((task, idx) => (
                <li
                  key={`${animKey}-${idx}`}
                  className={[
                    'card-task-item',
                    isCenter ? 'is-active-card' : '',
                    isCenter && sectionVisible ? `card-item-anim card-item-anim-${idx}` : '',
                  ].join(' ')}
                  style={{
                    color: hasVideo ? 'rgba(255,255,255,0.52)' : 'var(--tx-2)',
                  }}
                >
                  {/* Glowing dot, accent-colored */}
                  <span
                    style={{
                      flexShrink: 0,
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: project.accentColor,
                      boxShadow: `0 0 8px ${dotGlow}`,
                      marginTop: '6px',
                      display: 'inline-block',
                    }}
                  />
                  {task}
                </li>
              ))}
            </ul>

          </div>

          {/* Bottom block with Google Drive Link & Metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Subtle Google Drive Link */}
            {project.link && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    fontFamily: "'JetBrains Mono', monospace",
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                    paddingBottom: '2px',
                    transition: 'all 0.25s var(--ease-out)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = project.accentColor;
                    e.currentTarget.style.borderBottomColor = project.accentColor;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)';
                    e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                >
                  <span>Google Drive</span>
                  <ArrowUpRight size={11} />
                </a>
              </div>
            )}

            {/* Metrics row — animated count-up */}
            <div
              style={{
                display: 'flex',
                gap: 0,
                borderTop: `1px solid ${hasVideo ? 'rgba(255,255,255,0.10)' : 'var(--border-subtle)'}`,
                paddingTop: '14px',
              }}
            >
              {project.metrics.map(({ icon: Icon, value, label, noAnim }, i) => (
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
                  <AnimatedMetric
                    value={value}
                    isActive={isCenter}
                    sectionVisible={sectionVisible}
                    isSteel={isSteel}
                    isOrange={isOrange}
                    isPurple={isPurple}
                    accentColor={project.accentColor}
                    noAnim={!!noAnim}
                  />
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
      </div>
    </>
  );
};

/* ══════════════════════════════════════════════════════════════
   PORTFOLIO SECTION
══════════════════════════════════════════════════════════════ */
const Portfolio = ({ isLoaded }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [intervalDuration, setIntervalDuration] = useState(8000);

  // Becomes true (and stays true) once section enters the viewport
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isLoaded]);

  const next = () => setActive(p => (p + 1) % projects.length);
  const prev = () => setActive(p => (p - 1 + projects.length) % projects.length);

  useEffect(() => {
    const hasVideo = Boolean(projects[active].video);
    setIntervalDuration(hasVideo ? 15000 : 8000);
  }, [active]);

  useEffect(() => {
    if (paused || !isLoaded) return;
    const id = setInterval(next, intervalDuration);
    return () => clearInterval(id);
  }, [paused, active, intervalDuration, isLoaded]);

  return (
    <section ref={sectionRef} id="portfolio" style={{ paddingTop: '20px', paddingBottom: '96px', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 24px' }}>

        {/* Section heading */}
        <div style={{ marginBottom: '44px' }}>
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
            Вибрані <span className="grad-steel">кейси</span>
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
                  sectionVisible={sectionVisible}
                  onVideoDuration={(dur) => {
                    if (isCenter) {
                      setIntervalDuration(dur + 3000);
                    }
                  }}
                  onEnded={() => {
                    if (isCenter) next();
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
                  background: idx === active ? projects[idx].accentColor : 'rgba(255,255,255,0.18)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.35s var(--ease-spring)',
                  boxShadow: idx === active ? `0 0 12px ${projects[idx].accentColor}80` : 'none',
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
