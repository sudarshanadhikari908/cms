import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        // I needed this to make dev mode work.
        'react/jsx-runtime': 'react/jsx-runtime.js',
      },
    },
    plugins: [react()],
  };
});
