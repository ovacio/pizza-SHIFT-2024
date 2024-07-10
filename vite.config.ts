import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: '@data',
        replacement: fileURLToPath(new URL('./src/data', import.meta.url)),
      },
    ],
  },
});
