import { useState } from "react";
import { Chip, Divider, IconButton, Typography } from "@mui/material";
import mapchikRuns from "~/assets/images/mapchik-runs.svg";

import { UrlFriendlyEntity } from "~/libs/types/types.js";
import { Icon } from "~/libs/components/components.js";

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
          icon={<Icon name="plus" fontSize={16} />}
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
                <Icon name="tag" />
                <Typography variant="caption">{entity.title}</Typography>
              </IconButton>
            ))}
          </>
        ) : (
          <>
            <p>Selected {entityTitle} will be displayed here</p>
            <div className={styles.imageBox}>
              <img
                src={mapchikRuns}
                alt="funny character runs"
                className={styles.image}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { PlacesFilterSelector };
