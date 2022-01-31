import React from "react";
import { Coordinates } from "../../pages/MapView";

interface Props {
  pointerCoordinates: Coordinates | null;
}

const CoordinatesDisplay = ({ pointerCoordinates }: Props) => {
  return (
    <div>
      <span
        style={{
          width: "10px",
          display: "inline-block",
          marginRight: "30px",
        }}
      >
        {pointerCoordinates?.longitude}
      </span>
      <span>{" , "}</span>
      <span style={{ width: "10px", display: "inline-block" }}>
        {pointerCoordinates?.latitude}
      </span>
    </div>
  );
};

export default CoordinatesDisplay;
