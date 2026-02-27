/* eslint-env node */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(() => {
  const plugins = [react()]

  // Add an optional bundle visualizer when ANALYZE env var is set.
  const analyze = typeof globalThis !== 'undefined' && globalThis.process && (globalThis.process.env.ANALYZE === 'true' || globalThis.process.env.ANALYZE === '1')
  if (analyze) {
    plugins.push(
      // generates `dist/stats.html` with a visual breakdown of bundles
      visualizer({ filename: 'dist/stats.html', open: false })
    )
  }

  return {
    // When deploying to GitHub Pages under a repository (e.g. https://egemen-yilmaz.github.io/money-guard-app/)
    // set the base path so built assets reference the correct subpath.
    base: '/money-guard-app/',
    build: {
      // warn earlier while we iterate on chunking
      chunkSizeWarningLimit: 600,
      // target modern browsers to avoid unnecessary polyfills/transforms
      target: 'es2020',
      // keep esbuild minify (fast) but you can switch to terser if you prefer
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return

            // Group a few large libs into dedicated vendor chunks to reduce the
            // size of the main entry chunk. This makes the critical-path JS
            // smaller and improves FCP/LCP on slow networks.
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor_react'
            }
            if (id.includes('node_modules/react-router') || id.includes('node_modules/react-router-dom')) {
              return 'vendor_react_router'
            }
            if (id.includes('node_modules/chart.js') || id.includes('node_modules/react-chartjs-2')) {
              return 'vendor_chartjs'
            }
            if (id.includes('node_modules/react-datepicker') || id.includes('node_modules/date-fns')) {
              return 'vendor_datepicker'
            }

            // Fallback to per-package chunk (keeps vendor files isolated)
            try {
              const seg = id.split(/node_modules[\\/]/)[1]
              const parts = seg.split(/[\\/]/)
              let pkg = parts[0]
              if (pkg && pkg.startsWith('@')) pkg = `${pkg}/${parts[1]}`
              return `vendor_${pkg.replace('/', '_')}`
            } catch {
              return 'vendor'
            }
          },
        },
      },
    },
    },
  }
})
