import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteBase = (env.VITE_SITE_URL || '').trim().replace(/\/$/, '')

  return {
    plugins: [
      react(),
      {
        name: 'html-site-base',
        transformIndexHtml(html) {
          let out = html.replaceAll('%SITE_BASE%', siteBase)
          if (siteBase) {
            out = out.replace(
              '</head>',
              `    <link rel="canonical" href="${siteBase}/" />\n  </head>`,
            )
          }
          return out
        },
      },
    ],
  }
})
