import { Divider, Button, TextField } from "@mui/material";

import { LocationSelection } from "../components.js";

import styles from "./route-toolbar.module.css";
import {
  TagsFilterSelector,
  ToursFilterSelector,
} from "./libs/components/components.js";

const RouteToolbar = () => {
  return (
    <div className={styles.toolbar}>
      <form className={styles.form}>
        <div className={styles.locationSelectionContainer}>
          <LocationSelection />
        </div>
        <div className={styles.settingsContainer}>
          <ToursFilterSelector />
          <TagsFilterSelector />
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
    </div>
  );
};

export { RouteToolbar };
