import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSpeedLimits } from "../fetch/speedLimits";
import { connect, messages } from "../services/VehicleService";
import BarChart from "../components/reports/BarChart";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    maxHeight: "100vh",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
  },
  dashboard: {
    padding: "4rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  },
}));

export type DashboardData = {
  data: [];
};

const Dashboard = () => {
  const classes = useStyles();
  const { data: dashboardData, isSuccess } = useSpeedLimits();

  return (
    <div className={classes.dashboard}>
      <h3>Speed Monitoring Data</h3>
      <BarChart />
    </div>
  );
};

export default Dashboard;
