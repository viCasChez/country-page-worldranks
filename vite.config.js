import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/country-page-worldranks/',
  plugins: [react()],
  test: {
    globals: true,             // Permite usar funciones globales como `describe`, `it`, `expect`
    environment: 'jsdom',      // Simula el entorno del navegador para pruebas de React
    setupFiles: './setupTests.js',  // Archivo de configuración inicial para pruebas
  },
})
