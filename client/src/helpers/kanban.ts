import { emojis } from "../shared/emoji";

export const applyDrag = (arr: any, dragResult: any) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }
  return result;
};

export const getRandomEmoji = () => {
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export const getBoardIconbyStatus = (status: number | string): any => {
  var element = {
    img: "",
    icon: "",
  };
  switch (status) {
    case 1:
      element.img = "/src/assets/img/TodoIcon.svg";
      element.icon = "mdi:to-do";
      return element;
    case 2:
      element.img = "/src/assets/img/ProgressIcon.svg";
      element.icon = "game-icons:progression";
      return element;
    case 3:
      element.img = "/src/assets/img/DoneIcon.svg";
      element.icon = "material-symbols:cloud-done-outline";
      return element;
  }
};
