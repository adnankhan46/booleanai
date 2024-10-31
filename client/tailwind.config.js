/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
"./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '0 4px 4px #08080814, 0 1px 2px #08080833, inset 0 6px 12px #ffffff1f, inset 0 1px 1px #fff3',
      },
    },
  },
  plugins: [],
}

