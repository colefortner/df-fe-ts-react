import React, { useEffect, useRef } from "react";

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const Map: React.FC<MapProps> = (props) => {
  const mapRef = useRef<undefined | any>();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div id="map" ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default Map;
