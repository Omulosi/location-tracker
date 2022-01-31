import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import CloseIcon from "@material-ui/icons/Close";
// import { Item } from "../../pages/Map/Map";
// import { IconButton } from "@material-ui/core";
import { VehicleData } from "../../pages/Layout";

const useStyles = makeStyles({
  root: {
    width: "250px",
    position: "relative",
  },
  content: {
    padding: "15px",
    color: "#e8eaed",
    backgroundColor: "#303235",
    borderRadius: "8px",
    display: "flex",
    alignItems: "flex-start",
  },
  title: {
    fontSize: "13px",
    letterSpacing: ".25px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  info: {
    margin: "4px 0",
    fontSize: "12px",
    letterSpacing: ".3px",
    color: "#e8eaed",
  },
  footer: {
    fontSize: "12px",
    letterSpacing: ".3px",
    color: "#9aa0a6",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  closeIcon: {
    color: "#9aa0a6",
    background: "transparent",
    cursor: "pointer",
    position: "absolute",
    padding: "5px",
    margin: "2px",
    top: "0",
    right: "0",
    transition:
      "all .15s cubic-bezier(.4,0,.2,1), color .33s cubic-bezier(.4,0,.2,1)",
    "&:hover": {
      background: "#3c4043",
    },
  },
});

interface Props {
  item: VehicleData | null;
}

const VehicleInfoPopup = ({ item }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div>
          <div className={classes.title}>Vehicle: {item?.vehicle.plate}</div>
          <div className={classes.footer} style={{ color: "whitesmoke" }}>
            Driver: {item?.driver?.name}
          </div>
          <div className={classes.footer} style={{ color: "whitesmoke" }}>
            Tracker: {item?.vehicle?.imei}
          </div>
          <div className={classes.footer}>
            <span>Current speed: {item?.location.speed}</span>
          </div>
          <div className={classes.footer}>
            <span>Longitude: {item?.location.lon}</span>
            <br />
            <span>Latitude: {item?.location.lat}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleInfoPopup;
