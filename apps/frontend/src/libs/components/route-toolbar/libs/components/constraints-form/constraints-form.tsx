import React, { useEffect } from "react";
import { Button, Typography, Divider } from "@mui/material";

import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
} from "~/libs/hooks/hooks.js";
import {
  TimeDurationPicker,
  PrioritySelector,
} from "./libs/components/components.js";
import {
  Screen,
  actions as locationAction,
} from "~/modules/location/location.js";
import { CreateTripBodyDto, actions as tripAction } from "~/modules/trips/trips.js";

import styles from "./constraints-form.module.css";
import { submitTripDataValidationSchema } from "~/modules/trips/trips.js";
import {
  convertHoursAndMinutesToSeconds,
  convertSecondsToHoursAndMinutes,
} from "./libs/helpers/helpers.js";
import type { ConstraintsFormData, Duration } from "./libs/types/types.js";

const ConstraintsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { minimumWalkSeconds, filteredTags, filteredTours } = useAppSelector(
    (state) => state.trips
  );
  const { startingPoint, destinationPoint } = useAppSelector(
    (state) => state.location
  );

  const { handleSubmit, setValue, watch } = useAppForm<ConstraintsFormData>({
    defaultValues: {
      duration: {
        hours: 8,
        minutes: 55,
      },
      prioritizedTags: [],
      prioritizedTours: [],
    },
    validationSchema: submitTripDataValidationSchema,
  });

  const duration = watch("duration");
  const prioritizedTags = watch("prioritizedTags");
  const prioritizedTours = watch("prioritizedTours");

  useEffect(() => {
    if (minimumWalkSeconds !== null) {
      const { hours, minutes } =
        convertSecondsToHoursAndMinutes(minimumWalkSeconds);
      setValue("duration", { hours, minutes });
    }
  }, [minimumWalkSeconds, setValue]);

  if (minimumWalkSeconds === null) {
    dispatch(locationAction.setScreen(Screen.FILTERING));
    return null;
  }

  const handleDurationChange = (newDuration: Duration) => {
    setValue("duration", newDuration);
  };

  const handleTagsChange = (tags: string[]) => {
    setValue("prioritizedTags", tags);
  };

  const handleToursChange = (tours: string[]) => {
    setValue("prioritizedTours", tours);
  };

  const processFormSubmission = (data: ConstraintsFormData) => {
    const durationInSeconds = convertHoursAndMinutesToSeconds(
      data.duration.hours,
      data.duration.minutes
    );

    const formData: CreateTripBodyDto = {
      maximumWalkSeconds: durationInSeconds,
      prioritizedTags: data.prioritizedTags,
      prioritizedTours: data.prioritizedTours,
      startingPoint: startingPoint!,
      destinationPoint: destinationPoint!,
      filteredTags: filteredTags.map((tag) => tag.slug),
      filteredTours: filteredTours.map((tour) => tour.slug),
    };

    dispatch(tripAction.createTrip(formData));
    // TODO: redirect to the next screens
  };

  const onSubmit = handleSubmit(processFormSubmission);

  const { hours: minHours, minutes: minMinutes } =
    convertSecondsToHoursAndMinutes(minimumWalkSeconds);

  return (
    <form className={styles.form}>
      <div className={styles.contentBox}>
        <h3>Select constraints</h3>

        <div className={styles.sectionContainer}>
          <Typography variant="subtitle1" className={styles.sectionTitle}>
            Maximum Walk Duration
          </Typography>
          <TimeDurationPicker
            minHours={minHours}
            minMinutes={minMinutes}
            initialDuration={duration}
            onChange={handleDurationChange}
          />
        </div>

        <Divider className={styles.divider} />

        {filteredTags && filteredTags.length > 0 && (
          <>
            <PrioritySelector
              title="Select Priority Tags"
              items={filteredTags}
              onChange={handleTagsChange}
              initialSelection={prioritizedTags}
            />
            <Divider className={styles.divider} />
          </>
        )}

        {filteredTours && filteredTours.length > 0 && (
          <PrioritySelector
            title="Select Priority Tours"
            items={filteredTours}
            onChange={handleToursChange}
            initialSelection={prioritizedTours}
          />
        )}
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className={styles.submitButton}
        onClick={onSubmit}
      >
        Submit
      </Button>
    </form>
  );
};

export { ConstraintsForm };
