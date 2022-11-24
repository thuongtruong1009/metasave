export const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

export const sliceString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num);
};
