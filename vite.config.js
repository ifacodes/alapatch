import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    // MAGIE DE VITE : Résout automatiquement les imports, qu'ils soient écrits avec ou sans extension
    extensions: ['.jsx', '.js', '.json']
  },
  server: {
    port: 4321,
    host: '0.0.0.0'
  }
});