import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";

import { mapOptions, tileLayers } from "./libs/constants/constants.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { Marker } from "./libs/components/marker.js";

import styles from "./root-map.module.css";

const ZOOM_DEFAULT = 16;

const RootMap = () => {
  const { places, status } = useAppSelector((state) => state.places);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [startingPointMarker, setStartingPointMarker] =
    useState<L.Marker | null>(null);

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

    mapInstanceRef.current.on("click", (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      const marker = L.marker([lat, lng]);
      marker.addTo(mapInstanceRef.current!);

      setStartingPointMarker((prev) => {
        if (prev) {
          mapInstanceRef.current!.removeLayer(prev);
        }
        return marker;
      });
    });
  }, [startingPointMarker]);

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
      const { lat, lng, thumbnailLink, title } = place;

      const customIcon = L.divIcon({
        html: ReactDOMServer.renderToString(
          <Marker thumbnailLink={thumbnailLink} title={title} />
        ),
        className: styles.marker,
        iconAnchor: [20, 40],
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      marker.addTo(mapInstanceRef.current!);
    });
  }, [places, status]);

  return (
    <div className={styles.container}>
      <div ref={mapRef} className={styles.map} />
    </div>
  );
};

export { RootMap };
