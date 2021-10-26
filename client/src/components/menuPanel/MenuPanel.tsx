import React from "react";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MenuHeader from "./MenuHeader";
import MenuProfile from "./MenuProfile";
import { Divider } from "@material-ui/core";

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
}

const MenuPanel = ({ open, handleClose }: Props) => {
  const classes = useStyles();

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
        </div>
      </Drawer>
    </div>
  );
};

export default MenuPanel;
