import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../components/layout'),
    name: 'defaultLayout',
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('../views/home'),
        name: 'home'
      },
      {
        path: 'clothing-mall',
        component: () => import('../views/clothing-mall'),
        name: 'clothing-mall',
      },
      {
        path: 'clothing-detail',
        component: () => import('../views/clothing-detail'),
        name: 'clothing-detail'
      },
      {
        path: 'aboutme',
        component: () => import('../views/about-me'),
        name: 'aboutMe'
      },
      {
        path: '/loginRegister',
        component: () => import('../views/login-register'),
        name: 'loginRegister'
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
