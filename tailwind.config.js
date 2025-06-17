module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#0f0f1a',
          text: '#f3f4f6',
          purple: '#7c3aed',
          blue: '#2563eb',
          red: '#dc2626',
          cards: '#1f2937'
        },
        light: {
          background: '#f9fafb',
          text: '#111827',
          purple: '#6d28d9',
          blue: '#2563eb',
          red: '#b91c1c',
          cards: '#ffffff'
        }
      },
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}