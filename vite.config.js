import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // When deploying to GitHub Pages under a repository (e.g. https://egemen-yilmaz.github.io/money-guard-app/)
  // set the base path so built assets reference the correct subpath.
  base: '/money-guard-app/',
  plugins: [react()],
})
