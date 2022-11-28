// export const random = (min: number, max: number) => {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

export const getIndex = (array: string[], index: number) =>
  index % array.length;
