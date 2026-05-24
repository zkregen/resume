/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        em: {
          DEFAULT: '#00d97e',
          mid:     '#00b868',
          dim:     'rgba(0,217,126,0.10)',
          border:  'rgba(0,217,126,0.22)',
          glow:    'rgba(0,217,126,0.30)',
        },
        gold: {
          DEFAULT: '#f0c040',
          dim:     'rgba(240,192,64,0.10)',
          border:  'rgba(240,192,64,0.25)',
        },
      },
      animation: {
        'fade-up':     'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-glow':  'pulseGlow 2s ease-in-out infinite',
        'float':       'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      borderRadius: {
        'xs': '6px',
        'sm': '10px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
    },
  },
  plugins: [],
}
