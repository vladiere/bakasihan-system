/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: ["./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "cyberpunk",
      "emerald",
      "corporate",
      "retro",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "night",
      "dim",
      "sunset",
    ],
  },
  plugins: [
    daisyui,
  ],
}

