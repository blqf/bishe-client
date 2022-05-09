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
        path: 'article',
        component: () => import('../views/article'),
        name: 'article'
      },
      {
        path: 'clothing-mall',
        component: () => import('../views/clothing-mall'),
        name: 'clothing-mall'
      },
      {
        path: 'aboutme',
        component: () => import('../views/about-me'),
        name: 'aboutMe'
      },
      // {
      //   path: '/freeWords',
      //   component: () => import('../views/free-words'),
      //   name: 'freeWords'
      // },
      // {
      //   path: '/message',
      //   component: () => import('../views/message'),
      //   name: 'message'
      // },
      {
        path: '/loginRegister',
        component: () => import('../views/login-register'),
        name: 'loginRegister'
      },
      {
        path: 'detailedcontent',
        component: () => import('../views/detailed-content'),
        name: 'detailedContent'
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
