import { createRouter, createWebHistory } from 'vue-router'
import RiveView from '@/views/RiveView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'RiveView',
      component: RiveView,
    },
  ],
})

export default router
