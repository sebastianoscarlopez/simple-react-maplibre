import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import useMap from "./hooks/useMap";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const { map } = useMap("map");
  useEffect(() => {
    if (map) {
      console.log("map", map);
      map.on("load", () => {
        console.log("load");
        map.addSource("cepal_source", {
          type: "vector",
          tiles: [
            "https://geoportal.cepal.org/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=geonode:limites_pdi&STYLE=&TILEMATRIX=EPSG:3857:{z}&TILEMATRIXSET=EPSG:3857&FORMAT=application/vnd.mapbox-vector-tile&TILECOL={x}&TILEROW={y}",
          ],
        });
        map.addLayer({
          id: "cepal_layer",
          source: "cepal_source",
          "source-layer": "limites_pdi",
          type: "line",
          paint: {
            "line-color": "#a00",
          },
        });

        map.addSource("mvp_source", {
          type: "vector",
          tiles: [
            "http://h-pro53a.syc.dom/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=geonode:GIS_Mejoras_MVP&STYLE=&TILEMATRIX=EPSG:3857:{z}&TILEMATRIXSET=EPSG:3857&FORMAT=application/vnd.mapbox-vector-tile&TILECOL={x}&TILEROW={y}",
          ],
        });
        map.addLayer({
          id: "mvp_layer",
          source: "mvp_source",
          "source-layer": "GIS_Mejoras_MVP",
          type: "line",
          paint: {
            "line-color": "#a00",
          },
        });

        map.addLayer({
          id: "mvp_3d_layer",
          source: "mvp_source",
          "source-layer": "GIS_Mejoras_MVP",
          type: "fill-extrusion",
          paint: {
            "fill-extrusion-color": "#aaa",
            "fill-extrusion-height": ["*", ["get", "PLANTAS"], 10],
            "fill-extrusion-opacity": 0.6,
          },
        });
      });
    }
  }, [map]);

  return (
    <div className="App">
      <div id="map" style={{ width: "100vw", height: "100vh" }}></div>

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
