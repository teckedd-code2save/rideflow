/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        bg: '#0a0a0f',
        surface: '#111118',
        surface2: '#18181f',
        border: '#222230',
        accent: '#c8f53a',
        accent2: '#3a8bf5',
        accent3: '#f53a7a',
        muted: '#5a5a72',
        success: '#3af5a0',
        warning: '#f5a03a',
      },
    },
  },
  plugins: [],
}
