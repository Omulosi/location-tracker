import React from "react";
import { makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Map as MapIcon, Dashboard, Edit } from "@material-ui/icons";
import SideBarIconWrapper from "./SideBarIconWrapper";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: "56px",
    backgroundColor: "#2a2b2e",
    color: "white",
    height: "100vh",
    position: "relative",
    zIndex: 8,
    padding: "12px 8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "background-color 300ms cubic-bezier(.4,0,.2,1)",
  },
  iconWrapper: {
    marginBottom: "24px",
  },
  sidebarItem: {
    marginBottom: "1rem",
  },
}));

interface Props {
  toggleMenuPanel?: any;
  toggleSearchBar?: any;
  toggleEditMapPanel?: any;
}
const SideBar = ({
  toggleMenuPanel,
  toggleSearchBar,
  toggleEditMapPanel,
}: Props) => {
  const classes = useStyles();

  const navigate = useNavigate();

  return (
    <div className={classes.sidebar}>
      <SideBarIconWrapper
        icon={MenuIcon}
        title="Menu"
        handleClick={toggleMenuPanel}
        className={classes.iconWrapper}
      />
      <SideBarIconWrapper
        icon={Dashboard}
        title="Dashboard"
        handleClick={() => {
          navigate("dashboard");
        }}
        className={classes.sidebarItem}
      />

      <SideBarIconWrapper
        icon={MapIcon}
        title="Map"
        handleClick={() => {
          navigate("/");
        }}
        className={classes.sidebarItem}
      />

      <SideBarIconWrapper
        icon={Edit}
        title="Edit Map"
        handleClick={toggleEditMapPanel}
      />
    </div>
  );
};

export default SideBar;
