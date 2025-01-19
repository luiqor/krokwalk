const { VITE_API_URL } = import.meta.env;

const ENV = {
  API: VITE_API_URL as string,
} as const;

export { ENV };
