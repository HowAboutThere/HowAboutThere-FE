export const isObject = (obj: unknown): boolean => {
  return obj !== null && typeof obj === "object";
};

export const hasKey = (obj: unknown, key: string): boolean => {
  return obj !== null && typeof obj === "object" && key in obj;
};
