import { forwardRef } from "react";

type IconElementType = {
	addClass?: string;
	name: string;
	widthSize: number;
	heightSize: number;
	color?: string;
};

const IconElement = forwardRef<SVGSVGElement, { svgData: IconElementType }>(
	({ svgData }, ref) => {
		return (
			<svg
				ref={ref}
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
