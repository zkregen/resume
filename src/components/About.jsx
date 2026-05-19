import React, { useEffect, useRef } from 'react';
import { CheckCircle, TrendingUp, Users, Zap } from 'lucide-react';

const highlights = [
  { icon: TrendingUp, text: 'Мільйонні охоплення YouTube-мереж' },
  { icon: Users,      text: 'Управління командами та підрядниками' },
  { icon: Zap,        text: 'Швидкий релізний цикл без збоїв' },
  { icon: CheckCircle,text: '100% дотримання дедлайнів' },
];

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.about-item');
            items.forEach((item, i) => {
              setTimeout(() => {
                item.classList.add('opacity-100', 'translate-y-0');
                item.classList.remove('opacity-0', 'translate-y-6');
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative section-padding" ref={sectionRef}>
      {/* Subtle glow */}
      <div
        className="glow-orb w-[350px] h-[350px] bg-violet-700 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div>
            <div className="about-item opacity-0 translate-y-6 transition-all duration-600 mb-3 text-violet-400 text-sm font-semibold tracking-widest uppercase">
              Про мене
            </div>
            <h2 className="about-item opacity-0 translate-y-6 transition-all duration-600 text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              Ваш контент — <br />
              <span className="gradient-text">моя система</span>
            </h2>
            <p className="about-item opacity-0 translate-y-6 transition-all duration-600 text-slate-400 text-lg leading-relaxed mb-6">
              Спеціалізуюся на управлінні відеовиробництвом та створенні контенту, який{' '}
              <span className="text-slate-200 font-medium">тримає утримання глядача</span>.
              Маю досвід ведення великих YouTube-мереж із мільйонними охопленнями.
            </p>
            <p className="about-item opacity-0 translate-y-6 transition-all duration-600 text-slate-400 text-lg leading-relaxed">
              Об&apos;єдную навички системного Project Manager та хард-скіли у монтажі, дизайні й анімації.
              Оптимізую процеси так, щоб{' '}
              <span className="text-violet-400 font-medium">контент виходив вчасно</span>, а метрики росли.
            </p>
          </div>

          {/* Right — Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, text }, index) => (
              <div
                key={text}
                className="about-item opacity-0 translate-y-6 transition-all duration-600 glass-card p-5 flex items-start gap-4 hover:border-violet-500/40 hover:scale-[1.02] transition-transform duration-300"
                style={{ transitionDelay: `${(index + 4) * 80}ms` }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center">
                  <Icon size={20} className="text-violet-400" />
                </div>
                <p className="text-slate-300 text-sm font-medium leading-snug pt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider bar */}
        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      </div>
    </section>
  );
};

export default About;
