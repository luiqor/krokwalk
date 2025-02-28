type Duration = {
  hours: number;
  minutes: number;
};

type ConstraintsFormData = {
  duration: Duration;
  prioritizedTags: string[];
  prioritizedTours: string[];
};

export type { Duration, ConstraintsFormData };
