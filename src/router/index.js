import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../components/layout"),
    name: "defaultLayout",
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("../views/home"),
        name: "home",
      },
      {
        path: "clothing-mall",
        component: () => import("../views/clothing-mall"),
        name: "clothing-mall",
        meta: {
          auth: true,
        },
      },
      {
        path: "clothing-detail",
        component: () => import("../views/clothing-detail"),
        name: "clothing-detail",
        meta: {
          auth: true,
        },
      },
      {
        path: "my-order",
        component: () => import("../views/my-order"),
        name: "my-order",
        meta: {
          auth: true,
        },
      },
      {
        path: "shopping-cart",
        component: () => import("../views/shopping-cart"),
        name: "shopping-cart",
        meta: {
          auth: true,
        },
      },
      {
        path: "about",
        component: () => import("../views/about"),
        name: "about",
      },
      {
        path: "/login",
        component: () => import("../views/login"),
        name: "login",
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
