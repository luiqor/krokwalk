import React from "react";

import styles from "./marker.module.css";

interface MarkerProps {
  thumbnailLink: string;
  title: string;
  color?: string;
}

const Marker: React.FC<MarkerProps> = ({ thumbnailLink, title, color }) => (
  <div className={styles.marker} style={{ background: color }}>
    <img
      src={thumbnailLink}
      className={styles.thumbnail}
      alt={title}
      style={{ borderColor: color }}
    />
  </div>
);

export { Marker };
