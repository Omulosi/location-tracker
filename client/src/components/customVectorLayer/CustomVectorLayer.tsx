import React from "react";
import { RContext } from "rlayers";
import { Vector as VectorLayer } from "ol/layer";
import { Stroke, Style } from "ol/style";

interface Props {
  source?: any;
  style?: Style;
  zIndex?: number;
}

const customStyle = new Style({
  stroke: new Stroke({
    color: "rgb(250, 49, 16, 0.4)",
    width: 4,
    lineJoin: "round",
    lineCap: "butt",
  }),
});

const CustomVectorLayer = ({ source, style, zIndex = 10 }: Props) => {
  console.log(" Inside custom vector layer");
  return (
    <div>
      <RContext.Consumer>
        {({ map }) => {
          if (!map) return null;

          let vector = new VectorLayer({
            source,
            zIndex, // set a high value
          });

          vector.setStyle(customStyle);

          map.addLayer(vector);

          console.log({ map });

          return null;
        }}
      </RContext.Consumer>
    </div>
  );
};

export default CustomVectorLayer;
