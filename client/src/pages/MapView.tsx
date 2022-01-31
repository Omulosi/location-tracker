/* eslint-disable */
import React, { useCallback } from "react";
import { fromLonLat } from "ol/proj";
import { makeStyles } from "@material-ui/core";
import { VehicleData } from "./Layout";
import Map from "../components/map/Map";
import { useSpeedLimits } from "../fetch/speedLimits";
import { connect, messages } from "../services/VehicleService";

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

export interface MapViewProps {
  addSpeedLimit: any;
  speedLimitSectionId: any;
  setAddSpeedLimit: any;
}

const MapView = ({
  addSpeedLimit,
  speedLimitSectionId,
  setAddSpeedLimit,
}: MapViewProps): JSX.Element => {
  const classes = useStyles();
  let [vehicleData, setVehicleData] = React.useState<VehicleData[]>([]);

  const { data: speedLimitData, isSuccess } = useSpeedLimits();

  let speedLimits = [];
  if (isSuccess) {
    speedLimits = speedLimitData.features;
  }

  const onFocus = () => {
    connect();
  };

  React.useEffect(() => {
    onFocus();
    window.addEventListener("focus", onFocus);

    return () => window.removeEventListener("focus", onFocus);
  }, []);

  React.useEffect(() => {
    connect();
    const subscription = messages.subscribe((message: any) => {
      console.log(" processing loaded vehicles ======", message);
      setVehicleData((prevVehicleData) => [
        ...prevVehicleData.filter(
          (data) => data.vehicle.imei !== message.vehicle.imei
        ),
        message,
      ]);
    });
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [setVehicleData]);

  return (
    <div>
      <Map
        locations={vehicleData}
        addSpeedLimit={addSpeedLimit}
        sectionIdToDisplay={speedLimitSectionId}
        setAddSpeedLimit={setAddSpeedLimit}
        speedLimits={speedLimits}
      />
    </div>
  );
};

export default MapView;
