import { Outlet } from "react-router";
import { Footer, Header, SvgSprite } from "./libs/components/components.js";
import { AuthWarningModal } from "../components.js";

const Layout = () => {
	return (
		<>
			<AuthWarningModal />
			<Header />
			<Outlet />
			<Footer />
			<SvgSprite />
		</>
	);
};

export { Layout };
