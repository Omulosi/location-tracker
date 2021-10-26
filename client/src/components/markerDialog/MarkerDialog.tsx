import * as React from "react";
import {
  makeStyles,
  IconButton,
  Snackbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";
import { Clear, Close } from "@material-ui/icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { SpeedLimit } from "../../pages/Map";
import { appendToStorage } from "../../utils/localStorage";
import { useAddSpeedLimit } from "../../fetch/speedLimits";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#e8eaed",
    background: "#202124",
    margin: "24px 40px",
    fontWeight: 400,
    lineHeight: "20px",
    fontSize: "14px",
    borderRadius: "5px",
    width: "360px",
    position: "relative",
  },
  content: {
    position: "relative",
    width: "360px",
    // background: "#202124",
    // color: "#e8eaed",
  },
  iconButton: {
    position: "absolute",
    top: "3px",
    right: "3px",
    color: "#5f6368",
    padding: "7px",
    margin: "4px",
    transition:
      "all .15s cubic-bezier(.4,0,.2,1), color .33s cubic-bezier(.4,0,.2,1)",
    "&:hover": {
      background: "#3c4043",
    },
  },

  btn: {
    color: "#e8eaed",
    // background: "#8ab4f8",
    padding: "0 24px",
    minHeight: "36px",
    minWidth: "64px",
  },

  actions: {},
}));

interface Props {
  open: boolean;
  handleClose: any;
  data: SpeedLimit | null;
}

const validationSchema = yup.object({
  sectionName: yup.string(),
  speedLimit: yup.string(),
});

export default function MarkerDialog({ open, handleClose, data }: Props) {
  const classes = useStyles();
  const addSpeedLimit = useAddSpeedLimit();

  const formik = useFormik({
    initialValues: {
      speedLimit: "",
      sectionName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // store values in the db
      console.log(values);
    },
  });

  const handleSubmit = (
    e: React.SyntheticEvent,
    values: {
      speedLimit: string;
      sectionName: string;
    }
  ) => {
    e.preventDefault();
    if (data) {
      data.speedLimit = +values.speedLimit;
      data.sectionName = values.sectionName;
    }

    addSpeedLimit.mutate(data);
    handleClose();
  };

  return (
    <div className={classes.content}>
      <Dialog open={open} onClose={handleClose}>
        <div className={classes.content}>
          <form
            onSubmit={(e) => {
              handleSubmit(e, formik.values);
            }}
          >
            <IconButton className={classes.iconButton} onClick={handleClose}>
              <Clear />
            </IconButton>
            <DialogTitle>Add speed limit</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Section Name"
                name="sectionName"
                type="text"
                fullWidth
                variant="outlined"
                color="primary"
                value={formik.values.sectionName}
                onChange={formik.handleChange}
              />
              <TextField
                margin="dense"
                id="speed"
                label="Speed Limit"
                name="speedLimit"
                type="text"
                fullWidth
                variant="outlined"
                color="primary"
                value={formik.values.speedLimit}
                onChange={formik.handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
