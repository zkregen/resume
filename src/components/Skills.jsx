import React from 'react';

const skillGroups = [
  {
    title: 'Motion Design',
    items: [
      'Анімація тексту та титрів',
      'Анімовані лого та брендинг',
      'Графічне оформлення каналів',
      '2D-графіка та акценти',
      'Робота з масками та фоном',
    ],
  },
  {
    title: 'Video Production',
    items: [
      'Креативний монтаж (YouTube / Reels / TikTok)',
      'Динамічна склейка під ритм',
      'Корекція кольору та Sound Design',
      'Анімовані субтитри',
      'Створення обкладок (Thumbnails)',
    ],
  },
  {
    title: 'Tools & Software',
    items: [
      'After Effects / Premiere Pro / DaVinci',
      'Figma / Illustrator / Cinema 4D',
    ],
  },
  {
    title: 'Project Management',
    items: [
      'Керування продакшном (команда та дедлайни)',
      'Організація роботи (Notion / Asana / Trello)',
      'Аналітика та оптимізація (CTR / превʼю)',
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
