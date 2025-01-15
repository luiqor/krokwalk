import { TextField } from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Place, LocationSearching } from "@mui/icons-material";
import { timelineItemClasses } from "@mui/lab/TimelineItem";

import styles from "./location-selection.module.css";

const LocationSelection = () => {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
        padding: 0,
      }}
    >
      <TimelineItem sx={{ minHeight: 0 }}>
        <TimelineSeparator>
          <TimelineDot color="inherit">
            <div className={styles.iconWrapper}>
              <LocationSearching sx={{ fontSize: 16 }} />
            </div>
          </TimelineDot>
          <TimelineConnector className={styles.dottedLine} />
        </TimelineSeparator>
        <TimelineContent sx={{ paddingRight: 0 }}>
          <TextField required label="Starting point" fullWidth size="small" />
        </TimelineContent>
      </TimelineItem>
      <TimelineItem sx={{ minHeight: 0 }}>
        <TimelineSeparator>
          <TimelineDot color="inherit">
            <div className={styles.iconWrapper}>
              <Place />
            </div>
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent sx={{ paddingRight: 0 }}>
          <TextField required label="Destination" fullWidth size="small" />
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export { LocationSelection };
