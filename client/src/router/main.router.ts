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
            path: "kanban/:kanbanId",
            name: "kanban",
            component: () => import("../pages/project/kanban.vue"),
          },
        ],
      },
      {
        path: "calendar",
        name: "calendar",
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
