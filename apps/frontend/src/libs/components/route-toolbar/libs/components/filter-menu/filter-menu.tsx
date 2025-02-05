import { Tag } from "@mui/icons-material";
import { Popover, IconButton, Typography } from "@mui/material";

import { TitledEntity } from "~/libs/types/types.js";

import styles from "./filter-menu.module.css";

type Props = {
  anchorEl: HTMLElement | null;
  setAnchorEl: (value: HTMLElement | null) => void;
  entityTitle: string;
  entities: TitledEntity[];
  selectedEntities: TitledEntity[];
  onEntityClicked: (value: TitledEntity) => void;
};

const FilterMenu: React.FC<Props> = ({
  anchorEl,
  setAnchorEl,
  entityTitle,
  entities,
  selectedEntities,
  onEntityClicked,
}) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (entity: TitledEntity) => {
    onEntityClicked(entity);
  };

  const checkIsSelected = (entity: TitledEntity) => {
    return (
      selectedEntities.length > 0 &&
      selectedEntities.some((selectedEntity) => selectedEntity.id === entity.id)
    );
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
      <h3>Select {entityTitle}</h3>
      <div className={styles.itemsWrapper}>
        {entities.map((entity, index) => (
          <IconButton
            key={index}
            onClick={() => handleClick(entity)}
            style={{
              borderRadius: 5,
              flexDirection: "column",
              backgroundColor: checkIsSelected(entity)
                ? "#42a4f59c"
                : "transparent",
            }}
          >
            <Tag />
            <Typography variant="caption">{entity.title}</Typography>
          </IconButton>
        ))}
      </div>
    </Popover>
  );
};

export { FilterMenu };
