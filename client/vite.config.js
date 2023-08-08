// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// // vite.config.js
// export default {
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000', // Replace with your backend URL
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''), // Remove the '/api' prefix
//       },
//     },
//   },
// };

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  commonjsOptions: {
    esmExternals: true,
 },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Replace with your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove the '/api' prefix
      },
    },
  },
})
