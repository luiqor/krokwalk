type Duration = {
  hours: number;
  minutes: number;
};

type PriorityData = {
  priorityTags: string[];
  priorityTours: string[];
};

type ConstraintsFormData = {
  duration: Duration;
} & PriorityData;

type ConstraintsSubmitData = {
  maximumWalkDuration: number;
} & PriorityData;

export type { Duration, ConstraintsFormData, ConstraintsSubmitData };
