import { Outlet } from "react-router";
import { Footer, Header, SvgSprite } from "./libs/components/components.js";

const Layout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
			<SvgSprite />
		</>
	);
};

export { Layout };
