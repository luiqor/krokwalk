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

import styles from "./constraints-form.module.css";
import { tripValidationSchema } from "~/modules/trips/trips.js";
import {
  convertHoursAndMinutesToSeconds,
  convertSecondsToHoursAndMinutes,
} from "./libs/helpers/helpers.js";
import type {
  ConstraintsFormData,
  ConstraintsSubmitData,
  Duration,
} from "./libs/types/types.js";

const ConstraintsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { minimumWalkSeconds, tagsFiltered, toursFiltered } = useAppSelector(
    (state) => state.trips
  );

  const { handleSubmit, setValue, watch } = useAppForm<ConstraintsFormData>({
    defaultValues: {
      duration: {
        hours: 8,
        minutes: 55,
      },
      priorityTags: [],
      priorityTours: [],
    },
    validationSchema: tripValidationSchema,
  });

  const duration = watch("duration");
  const priorityTags = watch("priorityTags");
  const priorityTours = watch("priorityTours");

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
    setValue("priorityTags", tags);
  };

  const handleToursChange = (tours: string[]) => {
    setValue("priorityTours", tours);
  };

  const processFormSubmission = (data: ConstraintsFormData) => {
    const durationInSeconds = convertHoursAndMinutesToSeconds(
      data.duration.hours,
      data.duration.minutes
    );

    const formData: ConstraintsSubmitData = {
      maximumWalkDuration: durationInSeconds,
      priorityTags: data.priorityTags,
      priorityTours: data.priorityTours,
    };

    console.log("Form submitted:", formData);
    // TODO: dispatch
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

        {tagsFiltered && tagsFiltered.length > 0 && (
          <>
            <PrioritySelector
              title="Select Priority Tags"
              items={tagsFiltered}
              onChange={handleTagsChange}
              initialSelection={priorityTags}
            />
            <Divider className={styles.divider} />
          </>
        )}

        {toursFiltered && toursFiltered.length > 0 && (
          <PrioritySelector
            title="Select Priority Tours"
            items={toursFiltered}
            onChange={handleToursChange}
            initialSelection={priorityTours}
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
