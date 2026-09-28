import { createApp } from 'vue'
import App from './App.vue'
// 品牌字专用字体：自托管衬线体 Playfair Display Black（latin 900 子集，内嵌 woff2，无外网依赖）
// 备选：若要切回无衬线，改成 '@fontsource/inter/latin-900.css'（其依赖仍保留在 package.json）
import '@fontsource/playfair-display/latin-900.css'
import 'lenis/dist/lenis.css'
import '@/assets/base.css'

createApp(App).mount('#app')
