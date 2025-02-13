import { InputAdornment, TextField } from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Place, LocationSearching, MyLocation } from "@mui/icons-material";
import { timelineItemClasses } from "@mui/lab/TimelineItem";

import styles from "./location-selection.module.css";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import {
  actions as locationAction,
  StartingPoint,
} from "~/modules/location/location.js";

type RouteToolbarForm = {
  startingPoint: string;
  endPoint: string;
  maxTime: number;
  tags: string[];
  tours: string[];
};

type Props = {
  onSetValue: UseFormSetValue<RouteToolbarForm>;
  onRegister: UseFormRegister<RouteToolbarForm>;
};

const LocationSelection: React.FC<Props> = ({ onSetValue, onRegister }) => {
  const [isTracking, setIsTracking] = useState<boolean>(false);

  const { startingPoint, startingPointType } = useAppSelector(
    (state) => state.location
  );
  const dispatch = useAppDispatch();
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isTracking || !navigator.geolocation) {
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(
          locationAction.setStartingPoint({
            latitude,
            longitude,
            startingPointType: StartingPoint.CURRENT,
          })
        );
      },
      (error) => {
        console.log("Error tracking location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => {
      if (watchIdRef.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [isTracking, dispatch]);

  useEffect(() => {
    if (!startingPoint) {
      return;
    }

    onSetValue(
      "startingPoint",
      `${startingPoint.latitude}, ${startingPoint.longitude}`
    );
  }, [startingPoint, onSetValue]);

  useEffect(() => {
    if (!startingPoint) {
      return;
    }

    if (startingPointType === StartingPoint.SELECTED) {
      setIsTracking(false);
    }
  }, [startingPoint, startingPointType]);

  const handleToggleTracking = () => {
    if (isTracking) {
      setIsTracking(false);

      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }

      onSetValue("startingPoint", "");
      dispatch(locationAction.removeStartingPoint());
      return;
    }

    setIsTracking(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    alert("Please use the map to set the starting point.");
  };

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
          <TextField
            {...onRegister("startingPoint")}
            focused={Boolean(startingPoint)}
            required
            label="Starting point"
            fullWidth
            size="small"
            onKeyDown={handleKeyDown}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <span onClick={handleToggleTracking}>
                      {startingPointType === StartingPoint.CURRENT ? (
                        <MyLocation sx={{ fontSize: 20 }} />
                      ) : (
                        <LocationSearching sx={{ fontSize: 20 }} />
                      )}
                    </span>
                  </InputAdornment>
                ),
                readOnly: true,
              },
            }}
          />
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
