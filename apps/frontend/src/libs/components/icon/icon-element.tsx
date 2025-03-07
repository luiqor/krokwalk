type IconElementType = {
	addClass?: string;
	name: string;
	widthSize: string;
	heightSize: string;
	color?: string;
};

function IconElement({ svgData }: { svgData: IconElementType }) {
	return (
		<svg
			className={svgData.addClass ? svgData.addClass : ""}
			width={svgData.widthSize}
			height={svgData.heightSize}
			fill={svgData.color ? svgData.color : "black"}
		>
			<use xlinkHref={`#${svgData.name}`}></use>
		</svg>
	);
}

export default IconElement;
