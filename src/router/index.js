import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/establishments',
      name: 'establishments',
      component: () => import('../views/EstablishmentsView.vue')
    },
    {
      path: '/details_establishment/:id',
      name: 'details_establishment',
      component: () => import('../views/DetailsEstablishmentView.vue')

    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('../views/OnboardingView.vue'),
    },
  ]
})

export default router
