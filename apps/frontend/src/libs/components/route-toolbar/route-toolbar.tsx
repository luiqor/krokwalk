import { ConstraintsForm, RouteForm } from "./libs/components/components.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import {
  Screen,
  actions as locationAction,
} from "~/modules/location/location.js";

import styles from "./route-toolbar.module.css";

const convertSecondsToHoursAndMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return { hours, minutes: remainingMinutes };
};

const RouteToolbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectionMode, screen } = useAppSelector((state) => state.location);
  const { minimumWalkSeconds, status } = useAppSelector((state) => state.trips);
  const getScreen = (
    screen: (typeof Screen)[keyof typeof Screen]
  ): React.ReactNode => {
    switch (screen) {
      case Screen.FILTERING: {
        return <RouteForm />;
      }

      case Screen.CONSTRAINTS: {
        if (status === "pending") {
          return <div>Loading...</div>;
        }

        if (status === "fulfilled" && minimumWalkSeconds !== null) {
          const { hours, minutes } =
            convertSecondsToHoursAndMinutes(minimumWalkSeconds);

          return <ConstraintsForm minHours={hours} minMinutes={minutes} />;
        }

        dispatch(locationAction.setScreen(Screen.FILTERING));
      }
    }
  };

  return (
    <div className={styles.toolbar}>
      {selectionMode && <div className={styles.mask} />}
      {getScreen(screen)}
    </div>
  );
};

export { RouteToolbar };
