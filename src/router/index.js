import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/accounts/register',
      name:'register',
      component: ()=> import('@/views/RegisterView.vue'),
      meta:{
        guest: true
      }
    },
    {
      path: '/accounts/login',
      name:'login',
      component: ()=>import('@/views/LoginView.vue'),
      meta:{
        guest: true
      }
    },
    { 
      path: '/accounts/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta:{
        requiresAuth: true
      }

    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: () => import('@/views/NotFoundView.vue')  // lazy loading
    }
  ]
})

router.beforeEach((to, from, next)=>{
  const auth = useAuthStore()
  if(to.meta.requiresAuth && !auth.isAuthenticated){
    next('/accounts/login')
    return 
  }else{
    next()
  }
})

router.beforeEach((to, from, next) =>{
  const auth = useAuthStore()
  if(to.meta.guest){
    if(auth.isAuthenticated){
      next('/')
      return
    }
    next()
    return
  }
  next()
  return
})

export default router
