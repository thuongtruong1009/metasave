import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/home.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../pages/auth/signup.vue"),
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("../pages/auth/signin.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../pages/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
