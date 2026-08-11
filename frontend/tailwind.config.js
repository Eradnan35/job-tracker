/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F1115',
        surface: '#1A1D24',
        accent: {
          cyan: '#00E5FF',
          purple: {
            start: '#7B61FF',
            end: '#B084FF'
          }
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#F43F5E',
        text: {
          primary: '#F3F4F6',
          muted: '#9CA3AF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'level-1': '0 4px 20px rgba(0, 0, 0, 0.2)',
        'level-2': '0 12px 40px rgba(0, 0, 0, 0.4)',
        'inner-glass': 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      },
      borderRadius: {
        'app': '16px',
        'panel': '12px',
        'control': '8px',
        'chip': '9999px'
      }
    },
  },
  plugins: [],
}
