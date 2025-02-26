import { ConstraintsForm, RouteForm } from "./libs/components/components.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { Screen } from "~/modules/location/location.js";

import styles from "./route-toolbar.module.css";

const RouteToolbar: React.FC = () => {
  const { selectionMode, screen } = useAppSelector((state) => state.location);

  const getScreen = (
    step: (typeof Screen)[keyof typeof Screen]
  ): React.ReactNode => {
    switch (step) {
      case Screen.FILTERING: {
        return <RouteForm />;
      }

      case Screen.CONSTRAINTS: {
        return <ConstraintsForm minHours={1} minMinutes={5} />;
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
