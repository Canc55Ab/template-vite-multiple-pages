import { createApp } from 'vue'
import '@/styles/index.less'
import 'vant/lib/index.css'
import '@/utils/rem.ts'
import App from './App.vue'
import i18n from '@/utils/i18n'

createApp(App).use(i18n).mount('#app')
