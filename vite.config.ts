// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import path from 'path'

// export default defineConfig({
//   base: "/ecom/", 
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { copyFileSync } from 'fs'

export default defineConfig({
  base: "/ecom/",
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "copy-404",
      closeBundle() {
        copyFileSync(
          path.resolve(__dirname, "dist/index.html"),
          path.resolve(__dirname, "dist/404.html")
        )
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
