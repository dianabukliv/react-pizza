import { defineConfig } from 'vite';
import json from '@rollup/plugin-json'; // Імпортуй плагін для JSON

export default defineConfig({
  plugins: [json()], // Додаємо плагін у масив plugins
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`, // Впевнись, що змінні доступні глобально
      },
    },
  },
});
