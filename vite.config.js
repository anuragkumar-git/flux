import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Flux',
        short_name: 'Flux',
        description: 'Offline first Time Tracking PWA',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa1.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }

    })
  ],
})
