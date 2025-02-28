import { CircularProgress } from "@mui/material";

import { ConstraintsForm, RouteForm } from "./libs/components/components.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import {
  Screen,
  actions as locationAction,
} from "~/modules/location/location.js";

import styles from "./route-toolbar.module.css";

const RouteToolbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectionMode, screen } = useAppSelector((state) => state.location);
  const { status } = useAppSelector((state) => state.trips);
  const getScreen = (
    screen: (typeof Screen)[keyof typeof Screen]
  ): React.ReactNode => {
    switch (screen) {
      case Screen.FILTERING: {
        return <RouteForm />;
      }

      case Screen.CONSTRAINTS: {
        if (status === "pending") {
          return <CircularProgress />;
        }

        if (status === "fulfilled") {
          return <ConstraintsForm />;
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
