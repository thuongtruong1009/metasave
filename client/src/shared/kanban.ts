export const kanbanTypes = [
  {
    _id: 1,
    name: "Todo",
    img: "/src/assets/img/TodoIcon.svg",
    icon: "mdi:to-do",
    palette: "bg-blue-100 text-blue-700",
    // optional
    props: {
      orientation: "vertical",
    },
    type: "container",
  },
  {
    _id: 2,
    name: "Progressing",
    img: "/src/assets/img/ProgressIcon.svg",
    icon: "game-icons:progression",
    palette: "bg-yellow-100 text-yellow-700",
    // optional
    props: {
      orientation: "vertical",
    },
    type: "container",
  },
  {
    _id: 3,
    name: "Done",
    img: "/src/assets/img/DoneIcon.svg",
    icon: "material-symbols:cloud-done-outline",
    palette: "bg-green-100 text-green-700",
    // optional
    props: {
      orientation: "vertical",
    },
    type: "container",
  },
];
