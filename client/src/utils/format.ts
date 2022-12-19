export const truncateString = (str: string, num: number): string => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

export const sliceString = (str: string, num: number): string => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num);
};

export const fixedPercent = (num: number): number => {
  return Number.parseFloat((num * 100).toFixed(2));
};
