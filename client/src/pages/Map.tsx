import React, { useCallback } from "react";
import { fromLonLat, toLonLat } from "ol/proj";
import {
  RInteraction,
  RLayerVector,
  RMap,
  ROSM,
  RStyle,
  VectorSourceEvent,
} from "rlayers";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorSource } from "ol/source";
import { never } from "ol/events/condition";
import { makeStyles } from "@material-ui/core";
import VehicleFeature from "../components/vehicleFeature/VehicleFeature";
import "ol/ol.css";
import MapStatus from "../components/mapStatus/MapStatus";
import CoordinatesDisplay from "../components/coordinatesDisplay/CoordinatesDisplay";
import DrawInteraction from "../components/interaction/DrawInteraction";
import Geometry from "ol/geom/Geometry";
import LineString from "ol/geom/LineString";
import MarkerDialog from "../components/markerDialog/MarkerDialog";
import { saveToStorage } from "../utils/localStorage";
import { VehicleData } from "./index";
import { useSpeedLimits } from "../fetch/speedLimits";

const center = fromLonLat([37.05, 1.0]);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },
}));

export interface Item {
  name: string;
  plate?: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
  speed: number;
  imei?: string;
  altitude?: string;
  id: number;
}

export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface MapProps {
  locations: VehicleData[];
  addSpeedLimit: boolean;
  setAddSpeedLimit: any;
  sectionIdToDisplay?: number | null;
  speedLimits?: any;
}

export interface SpeedLimit {
  section: number[][];
  speedLimit?: number;
  sectionName?: string;
}

export interface Feature {
  id: number;
  properties: any;
  visible: boolean;
}

const MapView = ({
  locations,
  addSpeedLimit,
  setAddSpeedLimit,
  sectionIdToDisplay,
  speedLimits,
}: MapProps): JSX.Element => {
  const classes = useStyles();

  // const { data, isSuccess } = useSpeedLimits();

  // let speedLimits = [];
  // if (isSuccess) {
  //   speedLimits = data.features;
  //   console.log(speedLimits);
  // }

  const [selectedFeature, setSelectedFeature] = React.useState<Item | null>(
    null
  );
  const [pointerCoordinates, setPointerCoordinates] =
    React.useState<Coordinates | null>(null);
  const [sectionData, setSectionData] = React.useState<SpeedLimit | null>(null);
  const [openSpeedLimitDialog, setOpenSpeedLimitDialog] = React.useState(false);

  return (
    <div className={classes.root}>
      <RMap
        width={"100%"}
        height={"100vh"}
        initial={{ center: center, zoom: 7.5 }}
        noDefaultControls={true}
        onPointerMove={useCallback((e) => {
          const coords = e.map.getCoordinateFromPixel(e.pixel);
          const lonlat = toLonLat(coords);
          setPointerCoordinates({
            longitude: +Number(lonlat[0]).toFixed(3),
            latitude: +Number(lonlat[1]).toFixed(3),
          });
        }, [])}
      >
        <ROSM />
        {false && <DrawInteraction />}
        <RLayerVector>
          {locations &&
            locations.map((feature: VehicleData | null, ind: number) => (
              <VehicleFeature
                item={feature}
                key={feature ? feature.vehicle.imei : ind}
                selectedFeature={selectedFeature}
              />
            ))}
        </RLayerVector>

        <RLayerVector
          onAddFeature={(e: VectorSourceEvent<Geometry>) => {
            const geometry = e.feature?.getGeometry() as LineString;
            let coordinates = geometry
              .getCoordinates()
              .map((coord) => toLonLat(coord));
            console.log(coordinates);
            let obj = { section: coordinates, speedLimit: 0 };

            setSectionData(obj);
            setOpenSpeedLimitDialog(true);
          }}
        >
          {addSpeedLimit && <RInteraction.RDraw type="LineString" />}
          <RStyle.RStyle>
            <RStyle.RStroke color="#0000ff" width={3} />
            <RStyle.RFill color="rgba(0, 0, 0, 0.75)" />
          </RStyle.RStyle>
        </RLayerVector>

        {/** show speed limit section */}

        {speedLimits.map((geojson: any) => (
          <RLayerVector
            features={new GeoJSON({
              featureProjection: "EPSG:3857",
            }).readFeatures(geojson)}
            visible={geojson.id === sectionIdToDisplay}
          >
            <RStyle.RStyle>
              <RStyle.RStroke color="red" width={4} />
              <RStyle.RFill color="rgba(0, 0, 0, 0.75)" />
            </RStyle.RStyle>
          </RLayerVector>
        ))}
      </RMap>
      <MapStatus>
        {/** Update coordinate element */}
        {pointerCoordinates && (
          <CoordinatesDisplay pointerCoordinates={pointerCoordinates} />
        )}
      </MapStatus>
      <MarkerDialog
        open={openSpeedLimitDialog}
        handleClose={() => setOpenSpeedLimitDialog(false)}
        data={sectionData}
      />
    </div>
  );
};

export default MapView;
