import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "kanban",
    component: () => import("../pages/Kanban.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../pages/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
