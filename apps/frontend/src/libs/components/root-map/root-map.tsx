import { ReactNode, useEffect, useRef } from "react";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";

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

import { useNavigate } from "react-router-dom";

const ZOOM_DEFAULT = 16;

const RootMap = () => {
  const { places, status } = useAppSelector((state) => state.places);
  const { startingPoint, destinationPoint, selectionMode } = useAppSelector(
    (state) => state.location
  );
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    const map = L.map(mapRef.current, {
      ...mapOptions,
      zoom: ZOOM_DEFAULT,
      center: [50.4501, 30.5234], // TODO: get from user location
    });

    tileLayers.Default.addTo(map);

    L.control.layers(tileLayers).addTo(map);

    mapInstanceRef.current = map; // TODO: handleReset of zoom mapInstanceRef.current.setView( [...current], ZOOM_DEFAULT);

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      return;
    }

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const { lat: selectedLatitude, lng: selectedLongitude } = e.latlng;

      if (selectionMode === SelectionMode.STARTING_POINT) {
        console.log("Starting point selected");
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

  const addMarker = (point: GeoPoint, icon: ReactNode) => {
    const { latitude, longitude } = point;

    const marker = L.marker([latitude, longitude], {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(icon),
        className: styles.marker,
        iconAnchor: [20, 40],
      }),
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
      <Icon name="startingPoint" fontSize={50} />
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
      <Icon name="destinationPoint" fontSize={50} />
    );

    return () => {
      if (marker) {
        mapInstanceRef.current!.removeLayer(marker);
      }
    };
  }, [destinationPoint]);

  useEffect(() => {
    if (!mapInstanceRef.current || status !== DataStatus.FULFILLED) {
      return;
    }

    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });

    places.forEach((place) => {
      const { lat, lng, thumbnailLink, title, id } = place;

      const customIcon = L.divIcon({
        html: ReactDOMServer.renderToString(
          <Marker thumbnailLink={thumbnailLink} title={title} />
        ),
        className: styles.marker,
        iconAnchor: [20, 40],
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      marker.addTo(mapInstanceRef.current!);

      marker.on("click", () => {
        navigate(`${AppRoute.INFORMATION}?id=${id}`)
      });
    });
  }, [places, status]);

  return (
    <div className={styles.container}>
      <div ref={mapRef} className={styles.map} />
    </div>
  );
};

export { RootMap };
