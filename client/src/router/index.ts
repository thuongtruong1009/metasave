import VueRouter, { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../layouts/main.vue"),
    children: [
      {
        path: "home",
        component: () => import("../pages/home.vue"),
      },
      {
        path: "calendar",
        component: () => import("../pages/calendar.vue"),
      },
      {
        path: "about",
        component: () => import("../pages/about.vue"),
      },
    ],
  },
  {
    path: "/project/:projectId",
    name: "project",
    component: () => import("../pages/project/index.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../layouts/auth.vue"),
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

router.beforeResolve(
  (
    to: VueRouter.RouteLocationNormalized,
    from: VueRouter.RouteLocationNormalized,
    next: VueRouter.NavigationGuardNext
  ) => {
    if (to.name) {
      NProgress.start();
    }
    next();
  }
);

router.afterEach(() => {
  NProgress.done();
});

export default router;
