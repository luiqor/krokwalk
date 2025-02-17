import { RouteForm } from "./libs/components/components.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import styles from "./route-toolbar.module.css";

const RouteToolbar: React.FC = () => {
  const { selectionMode } = useAppSelector((state) => state.location);

  return (
    <div className={styles.toolbar}>
      {selectionMode && <div className={styles.mask} />}
      <RouteForm />
    </div>
  );
};

export { RouteToolbar };
