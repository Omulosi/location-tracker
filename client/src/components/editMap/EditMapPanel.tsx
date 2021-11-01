import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import { Clear, ChevronLeft } from "@material-ui/icons";
import { Divider, Drawer } from "@material-ui/core";
// import { getItemsFromStorage } from "../../utils/localStorage";
import { capitalize } from "../../utils/capitalize";
import { useSpeedLimits } from "../../fetch/speedLimits";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: "300px",
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerPaper: {
    color: "#e8eaed",
    height: "100%",
    overflowY: "auto",
    width: "300px",
    display: "flex",
    background: "#202124",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  heading: {
    margin: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "64px",
    minHeight: "36px",
    background: "#8ab4f8",
    borderRadius: "4px",
    cursor: "pointer",
    letterSpacing: ".25px",
    color: "#202124",
    padding: "0 24px",
    outline: "none",
    border: "none",
    fontWeight: "bold",
  },

  iconButton: {
    color: "#5f6368",
    padding: "7px",
    margin: "4px",
    transition:
      "all .15s cubic-bezier(.4,0,.2,1), color .33s cubic-bezier(.4,0,.2,1)",
    "&:hover": {
      background: "#3c4043",
    },
  },
  results: {
    backgroundColor: "#202124",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "20px",
    color: "#e8eaed",
  },
  modal: {
    paddingLeft: 50,
  },
  title: {
    fontSize: "22px",
    letterSpacing: "0",
    fontWeight: 400,
    color: "#fff",
  },
  trailingButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  divider: {
    display: "inline-block",
    height: "24px",
    borderLeft: "1px solid #5f6368",
  },
  listItem: {
    "&:hover": {
      backgroundColor: "#3c4043",
    },
  },
  topBox: {
    margin: "0 8px 8px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  speedItem: {
    padding: "0 16px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#3c4043",
    },
  },
}));

interface Props {
  open: boolean;
  handleClose: any;
  setAddSpeedLimit: any;
  setSpeedLimitSectionId: any;
  speedLimitSectionId: number | null;
}

interface Section {
  sectionName: string;
  speedLimit: number;
  id?: number;
}

const EditMapPanel = ({
  open,
  handleClose,
  setAddSpeedLimit,
  setSpeedLimitSectionId,
  speedLimitSectionId,
}: Props) => {
  const classes = useStyles();
  const { data, isSuccess } = useSpeedLimits();

  let roadSections: Section[] = [];

  if (isSuccess) {
    roadSections = data?.features.map(
      (ft: {
        properties: { speed_limit: any; section_name: any };
        id: any;
      }) => ({
        speedLimit: ft.properties.speed_limit,
        sectionName: ft.properties.section_name,
        id: ft.id,
      })
    );
  }

  return (
    <div className={classes.root}>
      <Drawer
        open={open}
        variant="persistent"
        anchor="left"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.topBox}>
          <div className={classes.trailingButtons}>
            <div></div>
            <IconButton className={classes.iconButton}>
              <ChevronLeft onClick={handleClose} />
            </IconButton>
          </div>

          <h3 className={classes.title}>Speed Limits</h3>

          <div className={classes.heading}>
            <button
              className={classes.button}
              onClick={() => setAddSpeedLimit(true)}
            >
              Add speed limit
            </button>
            <IconButton className={classes.iconButton}>
              <Clear onClick={() => setAddSpeedLimit(false)} />
            </IconButton>
          </div>
        </div>
        <Divider style={{ backgroundColor: "#5f6368" }} />

        <div className={classes.wrapper}>
          {roadSections &&
            roadSections.map((section: Section) => (
              <div
                className={classes.speedItem}
                onClick={() => setSpeedLimitSectionId(section.id)}
                key={section.id}
                style={{
                  borderBottom:
                    section.id === speedLimitSectionId
                      ? "1px solid #8ab4f8"
                      : "",
                }}
              >
                <span>{capitalize(section.sectionName)}</span>{" "}
                <span>{`${section.speedLimit} km/h`}</span>
              </div>
            ))}
        </div>
      </Drawer>
    </div>
  );
};

export default EditMapPanel;
