import React from 'react';

// Класичний листочок з стеблом — як на зображенні
const LeafSVG = () => (
  <svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Тіло листка */}
    <path
      d="M32 4 C50 4 62 18 62 34 C62 50 50 62 32 62 C14 62 2 50 2 34 C2 18 14 4 32 4 Z"
      fill="#4ade80"
      fillOpacity="0.45"
    />
    {/* Темніша середина для об'єму */}
    <path
      d="M32 10 C46 10 56 20 56 34 C56 48 46 58 32 58 C18 58 8 48 8 34 C8 20 18 10 32 10 Z"
      fill="#22c55e"
      fillOpacity="0.25"
    />
    {/* Центральна прожилка */}
    <path
      d="M32 8 Q34 34 32 60"
      stroke="#16a34a"
      strokeWidth="1.5"
      strokeOpacity="0.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* Бокові прожилки ліво */}
    <path d="M32 22 Q22 28 14 26" stroke="#16a34a" strokeWidth="1" strokeOpacity="0.35" fill="none" strokeLinecap="round"/>
    <path d="M32 34 Q20 38 12 35" stroke="#16a34a" strokeWidth="1" strokeOpacity="0.35" fill="none" strokeLinecap="round"/>
    <path d="M32 46 Q22 48 16 46" stroke="#16a34a" strokeWidth="1" strokeOpacity="0.35" fill="none" strokeLinecap="round"/>
    {/* Бокові прожилки право */}
    <path d="M32 22 Q42 28 50 26" stroke="#16a34a" strokeWidth="1" strokeOpacity="0.35" fill="none" strokeLinecap="round"/>
    <path d="M32 34 Q44 38 52 35" stroke="#16a34a" strokeWidth="1" strokeOpacity="0.35" fill="none" strokeLinecap="round"/>
    <path d="M32 46 Q42 48 48 46" stroke="#16a34a" strokeWidth="1" strokeOpacity="0.35" fill="none" strokeLinecap="round"/>
    {/* Стебло */}
    <path
      d="M32 60 Q30 70 28 76"
      stroke="#15803d"
      strokeWidth="2"
      strokeOpacity="0.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const FallingLeaves = () => {
  // Зменшено до 15 листочків — рідко, але красиво
  const leaves = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${(i / 15) * 110 - 5}%`, // Рівномірно розподілені по ширині
    delay: `${(i / 15) * 25}s`,      // Рівномірна затримка → без купок
    duration: `${14 + (i % 5) * 2}s`, // Різна швидкість, але без рандому
    size: `${28 + (i % 3) * 8}px`,   // 3 розміри: маленький, середній, великий
    swayDuration: `${5 + (i % 3)}s`,
    swayDelay: `${(i % 4)}s`,
    rotateOffset: -25 + (i % 3) * 10, // Легкий нахил, як у природі
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute"
          style={{
            left: leaf.left,
            top: '-10%',
            width: leaf.size,
            height: leaf.size,
            animation: `fall ${leaf.duration} linear infinite`,
            animationDelay: leaf.delay,
            transform: `rotate(${leaf.rotateOffset}deg)`,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              animation: `sway ${leaf.swayDuration} ease-in-out infinite alternate`,
              animationDelay: leaf.swayDelay,
            }}
          >
            <LeafSVG />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FallingLeaves;
