import { makeStyles } from "@material-ui/core";
import React from "react";
import { webSocket } from "rxjs/webSocket";
import { share } from "rxjs";
import SideBar from "../components/sideBar/SideBar";
import MenuPanel from "../components/menuPanel/MenuPanel";
import MapView from "./Map";
// import SearchBar from "../components/searchBar/SearchBar";
import EditMapPanel from "../components/editMap/EditMapPanel";
import { useObservable } from "../hooks";
import { useSpeedLimits } from "../fetch/speedLimits";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    maxHeight: "100vh",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
  },
  sidebar: {
    width: "56px",
    height: "100%",
  },
  main: {
    height: "100%",
    width: "100%",
  },
}));

type Vehicle = {
  plate?: string;
  imei?: string;
};

type Driver = {
  rfid?: string;
  name?: string;
};

type Location = {
  speed: string;
  altitude: string;
  lat: string;
  lon: string;
};

export type VehicleData = {
  vehicle: Vehicle;
  location: Location;
  driver?: Driver;
};

const _socket = webSocket(`ws://127.0.0.1:8000/vehicles/`);
const vehicles = _socket.pipe(share());

const Main = () => {
  const classes = useStyles();
  const [openMenuPanel, setOpenMenuPanel] = React.useState(false);
  const [openSearchBar, setOpenSearchBar] = React.useState(false);
  const [openEditMapPanel, setOpenEditMapPanel] = React.useState(false);
  const [addSpeedLimit, setAddSpeedLimit] = React.useState(false);
  const [speedLimitSectionId, setSpeedLimitSectionId] = React.useState(null);
  let [vehicleData, setVehicleData] = React.useState<VehicleData[]>([]);

  const { data: speedLimitData, isSuccess } = useSpeedLimits();

  let speedLimits = [];
  if (isSuccess) {
    speedLimits = speedLimitData.features;
  }

  const toggleMenuPanel = () => {
    setOpenMenuPanel((openMenuPanel) => !openMenuPanel);
  };

  const toggleSearchBar = () => {
    setOpenSearchBar((openSearchBar) => !openSearchBar);
  };

  const toggleEditMapPanel = () => {
    setOpenEditMapPanel((openEditMapPanel) => !openEditMapPanel);
  };

  let data = useObservable<any>(vehicles);

  React.useEffect(() => {
    // check if vehicle already saved in state.
    let alreadyPresent = Boolean(
      vehicleData.filter((v) => v && v.vehicle.plate === data.vehicle.plate)
        .length
    );

    let updatedVehicleData: VehicleData[] = [];
    // If vehicle already in state, just update its location object
    if (alreadyPresent) {
      updatedVehicleData = vehicleData.map((v) => {
        if (v?.vehicle?.plate === data?.vehicle?.plate) {
          v.location = data.location;
        }
        return v;
      });
    } else {
      // Otherwise new vehicle, add it to the state.
      updatedVehicleData = data ? [...vehicleData, data] : vehicleData;
    }

    console.log(updatedVehicleData);

    setVehicleData([...updatedVehicleData]);
  }, [data]);

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <SideBar
          toggleMenuPanel={toggleMenuPanel}
          toggleSearchBar={toggleSearchBar}
          toggleEditMapPanel={toggleEditMapPanel}
        />
        <MenuPanel open={openMenuPanel} handleClose={toggleMenuPanel} />
        {/* <SearchBar open={openSearchBar} handleClose={toggleSearchBar} /> */}
        <EditMapPanel
          open={openEditMapPanel}
          handleClose={toggleEditMapPanel}
          setAddSpeedLimit={setAddSpeedLimit}
          setSpeedLimitSectionId={setSpeedLimitSectionId}
        />
      </div>
      <div className={classes.main}>
        <MapView
          locations={vehicleData}
          addSpeedLimit={addSpeedLimit}
          setAddSpeedLimit={setAddSpeedLimit}
          sectionIdToDisplay={speedLimitSectionId}
          speedLimits={speedLimits}
        />
      </div>
    </div>
  );
};

export default Main;
