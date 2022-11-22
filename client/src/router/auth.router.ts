export default [
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
];
