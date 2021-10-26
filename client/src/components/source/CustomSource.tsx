import { RContext } from "rlayers";
import { XYZ } from "ol/source";
import OLTileLayer from "ol/layer/Tile";

export interface Props {
  visible: boolean;
  zIndex: number;
}

const CustomSource = ({ visible = true, zIndex = 55 }: Props) => {
  return (
    <RContext.Consumer>
      {({ map }) => {
        if (!map) return;

        let source = new XYZ({
          url: `http://192.168.60.109:7000/styles/osm-bright/{z}/{x}/{y}.png`,
        });

        const tileLayer = new OLTileLayer({
          source,
          zIndex,
          visible,
        });

        map.addLayer(tileLayer);
        tileLayer.setZIndex(zIndex);

        return null;
      }}
    </RContext.Consumer>
  );
};

export default CustomSource;
