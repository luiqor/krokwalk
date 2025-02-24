type LocationDetail = {
  original_location: [number, number];
  location: [number, number];
};

type SourceToTargetDetail = {
  distance: number;
  time: number;
  source_index: number;
  target_index: number;
};

type TimeMatrixResponse = {
  sources: LocationDetail[];
  targets: LocationDetail[];
  sources_to_targets: SourceToTargetDetail[][];
  units: string;
  distance_units: string;
  mode: string;
};

export type { TimeMatrixResponse, LocationDetail, SourceToTargetDetail };
