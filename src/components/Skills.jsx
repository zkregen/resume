import React from 'react';

const skillGroups = [
  {
    title: 'Motion & Animation',
    items: [
      'Шейпова анімація (After Effects)',
      'Кінетична типографіка',
      'Інтро / Аутро для каналів',
      'Particle-ефекти та VFX',
      'Logo reveal & brand animations',
      'Анімація для Reels / TikTok',
    ],
  },
  {
    title: 'Video Production',
    items: [
      'Монтаж YouTube / TikTok / Reels',
      'Динамічна склейка під ритм',
      'Колор-грейдинг (DaVinci Resolve)',
      'Саунд-дизайн та зведення звуку',
      'Субтитри з анімацією',
      'Thumbnail design',
    ],
  },
  {
    title: 'Tools & Software',
    items: [
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'DaVinci Resolve',
      'Adobe Illustrator',
      'Figma',
      'Cinema 4D (базовий)',
    ],
  },
  {
    title: 'Project Management',
    items: [
      'Управління командою продакшну',
      'Релізний calendar & дедлайни',
      'Notion / Asana / Trello',
      'Побудова воркфлоу з нуля',
      'Аналітика YouTube Studio',
      'A/B тестування тайтлів / превʼю',
    ],
  },
];

const Skills = () => (
  <section id="skills" className="section-block pt-0 sm:pt-0 pb-3 sm:pb-4">
    <div className="page-col">
      <div className="flex flex-col items-center mb-10">
        <p className="text-center text-sm font-mono uppercase tracking-[0.25em] text-emerald-850 font-black">СКІЛИ</p>
        <div className="w-full max-w-2xl border-t border-emerald-100 mt-3.5" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {skillGroups.map(({ title, items }) => (
          <div key={title}>
            <h3 className="text-sm font-bold text-zinc-900 mb-3">{title}</h3>
            <ul className="space-y-1.5">
              {items.map((item) => (
                <li key={item} className="text-sm text-zinc-600 leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
