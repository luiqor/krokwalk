import { Outlet } from "react-router-dom";
import { Footer, Header } from "./libs/components/components.js";

import styles from "./layout.module.css";

const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export { Layout };
