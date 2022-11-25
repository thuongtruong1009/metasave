export default [
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../pages/404.vue"),
  },
];
