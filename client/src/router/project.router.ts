export default [
  {
    path: "/project/:projectId",
    name: "project",
    component: () => import("../pages/project/index.vue"),
  },
];
