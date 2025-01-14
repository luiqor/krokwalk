import { Link } from "react-router-dom";
import { AppRoute } from "../../../../../enums/enums.js";

import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <Link to={AppRoute.ROOT} className={styles.title}>
          KrokWalk
        </Link>
      </div>
    </header>
  );
};

export { Header };
