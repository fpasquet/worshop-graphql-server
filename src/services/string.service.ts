export const snakeCase = (str: string): string =>
  str.replace(/(?:([a-z])([A-Z]))|(?:((?!^)[A-Z])([a-z]))/g, '$1_$3$2$4').toLowerCase();

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
