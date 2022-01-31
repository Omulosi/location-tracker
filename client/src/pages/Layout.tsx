import { makeStyles } from "@material-ui/core";
import React from "react";
import SideBar from "../components/sideBar/SideBar";
import MenuPanel from "../components/menuPanel/MenuPanel";
import EditMapPanel from "../components/editMap/EditMapPanel";
import { useSpeedLimits } from "../fetch/speedLimits";
import { connect, messages } from "../services/VehicleService";
import { Outlet, useNavigate } from "react-router-dom";
//

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

const Layout = ({
  setAddSpeedLimit,
  setSpeedLimitSectionId,
  speedLimitSectionId,
}: {
  setAddSpeedLimit: any;
  setSpeedLimitSectionId: any;
  speedLimitSectionId: any;
}) => {
  const classes = useStyles();
  const [openMenuPanel, setOpenMenuPanel] = React.useState(false);
  const [openEditMapPanel, setOpenEditMapPanel] = React.useState(false);

  const navigate = useNavigate();

  const toggleMenuPanel = () => {
    setOpenMenuPanel((openMenuPanel) => !openMenuPanel);
  };

  const toggleEditMapPanel = () => {
    setOpenEditMapPanel((openEditMapPanel) => !openEditMapPanel);
    navigate("/");
  };

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <SideBar
          toggleMenuPanel={toggleMenuPanel}
          toggleEditMapPanel={toggleEditMapPanel}
        />
        <MenuPanel
          open={openMenuPanel}
          handleClose={toggleMenuPanel}
          toggleEditMapPanel={toggleEditMapPanel}
        />

        <EditMapPanel
          open={openEditMapPanel}
          handleClose={toggleEditMapPanel}
          setAddSpeedLimit={setAddSpeedLimit}
          setSpeedLimitSectionId={setSpeedLimitSectionId}
          speedLimitSectionId={speedLimitSectionId}
        />
      </div>
      <div className={classes.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
