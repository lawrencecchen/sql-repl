import { defineConfig } from "vite";
import solid from "solid-start";
import Unocss from 'unocss/vite'
import presetUno from '@unocss/preset-uno'

export default defineConfig({
  plugins: [solid(), Unocss({
    presets: [
      presetUno(),
    ],
  })],
  server: {
    host: "0.0.0.0"
  }
});
