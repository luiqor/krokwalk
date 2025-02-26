import React, { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Icon } from "~/libs/components/components.js";

import styles from "./time-duration-picker.module.css";

type Duration = {
  hours: number;
  minutes: number;
};

type Props = {
  minHours?: number;
  minMinutes?: number;
  initialDuration: Duration;
  onChange?: (duration: Duration) => void;
  maxHours?: number;
};

const TimeDurationPicker: React.FC<Props> = ({
  initialDuration,
  minHours = 0,
  minMinutes = 0,
  maxHours = 8,
  onChange,
}) => {
  const validateMinimumDuration = (
    duration: Duration,
    minHours: number,
    minMinutes: number
  ): Duration => {
    const { hours, minutes } = duration;

    const roundToNearestFive = (minutes: number) => {
      return Math.ceil(minutes / 5) * 5;
    };

    if (hours > minHours) {
      return {
        hours,
        minutes: roundToNearestFive(minutes),
      };
    }

    if (hours === minHours) {
      return {
        hours,
        minutes: Math.max(roundToNearestFive(minutes), minMinutes),
      };
    }

    return {
      hours: minHours,
      minutes: roundToNearestFive(minMinutes),
    };
  };

  const validatedInitialDuration = validateMinimumDuration(
    initialDuration,
    minHours,
    minMinutes
  );
  const [duration, setDuration] = useState<Duration>(validatedInitialDuration);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (initialDuration) {
      setDuration(
        validateMinimumDuration(initialDuration, minHours, minMinutes)
      );
    }
  }, [initialDuration, minHours, minMinutes]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDurationChange = (newDuration: Duration) => {
    const constrainedDuration = validateMinimumDuration(
      newDuration,
      minHours,
      minMinutes
    );
    setDuration(constrainedDuration);

    if (onChange) {
      onChange(constrainedDuration);
    }
  };

  const handleHoursChange = (hours: number) => {
    if (hours === minHours && duration.minutes < minMinutes) {
      handleDurationChange({ hours, minutes: minMinutes });
    } else {
      handleDurationChange({ ...duration, hours });
    }
  };

  const handleMinutesChange = (minutes: number) => {
    handleDurationChange({ ...duration, minutes });
  };

  const formatDuration = (duration: Duration): string => {
    const { hours, minutes } = duration;

    if (hours === 0) {
      return `${minutes}m`;
    }

    if (minutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${minutes}m`;
  };

  const getAvailableHours = () => {
    const hours = [];
    for (let i = minHours; i <= maxHours; i++) {
      hours.push(i);
    }
    return hours;
  };

  const getAvailableMinutes = () => {
    const minutes = [];
    const minuteStep = 5;

    const minuteMin = duration.hours === minHours ? minMinutes : 0;

    for (let i = 0; i <= 55; i += minuteStep) {
      if (i >= minuteMin) {
        minutes.push(i);
      }
    }

    return minutes;
  };

  return (
    <div className={styles.durationPicker}>
      <TextField
        fullWidth
        value={formatDuration(duration)}
        placeholder="0h 0m"
        onClick={handleClick}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClick} edge="end">
                  <Icon name="clock" />
                </IconButton>
              </InputAdornment>
            ),
            readOnly: true,
          },
        }}
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <div className={styles.menuContent}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1, mr: 1 }}>
              <div className={styles.columnHeader}>Hours</div>
              <div className={styles.timeColumn}>
                {getAvailableHours().map((hour) => (
                  <MenuItem
                    key={`hour-${hour}`}
                    selected={hour === duration.hours}
                    onClick={() => handleHoursChange(hour)}
                  >
                    {hour}
                  </MenuItem>
                ))}
              </div>
            </Box>

            <Box sx={{ flex: 1, ml: 1 }}>
              <div className={styles.columnHeader}>Minutes</div>
              <div className={styles.timeColumn}>
                {getAvailableMinutes().map((minute) => (
                  <MenuItem
                    key={`minute-${minute}`}
                    selected={minute === duration.minutes}
                    onClick={() => handleMinutesChange(minute)}
                  >
                    {minute}
                  </MenuItem>
                ))}
              </div>
            </Box>
          </Box>
        </div>
      </Menu>
    </div>
  );
};

export { TimeDurationPicker };
