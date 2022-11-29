export default [
  {
    path: "/auth",
    name: "auth",
    component: () => import("../layouts/auth.vue"),
    children: [
      {
        path: "signup",
        name: "signup",
        component: () => import("../pages/auth/signup.vue"),
      },
      {
        path: "signin",
        name: "signin",
        component: () => import("../pages/auth/signin.vue"),
      },
    ],
  },
];
