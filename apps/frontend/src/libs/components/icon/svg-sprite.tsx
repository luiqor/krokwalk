const SvgSprite = () => {
	return (
		<svg
			style={{ position: "absolute", width: "0", height: "0" }}
			xmlns="http://www.w3.org/2000/svg"
		>
			<symbol
				id="arrow"
				viewBox="0 0 8 14"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M7.15694 7.71114L1.49994 13.3681L0.0859375 11.9541L5.03594 7.00414L0.0859375 2.05414L1.49994 0.640137L7.15694 6.29714C7.34441 6.48466 7.44972 6.73897 7.44972 7.00414C7.44972 7.2693 7.34441 7.52361 7.15694 7.71114Z"
				/>
			</symbol>
			<symbol
				id="cross"
				viewBox="0 0 16 16"
			>
				<path d="M14.3597 15.7802L7.99973 9.41022L1.63973 15.7802L0.219727 14.3602L6.58973 8.00022L0.219727 1.64021L1.63973 0.220215L7.99973 6.59022L14.3597 0.230215L15.7697 1.64021L9.40973 8.00022L15.7697 14.3602L14.3597 15.7802Z" />
			</symbol>
		</svg>
	);
};

export { SvgSprite };
