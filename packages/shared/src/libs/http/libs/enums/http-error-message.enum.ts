const HTTPErrorMessage = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  TRIPS: {
    NOT_ENOUGH_PLACES:
      "There are no places to visit on specified path. Please, try to change filters.",
  },
} as const;

export { HTTPErrorMessage };
