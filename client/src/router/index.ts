import VueRouter, { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import useAuthStore from "../store/auth";
import commonRouter from "./common";
import authRouter from "./auth";
import mainrouter from "./main";
import cdminrouter from "./admin";

const routes = [...commonRouter, ...authRouter, ...mainrouter, ...cdminrouter];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated && to.name !== "signin") {
    return { name: "signin" };
  }

  // if (!authStore.isAdmin && to.name === "admin") {
  //   return { name: "404" };
  // }
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
