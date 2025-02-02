import { useState } from "react";
import { Add } from "@mui/icons-material";
import { Chip, Divider } from "@mui/material";

import styles from "./places-filter-selector.module.css";
import { FilterMenu } from "../filter-menu/filter-menu.js";

const PlacesFilterSelector = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Divider />
      <div className={styles.titleBox}>
        <h3>Selected Tags</h3>
        <Chip
          icon={<Add sx={{ fontSize: 16 }} />}
          color="primary"
          variant="outlined"
          label="Add"
          size="small"
          onClick={handleClick}
        />
      </div>
      <p>Selected tags will be displayed here</p>
      <FilterMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </div>
  );
};

export { PlacesFilterSelector };
