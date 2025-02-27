const ensureArray = <T>(value: T | T[] | null | undefined): T[] => {
  if (Array.isArray(value)) {
    return value;
  }

  return value ? [value] : [];
};

export { ensureArray };
