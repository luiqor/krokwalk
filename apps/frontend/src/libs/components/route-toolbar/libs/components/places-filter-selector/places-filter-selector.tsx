import { useState } from "react";
import { Add, Tag } from "@mui/icons-material";
import { Chip, Divider, IconButton, Typography } from "@mui/material";

import { UrlFriendlyEntity } from "~/libs/types/types.js";

import styles from "./places-filter-selector.module.css";
import { FilterMenu } from "../filter-menu/filter-menu.js";

type Props = {
  entityTitle: string;
  entities: UrlFriendlyEntity[];
  selectedEntities: UrlFriendlyEntity[];
  onEntityClicked: (entity: UrlFriendlyEntity) => void;
};

const PlacesFilterSelector: React.FC<Props> = ({
  entityTitle,
  entities,
  selectedEntities,
  onEntityClicked,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Divider />
      <div className={styles.titleBox}>
        <h3>Selected {entityTitle}</h3>
        <Chip
          icon={<Add sx={{ fontSize: 16 }} />}
          color="primary"
          variant="outlined"
          label="Add"
          size="small"
          onClick={handleClick}
        />
        <FilterMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          entityTitle={entityTitle}
          entities={entities}
          selectedEntities={selectedEntities}
          onEntityClicked={onEntityClicked}
        />
      </div>
      <div className={styles.content}>
        {selectedEntities.length > 0 ? (
          <>
            {selectedEntities.map((entity, index) => (
              <IconButton
                key={index}
                style={{
                  borderRadius: 0,
                  flexDirection: "column",
                  width: "100px",
                  height: "100px",
                }}
                onClick={() => onEntityClicked(entity)}
              >
                <Tag />
                <Typography variant="caption">{entity.title}</Typography>
              </IconButton>
            ))}
          </>
        ) : (
          <p>Selected {entityTitle} will be displayed here</p>
        )}
      </div>
    </div>
  );
};

export { PlacesFilterSelector };
