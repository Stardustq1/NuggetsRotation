import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: 'ProfIT-Воплощаем мечты в реальность',
        description: 'ProfIT-Создаем сайты и мобильные приложения с красивым дизайном и SEO-оптимизацией'
      }
    }
  ],
})

export default router
