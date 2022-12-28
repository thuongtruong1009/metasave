export const capitializeString = (str: string | undefined) => {
  return str ? str.slice(0, 1).toUpperCase() + str.slice(1) : "";
};
