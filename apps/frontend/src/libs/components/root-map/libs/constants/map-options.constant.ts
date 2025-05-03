import { MapOptions, LatLngBoundsExpression } from "leaflet";

const boundsKyiv: LatLngBoundsExpression = [
  [50.3, 30.3],
  [50.6, 30.7],
];

const mapOptions: MapOptions = {
	maxBounds: boundsKyiv,
	maxBoundsViscosity: 1.0,
	center: [50.45, 30.52],
};

export { mapOptions };
