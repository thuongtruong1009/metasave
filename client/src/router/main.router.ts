export default [
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
];
