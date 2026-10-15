import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion';


const app = createApp(App)

// One shared reveal animation for every section: use `v-reveal` (optionally with :delay).
app.use(MotionPlugin, {
  directives: {
    reveal: {
      initial: { opacity: 0, y: 24 },
      visibleOnce: { opacity: 1, y: 0, transition: { duration: 500, ease: 'easeOut' } },
    },
  },
})


app.mount('#app')
