import React from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Search, Clear, ChevronLeft } from "@material-ui/icons";
import { Divider, Drawer } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: "400px",
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerPaper: {
    color: "#e8eaed",
    height: "100%",
    overflowY: "auto",
    width: "400px",
    display: "flex",
    background: "#202124",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  search: {
    border: "1px solid #5f6368",
    borderRadius: "4px",
    margin: "8px",
    alignItems: "center",
    display: "flex",
  },
  input: {
    fontSize: "16px",
    letterSpacing: ".1px",
    color: "#e8eaed",
    border: "none",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "transparent",
    padding: "1px 2px",
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
  searchResults: {
    backgroundColor: "#202124",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "20px",
    color: "#e8eaed",
  },
  trailingButtons: {
    display: "flex",
    alignItems: "center",
  },
  modal: {
    paddingLeft: 50,
  },
  divider: {
    display: "inline-block",
    height: "24px",
    borderLeft: "1px solid #5f6368",
  },
  title: {
    fontSize: "16px",
    letterSpacing: ".1px",
    margin: "20px 0 12px 20px",
    color: "#e8eaed",
  },
  searchResultItem: {
    padding: "8px 20px",
    display: "flex",
    alignItems: " center",
    cursor: "pointer",
  },
  listItem: {
    "&:hover": {
      backgroundColor: "#3c4043",
    },
  },
}));

interface Props {
  open: boolean;
  handleClose: any;
}

const SearchBar = ({ open, handleClose }: Props) => {
  const classes = useStyles();
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
        <div className={classes.search}>
          <IconButton className={classes.iconButton}>
            <Search />
          </IconButton>
          <input type="text" placeholder="Search" className={classes.input} />
          <div className={classes.trailingButtons}>
            <IconButton className={classes.iconButton}>
              <Clear />
            </IconButton>
            <span className={classes.divider}></span>
            <IconButton className={classes.iconButton}>
              <ChevronLeft onClick={handleClose} />
            </IconButton>
          </div>
        </div>

        <div className={classes.searchResults}>
          <h2 id="title" className={classes.title}>
            Results
          </h2>
          <List>
            <ListItem button className={classes.listItem}>
              <ListItemText>search result 1</ListItemText>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default SearchBar;
