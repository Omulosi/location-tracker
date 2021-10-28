import React from "react";
import { fromLonLat } from "ol/proj";
import { RFeature, ROverlay, RStyle, RPopup } from "rlayers";
import Point from "ol/geom/Point";
import SpeedPopup from "../speedPopup/SpeedPopup";
import vehicleIcon from "../../assets/driver.png";

import { Item } from "../../pages/Map";
import VehicleInfoPopup from "../vehicleInfoPopup/VehicleInfoPopup";
import { getItemsFromStorage } from "../../utils/localStorage";
import { getSpeedLimit } from "../../utils/polyline";
import { VehicleData } from "../../pages";
import { useSpeedLimits } from "../../fetch/speedLimits";

interface Props {
  item: VehicleData | null;
  selectedFeature: Item | null;
}

let speedViolationPath: Point[] = [];

const VehicleFeature = ({ item, selectedFeature }: Props) => {
  const [showPopup, setShowPopup] = React.useState(true);

  const { data, isSuccess } = useSpeedLimits();

  const location = new Point(
    fromLonLat([
      item ? +item.location.lon : 37.0,
      item ? +item.location.lat : 0,
    ])
  );

  let roadSections = [];
  if (isSuccess) {
    roadSections = data.features.map(
      (ft: {
        properties: { speed_limit: any; section_name: any };
        geometry: { coordinates: any };
      }) => ({
        speedLimit: ft.properties.speed_limit,
        sectionName: ft.properties.section_name,
        section: ft.geometry.coordinates.map((c: number[]) => fromLonLat(c)),
      })
    );
    roadSections = roadSections.reverse();
  }

  let locationCoordinates = location.getCoordinates();

  const speedLimit = getSpeedLimit(locationCoordinates, roadSections);

  const closePopup = () => {
    setShowPopup(false);
  };

  // if (item && speedLimit && Number(item?.location.speed) >= speedLimit) {
  //   speedViolationPath.push(location);
  //   console.log(speedViolationPath);
  // }

  return (
    <div>
      <RFeature
        geometry={location}
        onClick={(e) => {
          e.map.getView().fit(e.target.getGeometry().getExtent(), {
            duration: 250,
            maxZoom: 15,
          });
        }}
      >
        <RStyle.RStyle>
          <RStyle.RIcon src={vehicleIcon} anchor={[0.5, 0.8]} scale={0.4} />
        </RStyle.RStyle>
        {/*  Overlay with info*/}
        <ROverlay>
          {speedLimit &&
            showPopup &&
            item &&
            Number(item.location.speed) >= speedLimit && (
              <SpeedPopup
                item={item}
                speedLimit={speedLimit}
                handleClosePopup={closePopup}
              >
                <em>&#11017; click to zoom</em>
              </SpeedPopup>
            )}
        </ROverlay>
        <RPopup trigger={"hover"}>
          <VehicleInfoPopup item={item} />
        </RPopup>
      </RFeature>
    </div>
  );
};

export default VehicleFeature;
