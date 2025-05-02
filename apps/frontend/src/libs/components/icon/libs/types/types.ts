type IconName =
	| "destinationPoint"
	| "startingPoint"
	| "tag"
	| "plus"
	| "place"
	| "untrackedMyLocation"
	| "trackedMyLocation"
	| "clock";

type IconElementType = {
	addClass?: string | string[];
	name: string;
	widthSize: number;
	heightSize: number;
	color?: string;
};

export { type IconName, IconElementType };
