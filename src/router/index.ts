import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ContactPage from '@/pages/ContactPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import ContactForm from '@/components/ContactForm.vue'
import ContactDetails from '@/components/ContactDetails.vue'


const routes: Array<RouteRecordRaw> = [
  
{
  path: '/',
  redirect : '/login'
},
{
  path : '/login',
  name : 'Login',
  component: LoginPage
},
{ 
    path: '/contacts', 
    name: 'ContactPage',
    component: ContactPage, 
    meta: { requiresAuth: true }
 },
 {
  path: '/contact-form',
  name : 'ContactForm',
  component: ContactForm,
  meta: { requiresAuth: true }
 },
 { path: '/contact/:name', 
  name: 'ContactDetail', 
  component: ContactDetails, 
  props: true, 
  meta: { requiresAuth: true } }

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('LoggedInUser') 
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login') 
  } else if (to.path === '/login' && isLoggedIn) {
    next('/contacts')
  } else {
    next() 
  }
})

export default router
