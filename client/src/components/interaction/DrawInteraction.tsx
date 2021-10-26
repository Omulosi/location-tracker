import React from "react";
import { RContext } from "rlayers";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Draw, Modify, Snap } from "ol/interaction";
import { fromLonLat } from "ol/proj";

const DrawInteraction = ({ type = "LineString" }) => {
  console.log(" Inside draw component");
  return (
    <div>
      <RContext.Consumer>
        {({ map }) => {
          if (!map) return null;

          let source = new VectorSource();
          let vector = new VectorLayer({
            source: source,
            zIndex: 99999, // set a high value
          });

          map.addLayer(vector);
          let modify = new Modify({ source: source });
          map.addInteraction(modify);

          let draw: Draw;
          let snap: Snap;

          draw = new Draw({
            source: source,
            type,
          });

          map.addInteraction(draw);
          snap = new Snap({ source: source });
          map.addInteraction(snap);

          draw.on("drawend", (evt) => {
            let feature = evt.feature;
            let coordinates;
            // let newFeature = null;

            // Re-enable popups
            setTimeout(() => {
              // map.removeInteraction(draw);
              // map.removeInteraction(snap);
              // Add feature
              coordinates = feature.getGeometry().getCoordinates();
              let coordinatesArray = coordinates;
              //newFeature = feature;

              if (type === "LineString") {
                coordinatesArray = coordinates.map((lonLat: any) =>
                  fromLonLat(lonLat)
                );
              }

              // Open dialog for adding extra details to the point marker
              // Dialog listener: src/views/ngeoMap/index.js
              //window.emitter.emit('addMarker', newFeature, coordinatesArray, type);
              console.log(coordinatesArray);
            }, 1000);
          });

          return null;
        }}
      </RContext.Consumer>
    </div>
  );
};

export default DrawInteraction;
