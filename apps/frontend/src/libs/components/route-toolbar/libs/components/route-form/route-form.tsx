import { memo } from "react";
import { Divider, Button, TextField } from "@mui/material";

import { LocationSelection } from "~/libs/components/components.js";
import { TagsFilterSelector, ToursFilterSelector } from "../components.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import { TripDetailsProps } from "../../types/types.js";

import styles from "./route-form.module.css";

const RouteForm: React.FC = memo(() => {
  const { setValue, register } = useAppForm<TripDetailsProps>({
    defaultValues: {
      startingPoint: "",
      destinationPoint: "",
      tags: [],
      tours: [],
    },
  });

  return (
    <form className={styles.form}>
      <div className={styles.locationSelectionContainer}>
        <LocationSelection onSetValue={setValue} onRegister={register} />
      </div>
      <div className={styles.settingsContainer}>
        <ToursFilterSelector onSetValue={setValue} />
        <TagsFilterSelector onSetValue={setValue} />
        <div>
          <Divider />
          <h3>Select settings</h3>
          <TextField
            label="Provide maximum time for a walk"
            size="small"
            fullWidth
          />
        </div>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </div>
    </form>
  );
});

export { RouteForm };
