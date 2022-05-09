import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/layout/default.vue'),
    name: 'defaultLayout',
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('../views/pages/home.vue'),
        name: 'home'
      },
      {
        path: 'article',
        component: () => import('../views/pages/article.vue'),
        name: 'article'
      },
      {
        path: 'clothing-mall',
        component: () => import('../views/pages/clothing-mall.vue'),
        name: 'clothing-mall'
      },
      {
        path: 'aboutme',
        component: () => import('../views/pages/about-me.vue'),
        name: 'aboutMe'
      },
      // {
      //   path: '/freeWords',
      //   component: () => import('../views/pages/free-words.vue'),
      //   name: 'freeWords'
      // },
      // {
      //   path: '/message',
      //   component: () => import('../views/pages/message.vue'),
      //   name: 'message'
      // },
      {
        path: '/loginRegister',
        component: () => import('../views/pages/login-register.vue'),
        name: 'loginRegister'
      },
      {
        path: 'detailedcontent',
        component: () => import('../views/article-detailed/detailed-content.vue'),
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
