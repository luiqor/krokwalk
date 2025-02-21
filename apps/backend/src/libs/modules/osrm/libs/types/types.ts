type Location = {
  hint: string;
  distance: number;
  name: string;
  location: [number, number];
};

type TimeMatrixResponse = {
  code: string;
  destinations: Location[];
  durations: number[][];
  sources: Location[];
};

export type { TimeMatrixResponse, Location };
