import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.css";

const Map = (props) => {
  const { center, zoom } = props;
  console.log(center);
  const mapRef = useRef();
  useEffect(() => {
    // mapboxgl.accessToken =APIKEY;
    mapboxgl.accessToken =
      "pk.eyJ1IjoianByYXRpazE1IiwiYSI6ImNrbHoyem50djJnMmMycW1wNjJkanh0YTIifQ.gGccuPvPWneomS_E1JoWUQ";
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
        center: center,
      zoom: zoom,
    });
    new mapboxgl.Marker({ position: center, map: map });
  }, [center, zoom]);
  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
