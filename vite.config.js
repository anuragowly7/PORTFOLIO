import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const deploymentBase = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  plugins: [vue()],
  base: deploymentBase.endsWith('/') ? deploymentBase : `${deploymentBase}/`,
})
