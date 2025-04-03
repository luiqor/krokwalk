import { forwardRef } from "react";

import type { IconElementType } from "./libs/types/types.js";

const IconElement = forwardRef<SVGSVGElement, { svgData: IconElementType }>(
	({ svgData }, ref) => {
		return (
			<svg
				ref={ref || undefined}
				className={svgData.addClass ? svgData.addClass : ""}
				width={svgData.widthSize}
				height={svgData.heightSize}
				fill={svgData.color ? svgData.color : "black"}
			>
				<use xlinkHref={`#${svgData.name}`}></use>
			</svg>
		);
	}
);

export { IconElement };
