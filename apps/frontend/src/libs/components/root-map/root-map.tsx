import { ReactNode, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { VisitStatus } from "shared";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { mapOptions, tileLayers } from "./libs/constants/constants.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { Marker } from "./libs/components/marker.js";
import {
	actions as locationAction,
	SelectionMode,
	StartingPoint,
} from "~/modules/location/location.js";
import { Icon } from "../components.js";

import styles from "./root-map.module.css";
import type { GeoPoint } from "~/libs/types/types.js";
import { themeOptions } from "~/libs/constants/theme-options.constant.js";

const ZOOM_DEFAULT = 16;

const IconTitle = {
	PLACE: "place",
	START_END: "start-end",
	WAYPOINT: "waypoint",
	START_END_WAYPOINT: "start-end-waypoint",
	CURRENT_POSITION: "current-position",
} as const;

const RootMap = () => {
	const { places, status } = useAppSelector((state) => state.places);
	const { startingPoint, destinationPoint, selectionMode } = useAppSelector(
		(state) => state.location
	);
	const {
		stopoverPoints,
		startingPoint: tripStart,
		destinationPoint: tripEnd,
	} = useAppSelector((state) => state.trips);
	const mapRef = useRef<HTMLDivElement | null>(null);
	const mapInstanceRef = useRef<L.Map | null>(null);
	const userMarkerRef = useRef<L.Marker | null>(null);
	const routingControlsRef = useRef<L.Routing.Control[]>([]);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!mapRef.current) {
			return;
		}
		const map = L.map(mapRef.current, {
			...mapOptions,
			zoom: ZOOM_DEFAULT,
		});

		tileLayers.Default.addTo(map);

		L.control.layers(tileLayers).addTo(map);

		mapInstanceRef.current = map;

		return () => {
			map.remove();
		};
	}, []);

	const updateUserLocation = () => {
		if (!mapInstanceRef.current) {
			return;
		}

		mapInstanceRef.current.locate({ setView: true, maxZoom: ZOOM_DEFAULT });
	};

	useEffect(() => {
		if (!mapInstanceRef.current) {
			return;
		}

		const handleLocationFound = (e: L.LocationEvent) => {
			if (userMarkerRef.current) {
				mapInstanceRef.current?.removeLayer(userMarkerRef.current);
				userMarkerRef.current = null;
			}

			mapInstanceRef.current?.eachLayer((layer) => {
				if (layer instanceof L.Circle) {
					mapInstanceRef.current?.removeLayer(layer);
				}
			});

			const userMarker = L.marker(e.latlng, {
				icon: L.divIcon({
					html: ReactDOMServer.renderToString(
						<Icon
							name="trackedMyLocation"
							color="#236ac7"
							fontSize={30}
						/>
					),
					iconAnchor: [15, 15],
					className: styles.marker,
				}),
			}).addTo(mapInstanceRef.current as L.Map);

			const circle = L.circle(e.latlng, {
				radius: 0,
				color: "none",
				fillColor: "#236ac7",
			}).addTo(mapInstanceRef.current as L.Map);

			let currentRadius = 0;
			const maxRadius = 50;
			const animationDuration = 1000;
			const stepTime = 20;

			const animateCircle = () => {
				currentRadius += maxRadius / (animationDuration / stepTime);
				if (currentRadius <= maxRadius) {
					circle.setRadius(currentRadius);
					circle.setStyle({
						fillOpacity: 0.8 * (1 - currentRadius / maxRadius),
					});
					setTimeout(animateCircle, stepTime);
				} else {
					mapInstanceRef.current?.removeLayer(circle);
				}
			};

			animateCircle();

			userMarkerRef.current = userMarker;
		};

		mapInstanceRef.current.on("locationfound", handleLocationFound);

		mapInstanceRef.current.on("locationerror", (e: L.ErrorEvent) => {
			console.error("Location error:", e.message);
		});

		updateUserLocation();

		return () => {
			if (userMarkerRef.current) {
				mapInstanceRef.current?.removeLayer(userMarkerRef.current);
				userMarkerRef.current = null;
			}

			mapInstanceRef.current?.off("locationfound", handleLocationFound);
			mapInstanceRef.current?.off("locationerror");
		};
	}, []);

	useEffect(() => {
		if (!mapInstanceRef.current) {
			return;
		}

		const handleMapClick = (e: L.LeafletMouseEvent) => {
			const { lat: selectedLatitude, lng: selectedLongitude } = e.latlng;

			if (selectionMode === SelectionMode.STARTING_POINT) {
				dispatch(
					locationAction.setStartingPoint({
						latitude: selectedLatitude,
						longitude: selectedLongitude,
						startingPointType: StartingPoint.SELECTED,
					})
				);
			}

			if (selectionMode === SelectionMode.DESTINATION_POINT) {
				dispatch(
					locationAction.setDestinationPoint({
						latitude: selectedLatitude,
						longitude: selectedLongitude,
					})
				);
			}

			dispatch(locationAction.setSelectionMode(null));
		};

		if (selectionMode !== null) {
			mapInstanceRef.current.on("click", handleMapClick);
		}

		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.off("click", handleMapClick);
			}
		};
	}, [dispatch, selectionMode]);

	const addMarker = (
		point: GeoPoint,
		icon: ReactNode,
		title = IconTitle.START_END
	) => {
		const { latitude, longitude } = point;

		const marker = L.marker([latitude, longitude], {
			icon: L.divIcon({
				html: ReactDOMServer.renderToString(icon),
				className: styles.marker,
				iconAnchor: [20, 40],
			}),
			title,
			alt: `${latitude}, ${longitude}`,
		});

		marker.addTo(mapInstanceRef.current!);

		return marker;
	};

	useEffect(() => {
		if (!mapInstanceRef.current || !startingPoint) {
			return;
		}

		const marker = addMarker(
			startingPoint,
			<Icon
				name="startingPoint"
				fontSize={50}
			/>
		);

		return () => {
			if (marker) {
				mapInstanceRef.current!.removeLayer(marker);
			}
		};
	}, [startingPoint, dispatch]);

	useEffect(() => {
		if (!mapInstanceRef.current || !destinationPoint) {
			return;
		}

		const marker = addMarker(
			destinationPoint,
			<Icon
				name="destinationPoint"
				fontSize={50}
			/>
		);

		return () => {
			if (marker) {
				mapInstanceRef.current!.removeLayer(marker);
			}
		};
	}, [destinationPoint]);

	const createCustomMarker = ({
		lat,
		lng,
		title,
		thumbnailLink,
		color,
	}: {
		lat: number;
		lng: number;
		title: string;
		thumbnailLink: string;
		color?: string;
	}): L.Marker => {
		const customIcon = L.divIcon({
			html: ReactDOMServer.renderToString(
				<Marker
					thumbnailLink={thumbnailLink}
					title={title}
					color={color}
				/>
			),
			className: styles.marker,
			iconAnchor: [20, 40],
		});

		return L.marker([lat, lng], {
			icon: customIcon,
			title: IconTitle.PLACE,
			alt: title,
		});
	};

	useEffect(() => {
		if (!mapInstanceRef.current || status !== DataStatus.FULFILLED) {
			return;
		}

		mapInstanceRef.current.eachLayer((layer) => {
			if (
				layer instanceof L.Marker &&
				layer.options.title === IconTitle.PLACE
			) {
				layer.remove();
			}
		});

		places.forEach((place) => {
			const { lat, lng, thumbnailLink, title, id } = place;

			const marker = createCustomMarker({
				lat,
				lng,
				title,
				thumbnailLink,
			});

			marker.addTo(mapInstanceRef.current!);

			marker.on("click", () => {
				navigate(AppRoute.PLACE_$ID.replace(":id", id));
			});
		});
	}, [places, status, navigate]);

	useEffect(() => {
		if (!mapInstanceRef.current || !stopoverPoints) {
			return;
		}

		const allPoints = [
			{
				lat: tripStart[0],
				lng: tripStart[1],
				visitStatus: VisitStatus.CONFIRMED,
			},
			...stopoverPoints,
			{ lat: tripEnd[0], lng: tripEnd[1], visitStatus: VisitStatus.CONFIRMED },
		];

		const getLineStyle = (
			status1: "confirmed" | "marked",
			status2: "confirmed" | "marked"
		) => {
			const isBothMarkedOrConfirmed =
				[VisitStatus.MARKED, VisitStatus.CONFIRMED].includes(status1) &&
				[VisitStatus.MARKED, VisitStatus.CONFIRMED].includes(status2);

			if (isBothMarkedOrConfirmed) {
				return { color: "grey", weight: 3, dashArray: "6, 6" }; // dotted grey line
			}
			return { color: themeOptions.palette.primary.main, weight: 3 }; // default style
		};

		const drawSegment = (
			from: (typeof allPoints)[0],
			to: (typeof allPoints)[0]
		) => {
			const routingControl = L.Routing.control({
				router: L.Routing.osrmv1({
					serviceUrl: import.meta.env.VITE_ROUTING_SERVICE_URL,
				}),
				waypoints: [L.latLng(from.lat!, from.lng!), L.latLng(to.lat!, to.lng!)],
				routeWhileDragging: false,
				addWaypoints: false,
				createMarker: () => null,
				show: true,
				lineOptions: {
					styles: [getLineStyle(from.visitStatus, to.visitStatus)],
				},
			} as unknown as L.Routing.RoutingControlOptions).addTo(
				mapInstanceRef.current!
			);

			routingControl.addTo(mapInstanceRef.current!);
			routingControlsRef.current.push(routingControl);
		};

		for (let i = 0; i < allPoints.length - 1; i++) {
			drawSegment(allPoints[i], allPoints[i + 1]);
		}

		mapInstanceRef.current.eachLayer((layer) => {
			for (const point of stopoverPoints) {
				if (
					layer instanceof L.Marker &&
					layer.options.title === IconTitle.PLACE &&
					layer.options.alt === point.title
				) {
					layer.remove();
				}
			}
		});

		for (const point of stopoverPoints) {
			const marker = createCustomMarker({
				lat: point.lat,
				lng: point.lng,
				title: point.title,
				thumbnailLink: point.thumbnailLink,
				color: "#236ac7",
			});

			marker.addTo(mapInstanceRef.current!);

			marker.on("click", () => {
				navigate(AppRoute.PLACE_$ID.replace(":id", point.id));
			});
		}

		mapInstanceRef.current.eachLayer((layer) => {
			if (
				layer instanceof L.Marker &&
				layer.options.title === IconTitle.START_END
			) {
				layer.options.title = IconTitle.START_END_WAYPOINT;
			}
		});

		return () => {
			if (!mapInstanceRef.current) return;

			routingControlsRef.current.forEach((control) => control.remove());
			routingControlsRef.current = [];

			mapInstanceRef.current.eachLayer((layer) => {
				if (
					layer instanceof L.Marker &&
					layer.options.title === IconTitle.WAYPOINT
				) {
					layer.remove();
				}
				if (layer instanceof L.Routing.Control) {
					mapInstanceRef.current?.removeLayer(layer);
				}
			});
		};
	}, [stopoverPoints, tripStart, tripEnd, navigate]);

	return (
		<>
			<button
				onClick={updateUserLocation}
				className={styles.locateButton}
			>
				Update Location
			</button>
			<div className={styles.container}>
				<div
					ref={mapRef}
					className={styles.map}
				/>
			</div>
		</>
	);
};

export { RootMap };
