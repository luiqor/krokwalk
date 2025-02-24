const HTTPCode = {
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
  OK: 200,
  BAD_REQUEST: 400,
} as const;

export { HTTPCode };
