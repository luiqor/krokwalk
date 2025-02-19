import { useEffect, useRef, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { InputAdornment, TextField } from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { timelineItemClasses } from "@mui/lab/TimelineItem";

import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import {
  actions as locationAction,
  SelectionMode,
  StartingPoint,
} from "~/modules/location/location.js";
import { notification } from "~/modules/notification/notification.js";
import { Icon } from "~/libs/components/components.js";

import styles from "./location-selection.module.css";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { TripDetailsProps } from "../route-toolbar/libs/types/types.js";

type Props = {
  onSetValue: UseFormSetValue<TripDetailsProps>;
  onRegister: UseFormRegister<TripDetailsProps>;
};

const LocationSelection: React.FC<Props> = ({ onSetValue, onRegister }) => {
  const [isTracking, setIsTracking] = useState<boolean>(false);

  const { startingPoint, startingPointType, destinationPoint, selectionMode } =
    useAppSelector((state) => state.location);
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
        notification.error(error.message);
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
    if (!destinationPoint) {
      return;
    }

    onSetValue(
      "destinationPoint",
      `${destinationPoint.latitude}, ${destinationPoint.longitude}`
    );
  }, [destinationPoint, onSetValue]);

  useEffect(() => {
    if (!startingPoint) {
      return;
    }

    if (startingPointType === StartingPoint.SELECTED) {
      setIsTracking(false);
    }
  }, [startingPoint, startingPointType]);

  const handleToggleTracking = (event: React.SyntheticEvent) => {
    event.stopPropagation();

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

  const handleStartingPointSelect = () => {
    dispatch(locationAction.setSelectionMode(SelectionMode.STARTING_POINT));
  };

  const handleDestinationPointSelect = () => {
    dispatch(locationAction.setSelectionMode(SelectionMode.DESTINATION_POINT));
  };

  const handleKeyDown = (event: React.SyntheticEvent) => {
    event.preventDefault();
    notification.info("Please select a location on the map");
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
              <Icon name="untrackedMyLocation" fontSize={16} />
            </div>
          </TimelineDot>
          <TimelineConnector className={styles.dottedLine} />
        </TimelineSeparator>
        <TimelineContent sx={{ paddingRight: 0 }}>
          <TextField
            className={getValidClassNames(
              styles.textField,
              selectionMode === SelectionMode.STARTING_POINT &&
                styles.selectedTextField
            )}
            {...onRegister("startingPoint")}
            focused={selectionMode === SelectionMode.STARTING_POINT}
            required
            autoComplete="off"
            label="Starting point"
            fullWidth
            size="small"
            onClick={handleStartingPointSelect}
            onKeyDown={handleKeyDown}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <span onClick={handleToggleTracking}>
                      {startingPointType === StartingPoint.CURRENT ? (
                        <Icon name="trackedMyLocation" fontSize={20} />
                      ) : (
                        <Icon name="untrackedMyLocation" fontSize={20} />
                      )}
                    </span>
                  </InputAdornment>
                ),
              },
              inputLabel: {
                shrink: Boolean(startingPoint),
              },
            }}
          />
        </TimelineContent>
      </TimelineItem>
      <TimelineItem sx={{ minHeight: 0 }}>
        <TimelineSeparator>
          <TimelineDot color="inherit">
            <div className={styles.iconWrapper}>
              <Icon name="place" />
            </div>
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent sx={{ paddingRight: 0 }}>
          <TextField
            className={getValidClassNames(
              styles.textField,
              selectionMode === SelectionMode.DESTINATION_POINT &&
                styles.selectedTextField
            )}
            {...onRegister("destinationPoint")}
            focused={selectionMode === SelectionMode.DESTINATION_POINT}
            required
            autoComplete="off"
            label="Destination"
            fullWidth
            size="small"
            onClick={handleDestinationPointSelect}
            onKeyDown={handleKeyDown}
            slotProps={{
              inputLabel: {
                shrink: Boolean(destinationPoint),
              },
            }}
          />
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export { LocationSelection };
