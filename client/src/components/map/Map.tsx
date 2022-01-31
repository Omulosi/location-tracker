/* eslint-disable */
import React, { useCallback } from "react";
import { fromLonLat, toLonLat } from "ol/proj";
import {
  RInteraction,
  RLayerVector,
  RMap,
  ROSM,
  RStyle,
  VectorSourceEvent,
  RGeolocation,
  RFeature,
  RContext,
} from "rlayers";
import { Point, SimpleGeometry } from "ol/geom";
import GeoJSON from "ol/format/GeoJSON";
import { makeStyles } from "@material-ui/core";
import VehicleFeature from "../vehicleFeature/VehicleFeature";
import "ol/ol.css";
import MapStatus from "../mapStatus/MapStatus";
import CoordinatesDisplay from "../coordinatesDisplay/CoordinatesDisplay";
import Geometry from "ol/geom/Geometry";
import LineString from "ol/geom/LineString";
import MarkerDialog from "../markerDialog/MarkerDialog";
import { VehicleData } from "../../pages/Layout";

const center = fromLonLat([37.05, 1.0]);
let map: any;

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

const Map = ({
  locations,
  addSpeedLimit,
  setAddSpeedLimit,
  sectionIdToDisplay,
  speedLimits,
}: MapProps): JSX.Element => {
  const classes = useStyles();

  const [selectedFeature, setSelectedFeature] = React.useState<Item | null>(
    null
  );
  const [pointerCoordinates, setPointerCoordinates] =
    React.useState<Coordinates | null>(null);
  const [sectionData, setSectionData] = React.useState<SpeedLimit | null>(null);
  const [openSpeedLimitDialog, setOpenSpeedLimitDialog] = React.useState(false);
  const [pos, setPos] = React.useState(new Point(fromLonLat([0, 0])));
  const [accuracy, setAccuracy] = React.useState(
    undefined as Geometry | undefined
  );

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
        onRenderComplete={(e) => {
          map = e.target;
        }}
        onChange={(e) => {
          console.log("======= MAP CHANGED =========================");
        }}
      >
        <ROSM />

        {/** Display vehicle location on map */}
        <RLayerVector>
          {locations &&
            locations.map((feature: VehicleData | null, ind: number) => (
              <VehicleFeature
                item={feature}
                key={feature?.vehicle.imei || ind}
                selectedFeature={selectedFeature}
              />
            ))}
        </RLayerVector>

        {/** Adds speed limit geometry data */}
        <RLayerVector
          onAddFeature={(e: VectorSourceEvent<Geometry>) => {
            const geometry = e.feature?.getGeometry() as LineString;
            let coordinates = geometry
              .getCoordinates()
              .map((coord) => toLonLat(coord));
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
            key={geojson.id}
            onClick={(e) => {
              /* ts-lint:disable */
              e.map.getView().fit(e.target.getGeometry().getExtent(), {
                duration: 250,
                maxZoom: 15,
                padding: [50, 50, 50, 50],
              });
            }}
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

      {/** Dialog for adding speed limit */}
      <MarkerDialog
        open={openSpeedLimitDialog}
        handleClose={() => setOpenSpeedLimitDialog(false)}
        data={sectionData}
      />
    </div>
  );
};

export default Map;
