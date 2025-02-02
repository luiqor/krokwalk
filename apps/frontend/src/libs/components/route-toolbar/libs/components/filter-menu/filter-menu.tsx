import { Tag } from "@mui/icons-material";
import { Popover, IconButton, Typography } from "@mui/material";

import styles from "./filter-menu.module.css";

const FilterMenu = ({
  anchorEl,
  setAnchorEl,
}: {
  anchorEl: HTMLElement | null;
  setAnchorEl: (value: HTMLElement | null) => void;
}) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Popover
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{ vertical: "center", horizontal: "center" }}
      slotProps={{
        paper: {
          sx: {
            padding: 2,
          },
        },
      }}
    >
      <h3>Select Tags</h3>
      <div className={styles.itemsWrapper}>
        {Array.from({ length: 20 }).map((_, index) => (
          <IconButton
            key={index}
            onClick={handleClose}
            style={{ borderRadius: 0, flexDirection: "column" }}
          >
            <Tag />
            <Typography variant="caption">Label</Typography>
          </IconButton>
        ))}
      </div>
    </Popover>
  );
};

export { FilterMenu };
