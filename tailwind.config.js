/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8dd18d',
          400: '#5bb85b',
          500: '#2D5016', // Main forest green
          600: '#244012',
          700: '#1b300e',
          800: '#12200a',
          900: '#091005',
        },
        pine: {
          50: '#fdf8f6',
          100: '#f9f0eb',
          200: '#f2e0d6',
          300: '#e8c9b8',
          400: '#dca894',
          500: '#8B4513', // Main pine brown
          600: '#7a3d11',
          700: '#68350f',
          800: '#562d0d',
          900: '#44250b',
        },
        beige: {
          50: '#fefdfb',
          100: '#fdfbf6',
          200: '#faf6ed',
          300: '#f6f0e3',
          400: '#f2e9d9',
          500: '#F5F5DC', // Main soft beige
          600: '#ddd4c4',
          700: '#c5b3a8',
          800: '#ad928c',
          900: '#957170',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
