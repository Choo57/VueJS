import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue') // route level code-splitting, this generates a separate chunk (Dashboard.[hash].js) for this route which is lazy-loaded when the route is visited.
    }
  ]
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore(); 

  if ( !authStore.isLoggedIn && to.name !== 'home' ) { // Check if user is authenticated. Also check for the "to" route to prevent an infinite redirect loop
    return { name: 'home' } // redirect the user to the login page
  }
})

export default router
