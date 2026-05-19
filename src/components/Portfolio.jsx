import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Eye, TrendingUp, Clock, Folder, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 'motion-promo',
    type: 'Motion Design',
    title: 'Motion Graphic Promo для digital-бренду',
    description: 'Повноцінний моушн-ролик від скетчу до рендеру: шейп-анімація, кінетична типографіка, саунд-дизайн. Адаптація під YouTube, Reels і TikTok.',
    tasks: ['> Розробка концепції та storyboard', '> Шейп-анімація в After Effects', '> Колор-грейдинг та звукова атмосфера', '> Адаптація під 3 формати'],
    metrics: [{ icon: Eye, value: '2.5M+', label: 'охоплення' }, { icon: TrendingUp, value: '+55%', label: 'CTR' }],
  },
  {
    id: 'youtube-management',
    type: 'Production Management',
    title: 'Управління YouTube-мережею',
    description: 'Комплексне ведення YouTube-каналу з нуля: побудова команди, релізний pipeline, аналітика, A/B-тестування обкладинок.',
    tasks: ['> Pipeline від сценарію до публікації', '> Команда 8+ контент-мейкерів', '> A/B-тестування тайтлів і превʼю', '> Автоматизація звітності Notion'],
    metrics: [{ icon: Eye, value: '12M+', label: 'переглядів/міс.' }, { icon: TrendingUp, value: '+38%', label: 'retention' }],
  },
  {
    id: 'viral-shortform',
    type: 'Video Editing',
    title: 'Viral Short-form серія для TikTok/Reels',
    description: 'Серія вертикального контенту з максимальним утриманням у перші 3 секунди: динамічний монтаж, трендові переходи, субтитри, hook-формули.',
    tasks: ['> Hook-формули для утримання', '> Монтаж під трендовий звук', '> Субтитри з анімацією', '> Постінг-стратегія та аналітика'],
    metrics: [{ icon: Eye, value: '8M+', label: 'переглядів серії' }, { icon: Clock, value: '78%', label: 'completion rate' }],
  },
];

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(true);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  // Автопрокрутка кожні 4 секунди
  useEffect(() => {
    if (!shouldPlay) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [shouldPlay, activeIndex]);

  // Затримка відновлення автопрокрутки на 2 секунди після виходу курсору
  useEffect(() => {
    let timeoutId;
    if (isHovered) {
      setShouldPlay(false);
    } else {
      timeoutId = setTimeout(() => {
        setShouldPlay(true);
      }, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [isHovered]);

  return (
    <section id="portfolio" className="section-block pt-3 sm:pt-4 overflow-hidden relative">
      <div className="w-full max-w-5xl mx-auto px-4">
        {/* Заголовок секції */}
        <div className="flex flex-col items-center mb-10">
          <p className="text-center text-sm font-mono uppercase tracking-[0.25em] text-emerald-850 font-black">ШОУКЕЙС</p>
          <div className="w-full max-w-2xl border-t border-emerald-100 mt-3.5" />
        </div>

        {/* 3D Карусель */}
        <div 
          className="relative h-[520px] sm:h-[460px] w-full flex items-center justify-center perspective-[1200px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {projects.map((project, index) => {
            // Визначаємо позицію картки
            let position = 'right';
            if (index === activeIndex) position = 'center';
            else if (index === (activeIndex - 1 + projects.length) % projects.length) position = 'left';

            const isCenter = position === 'center';
            const isLeft = position === 'left';

            return (
              <div
                key={project.id}
                onClick={() => setActiveIndex(index)}
                className={`absolute w-full max-w-[320px] sm:max-w-[400px] transition-[transform,opacity,filter] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer
                  ${isCenter ? 'z-20' : 'z-10'}
                `}
                style={{
                  transform: isCenter 
                    ? 'translate3d(0, 0, 0) scale(1) rotateY(0deg)' 
                    : isLeft 
                      ? 'translate3d(-55%, 0, -80px) scale(0.85) rotateY(12deg)' 
                      : 'translate3d(55%, 0, -80px) scale(0.85) rotateY(-12deg)',
                  filter: isCenter ? 'blur(0px)' : 'blur(3px)',
                  opacity: isCenter ? 1 : 0.4,
                  willChange: 'transform, opacity, filter',
                }}
              >
                <div className={`card h-[460px] sm:h-[440px] flex flex-col justify-between ${isCenter ? 'shadow-2xl shadow-emerald-900/10 border-emerald-300' : 'shadow-none pointer-events-none border-transparent'} bg-white/90 backdrop-blur-xl`}>
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <span className="text-[11px] font-mono text-emerald-600 font-bold uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded-md">
                          {project.type}
                        </span>
                        <h3 className="text-lg font-black text-zinc-900 mt-3 leading-tight">
                          {project.title}
                        </h3>
                      </div>
                      {isCenter && (
                        <ArrowUpRight
                          size={18}
                          className="flex-shrink-0 text-zinc-400 mt-1"
                        />
                      )}
                    </div>

                    <p className="text-sm text-zinc-600 leading-relaxed mb-5">{project.description}</p>

                    <ul className="space-y-1.5 mb-6">
                      {project.tasks.map((task) => (
                        <li key={task} className="text-xs font-mono text-zinc-500 flex items-start gap-1.5">
                          <span className="text-emerald-500 mt-0.5">{task.split(' ')[0]}</span>
                          <span>{task.split(' ').slice(1).join(' ')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-6 pt-4 border-t border-emerald-100 mt-auto">
                    {project.metrics.map(({ icon: Icon, value, label }) => (
                      <div key={label}>
                        <div className="text-xl font-black gradient-text">{value}</div>
                        <div className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1 font-semibold uppercase tracking-widest">
                          <Icon size={12} className="text-emerald-600" />
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Кнопки управління та індикатори */}
        <div className="flex justify-center items-center gap-6 mt-6">
          <button 
            onClick={handlePrev} 
            className="p-3 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 transition-all shadow-sm hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Індикатори точок */}
          <div className="flex gap-2">
            {projects.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-emerald-600 w-6' : 'bg-zinc-300 w-2 hover:bg-emerald-300'}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext} 
            className="p-3 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 transition-all shadow-sm hover:scale-110 active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Кнопка Google Drive */}
        <div className="mt-6 flex justify-center">
          <a
            id="btn-google-drive"
            href="#"
            className="btn-secondary"
          >
            <Folder size={15} className="text-emerald-600" />
            Повне портфоліо на Google Drive
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
