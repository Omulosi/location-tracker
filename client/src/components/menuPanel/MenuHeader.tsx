import { IconButton, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ChevronLeft } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    height: "64px",
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  iconButton: {
    color: "#f1f3f4",
    padding: "7px",
    margin: "4px",
    transition:
      "all .15s cubic-bezier(.4,0,.2,1), color .33s cubic-bezier(.4,0,.2,1)",
    "&:hover": {
      background: "#3c4043",
    },
  },
  icon: {
    width: "24px",
    height: "24px",
  },
}));

interface Props {
  handleClose: any;
}

const MenuHeader = ({ handleClose }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <IconButton onClick={handleClose} className={classes.iconButton}>
        <ChevronLeft className={classes.icon} />
      </IconButton>
    </div>
  );
};

export default MenuHeader;
