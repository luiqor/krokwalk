import { Outlet } from "react-router";
import { Footer, Header } from "./libs/components/components.js";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export { Layout };
