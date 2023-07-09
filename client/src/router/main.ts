export default [
  {
    path: "/",
    name: "main",
    component: () => import("../layouts/main.vue"),
    children: [
      {
        path: "projects",
        name: "projects",
        component: () => import("../pages/project/index.vue"),
      },
      {
        path: "/project/:projectId",
        name: "project",
        component: () => import("../pages/project/overview.vue"),
        children: [
          {
            path: "board/:boardId",
            name: "board",
            component: () => import("../pages/project/board.vue"),
          },
        ],
      },
      {
        path: "events",
        name: "events",
        component: () => import("../pages/calendar/index.vue"),
      },
      {
        path: "about",
        name: "about",
        component: () => import("../pages/about.vue"),
      },
    ],
  },
];
