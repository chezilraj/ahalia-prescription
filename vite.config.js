import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
    proxy: {
			
      // // Using the proxy instance
      '/api': {
        target: 'https://benius.herokuapp.com',
        changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
      },
      // // Using the proxy instance
      '/uploads': {
        target: 'https://benius-admin.s3.ap-south-1.amazonaws.com',
        changeOrigin: true,
				rewrite: (path) => path.replace(/^\/uploads/, '')
      }

    },
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: { 
         // example : additionalData: `@import "./src/design/styles/variables";`
         // dont need include file extend .scss
         additionalData: `@import "./src/scss/_base.scss";` 
     },
    },
  },
})