import VueRouter, { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import useAuthStore from "../store/auth";
import CommonRouter from "./common.router";
import AuthRouter from "./auth.router";
import Mainrouter from "./main.router";

const routes = [...CommonRouter, ...AuthRouter, ...Mainrouter];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated && to.name !== "signin") {
    return { name: "signin" };
  }
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
