import { getConstraintsValidationSchema } from "shared";
import { memo } from "react";
import { Button } from "@mui/material";

import {
  actions as locationAction,
  Screen,
} from "~/modules/location/location.js";
import { actions as tripsActions } from "~/modules/trips/trips.js";
import { LocationSelection } from "~/libs/components/components.js";
import { TagsFilterSelector, ToursFilterSelector } from "../components.js";
import { useAppDispatch, useAppForm } from "~/libs/hooks/hooks.js";
import { TripDetailsProps } from "../../types/types.js";

import styles from "./route-form.module.css";

const RouteForm: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const { setValue, register, handleSubmit } = useAppForm<TripDetailsProps>({
    defaultValues: {
      startingPoint: "",
      destinationPoint: "",
      tags: [],
      tours: [],
    },
    validationSchema: getConstraintsValidationSchema,
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(tripsActions.loadMinimumWalkTime(data));
    dispatch(locationAction.setScreen(Screen.CONSTRAINTS));
  });

  return (
    <form className={styles.form}>
      <div className={styles.locationSelectionContainer}>
        <LocationSelection onSetValue={setValue} onRegister={register} />
      </div>
      <div className={styles.settingsContainer}>
        <ToursFilterSelector onSetValue={setValue} />
        <TagsFilterSelector onSetValue={setValue} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={onSubmit}
        >
          Proceed
        </Button>
      </div>
    </form>
  );
});

export { RouteForm };
