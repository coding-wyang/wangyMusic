import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/

export default({
  plugins: [
		vue(),
		AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
		Components({
			resolvers:[ElementPlusResolver()],
		}),
	],
	server: {
    host: '192.168.1.195',
    port: 8991,
    // 是否开启 https
    https: false,
  },
	resolve:{
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
		alias:{
			'@': resolve(__dirname,'src'),
			'utils': resolve(__dirname,'src/utils'),
		},
	},
})
