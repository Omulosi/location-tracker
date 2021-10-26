import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: "0",
    left: "56px",
    right: 0,
    width: "calc(100% - 56px)",
  },
  content: {
    display: "flex",
    fontSize: "12px",
    letterSpacing: ".3px",
    alignItems: "center",
    color: "#e8eaed",
    backgroundColor: "rgba(0,0,0,.6)",
    height: "32px",
    padding: "0 15px",
    justifyContent: "center",
  },
}));

interface Props {
  children: React.ReactNode;
}

const MapStatus = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default MapStatus;
