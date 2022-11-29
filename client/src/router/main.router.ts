export default [
  {
    path: "/",
    name: "main",
    component: () => import("../layouts/main.vue"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../pages/home.vue"),
      },
      {
        path: "calendar",
        name: "calendar",
        component: () => import("../pages/calendar.vue"),
      },
      {
        path: "about",
        name: "about",
        component: () => import("../pages/about.vue"),
      },
    ],
  },
];
