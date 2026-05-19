import React from 'react';
import { MapPin, Clock, ExternalLink } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="section-block pt-24 pb-0">
      <div className="page-col">
        {/* Avatar + Name row */}
        <div className="flex items-center gap-5 mb-5 fade-up">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src="/photo.jpg"
              alt="Микита Ніколаєнко"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
              className="w-20 h-20 rounded-full object-cover avatar-ring"
            />
            {/* Fallback placeholder */}
            <div
              className="w-20 h-20 rounded-full avatar-ring bg-gradient-to-br from-emerald-600 to-teal-800 items-center justify-center text-white text-2xl font-black"
              style={{ display: 'none' }}
            >
              МН
            </div>
          </div>

          {/* Name block */}
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 leading-none tracking-tight">
              Микита Ніколаєнко
            </h1>
            {/* Role badges */}
            <div className="flex flex-wrap gap-1.5">
              {['Motion Designer', 'Animator', 'Video Editor', 'Project Manager'].map((role) => (
                <span key={role} className="tag-green">{role}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-4 mb-6 fade-up delay-2">
          <p className="text-zinc-800 text-base leading-relaxed font-medium">
            Створюю відеоконтент, який <span className="text-emerald-800 font-extrabold underline decoration-emerald-500/50 decoration-2 underline-offset-4">вартий уваги</span>. 
            Спеціалізуюся на моушн-дизайні, анімації та динамічному монтажі для YouTube, Reels та TikTok.
          </p>
          
          <div className="bg-white/60 backdrop-blur-sm border border-emerald-100 rounded-xl p-5">
            <ul className="space-y-3.5 text-[15px] sm:text-base text-zinc-900 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 flex-shrink-0 font-mono font-black text-base">&gt;</span>
                <span>Управління міжнародною мережею YouTube-каналів із мільйонними охопленнями.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 flex-shrink-0 font-mono font-black text-base">&gt;</span>
                <span>Оптимізував процеси виробництва та збільшив загальне охоплення мережі <span className="text-emerald-800 font-extrabold bg-emerald-100/80 px-1.5 py-0.5 rounded whitespace-nowrap">більш ніж на 300%</span>.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 flex-shrink-0 font-mono font-black text-base">&gt;</span>
                <span>Робота із закордонними клієнтами та брендами (<span className="text-emerald-850 font-bold">США, Німеччина, Фінляндія</span>).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 flex-shrink-0 font-mono font-black text-base">&gt;</span>
                <span>Веду проєкт від ідеї та скетчу — до фінального рендеру, саунд-дизайну та публікації.</span>
              </li>
            </ul>
          </div>
        </div>      </div>
    </section>
  );
};

export default Hero;
