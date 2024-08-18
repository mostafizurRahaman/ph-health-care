const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Partial<T> => {
  const finalFiler: Partial<T> = {};

  for (let key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalFiler[key] = obj[key];
    }
  }

  return finalFiler;
};

export default pick;
