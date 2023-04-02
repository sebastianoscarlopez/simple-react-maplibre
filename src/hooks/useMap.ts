import { useEffect, useState } from "react";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const useMap = (idMapContainer: string) => {
  const [map, setMap] = useState<Map>();

  const initMap = () => {
    const map = new maplibregl.Map({
      container: idMapContainer,
      style: {
        version: 8,
        sources: {
          "baseCepal": {
            type: "raster",
            scheme: "tms",
            tiles: [
              "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG:3857@png/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
          }
        },
        layers: [
          {
            id: "baseCepal",
            type: "raster",
            source: "baseCepal",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      hash: true,
      center: [-66.336888, -33.301862],
      zoom: 16,
    });
    setMap(map);
  };

  useEffect(() => {
    if (!map && document.getElementById(idMapContainer)) {
      initMap();
    }
  }, [map]);

  return { map };
};

export default useMap;
