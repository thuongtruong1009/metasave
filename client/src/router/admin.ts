export default [
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/layouts/admin.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/pages/admin/login.vue"),
      },
      {
        path: "overview",
        name: "overview",
        component: () => import("@/pages/admin/index.vue"),
      },
    ],
  },
];
