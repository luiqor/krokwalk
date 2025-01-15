import { Divider, Button } from "@mui/material";

import { LocationSelection } from "../components.js";

import styles from "./route-toolbar.module.css";

const RouteToolbar = () => {
  return (
    <div className={styles.toolbar}>
      <form>
        <LocationSelection />
        <Divider />
        <h3>Selected Tours</h3>
        <p>Selected tours will be displayed here</p>
        <Divider />
        <h3>Selected Categories</h3>
        <p>Selected categories will be displayed here</p>
        <Divider />
        <h3>Select settings</h3>
        <p>Settings will be displayed here</p>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
};

export { RouteToolbar };
