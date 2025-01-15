import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { mapOptions, tileLayers } from "./libs/constants/constants.js";

import styles from "./root-map.module.css";

const ZOOM_DEFAULT = 16;

const RootMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
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
    }
  }, []);

  return (
    <div className={styles.container}>
      <div ref={mapRef} className={styles.map} />
    </div>
  );
};

export { RootMap };
