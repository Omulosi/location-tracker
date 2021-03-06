import React from "react";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MenuHeader from "./MenuHeader";
import MenuProfile from "./MenuProfile";
import {
  Divider,
  MenuItem,
  ListItemIcon,
  MenuList,
  ListItemText,
} from "@material-ui/core";
import { Map as MapIcon, Dashboard, MapSharp } from "@material-ui/icons";
import SideBarIconWrapper from "../sideBar/SideBarIconWrapper";
import { useNavigate } from "react-router-dom";

const drawerWidth = 320;

const useStyles = makeStyles((theme: Theme) => ({
  menuPanel: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    background: "#202124",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content: {
    color: "#eae8ed",
  },
}));

interface Props {
  open: boolean;
  handleClose: any;
  toggleEditMapPanel?: any;
}

const MenuPanel = ({ open, handleClose, toggleEditMapPanel }: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.menuPanel}>
      <Drawer
        open={open}
        onClose={handleClose}
        className={classes.drawer}
        classes={{
          paper: classes.drawerOpen,
        }}
      >
        <div className={classes.content}>
          <MenuHeader handleClose={handleClose} />
          <MenuProfile />
          <Divider style={{ backgroundColor: "#5f6368" }} />
          {/** Menu Items - map, etc */}
          <MenuList>
            {/** Home/Map */}
            <MenuItem
              onClick={(e) => {
                navigate("");
                handleClose();
              }}
            >
              <ListItemIcon>
                <SideBarIconWrapper
                  icon={MapSharp}
                  title="Map"
                  handleClick={() => {
                    navigate("/map");
                  }}
                />
              </ListItemIcon>
              <ListItemText>Map</ListItemText>
            </MenuItem>

            {/** Dashboard */}
            <MenuItem
              onClick={(e) => {
                navigate("/dashboard");
                handleClose();
              }}
            >
              <ListItemIcon>
                <SideBarIconWrapper
                  icon={Dashboard}
                  title="Dashboard"
                  handleClick={() => {}}
                />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </MenuItem>

            {/** Map */}
            <MenuItem
              onClick={(e) => {
                // setDrawerOpen(false);
                handleClose();
                toggleEditMapPanel();
              }}
            >
              <ListItemIcon>
                <SideBarIconWrapper
                  icon={MapIcon}
                  title="Edit Map"
                  handleClick={toggleEditMapPanel}
                />
              </ListItemIcon>
              <ListItemText>Edit Map</ListItemText>
            </MenuItem>
          </MenuList>
        </div>
      </Drawer>
    </div>
  );
};

export default MenuPanel;
