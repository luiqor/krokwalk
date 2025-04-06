import type { IconName } from "./libs/types/types.js";
import { iconNameToSvg } from "./libs/maps/maps.js";

type Props = {
	name: IconName;
	color?: string;
	fontSize?: number;
};

const Icon: React.FC<Props> = ({ color, name, fontSize }) => {
	const Icon = iconNameToSvg[name];

	return <Icon style={{ fontSize, color }} />;
};

export { Icon, type IconName };
