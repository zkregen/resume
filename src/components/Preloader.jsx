import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/* ─────────────────────────────────────────────────────────────
   PRELOADER — 3 слова, тривалість ~4 секунди
   Оптімізований (scaleX замість width)
───────────────────────────────────────────────────────────── */

const WORDS = ['MOTION', 'DESIGN', 'VIDEO'];

const Preloader = ({ onComplete }) => {
  const wrapRef    = useRef(null);
  const topRef     = useRef(null);
  const botRef     = useRef(null);
  const wordsRef   = useRef([]);
  const taglineRef = useRef(null);
  const barWrapRef = useRef(null);
  const barFillRef = useRef(null);
  const pctRef     = useRef(null);
  const canReveal  = useRef(false);
  const loadDone   = useRef(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    /* ──────────────────────────────────────────────
       1. Слова — wipe in / wipe out + fade out для запобігання артефактам clip-path
     ────────────────────────────────────────────── */
    const wordsTl = gsap.timeline();

    WORDS.forEach((_, i) => {
      const el = wordsRef.current[i];
      const isLast = i === WORDS.length - 1;
      const offset = i * 0.95;

      // Wipe in
      wordsTl.fromTo(el,
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'power4.out' },
        offset
      );

      if (!isLast) {
        // Wipe out (крім останнього)
        wordsTl.to(el,
          { clipPath: 'inset(0 0 0 100%)', opacity: 0, duration: 0.38, ease: 'power4.in' },
          offset + 0.58
        );
      }
    });

    // Тегляйн — після останнього слова
    wordsTl.fromTo(taglineRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      WORDS.length * 0.95 + 0.2
    );

    // Прогрес-бар — трохи пізніше
    wordsTl.fromTo(barWrapRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' },
      WORDS.length * 0.95 + 0.55
    );

    /* ──────────────────────────────────────────────
       2. Прогрес симуляція 0 → 82% за допомогою scaleX (GPU accelerated)
     ────────────────────────────────────────────── */
    const progObj = { val: 0 };
    const progTween = gsap.to(progObj, {
      val: 82,
      duration: 3.5,
      ease: 'power1.out',
      delay: 0.8,
      onUpdate() {
        const v = Math.round(progObj.val);
        if (pctRef.current)    pctRef.current.textContent    = v + '%';
        if (barFillRef.current) barFillRef.current.style.transform = `scaleX(${v / 100})`;
      },
    });

    /* ──────────────────────────────────────────────
       3. Мінімум 4 секунди до reveal
     ────────────────────────────────────────────── */
    gsap.delayedCall(4.0, () => {
      canReveal.current = true;
      if (loadDone.current) doReveal();
    });

    /* ──────────────────────────────────────────────
       4. Reveal — запускається по load + мінімум 4с
     ────────────────────────────────────────────── */
    const doReveal = () => {
      progTween.kill();

      // Прогрес → 100%
      const finalObj = { val: parseFloat(pctRef.current?.textContent || 0) };
      const revealTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          onComplete?.();
        },
      });

      revealTl
        .to(finalObj, {
          val: 100,
          duration: 0.5,
          ease: 'power2.inOut',
          onUpdate() {
            const v = Math.round(finalObj.val);
            if (pctRef.current)    pctRef.current.textContent    = v + '%';
            if (barFillRef.current) barFillRef.current.style.transform = `scaleX(${v / 100})`;
          },
        })
        .to({}, { duration: 0.35 })
        // Верхня шторина (2/3) → вгору
        .to(topRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
        })
        // Нижня шторина (1/3) → вправо
        .to(botRef.current, {
          xPercent: 100,
          duration: 1.2,
          ease: 'power4.inOut',
        }, '<')
        .set(wrapRef.current, { display: 'none' });
    };

    const handleLoad = () => {
      loadDone.current = true;
      if (canReveal.current) doReveal();
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }

    return () => {
      progTween.kill();
      wordsTl.kill();
      window.removeEventListener('load', handleLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Styles helpers ──────────────────────────── */
  const S = {
    word: {
      position: 'absolute',
      fontSize: 'clamp(3rem, 11vw, 9rem)',
      fontWeight: 900,
      letterSpacing: '-0.04em',
      lineHeight: 1,
      color: '#f5f0e8',
      clipPath: 'inset(0 100% 0 0)',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      willChange: 'clip-path, opacity',
    },
  };

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        overflow: 'hidden',
        background: '#0a0a0a',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* ── Верхня шторина (2/3) ── */}
      <div
        ref={topRef}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '66.666%',
          background: '#0a0a0a',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: '2.5rem',
          willChange: 'transform',
        }}
      >
        {/* Слова — одне поверх одного */}
        <div style={{ position: 'relative', height: 'clamp(3rem, 11vw, 9rem)', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          {WORDS.map((word, i) => (
            <span
              key={word}
              ref={el => wordsRef.current[i] = el}
              style={S.word}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Тегляйн */}
        <div
          ref={taglineRef}
          style={{
            fontSize: 'clamp(0.6rem, 1.4vw, 0.78rem)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.32)',
            opacity: 0,
            textAlign: 'center',
          }}
        >
          Motion Design · Video Production · Project Management
        </div>

        {/* ── Тонка горизонтальна лінія-декор (рухається вгору разом із шторкою) ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '1px', background: 'rgba(245,240,232,0.05)', zIndex: 3,
        }} />
      </div>

      {/* ── Нижня шторина (1/3) ── */}
      <div
        ref={botRef}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '33.333%',
          background: '#111111',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform',
        }}
      >
        {/* Прогрес-бар */}
        <div
          ref={barWrapRef}
          style={{ width: 'min(360px, 75vw)', opacity: 0 }}
        >
          <div style={{
            width: '100%', height: '1px',
            background: 'rgba(245,240,232,0.08)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div
              ref={barFillRef}
              style={{
                position: 'absolute', top: 0, left: 0,
                height: '100%', width: '100%',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                background: 'linear-gradient(90deg, #2d6a4f, #52b788, #f5f0e8)',
                boxShadow: '0 0 12px rgba(82,183,136,0.6)',
                willChange: 'transform',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.7rem' }}>
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)' }}>
              Loading
            </span>
            <span
              ref={pctRef}
              style={{ fontSize: '0.62rem', fontWeight: 600, color: 'rgba(245,240,232,0.38)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.06em' }}
            >
              0%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
