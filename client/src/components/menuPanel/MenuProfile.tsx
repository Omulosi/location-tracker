import React from "react";
import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/auth";
import useUser from "../../fetch/users";

const useStyles = makeStyles((theme: Theme) => ({
  profile: {
    padding: "12px 24px",
    color: "#9aa0a6",
    fontSize: "14px",
  },
  name: {
    paddingTop: "16px",
    paddingBottom: "8px",
    fontWeight: "bold",
  },
  signOut: {
    fontSize: "12px",
    marginLeft: "-8px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
    minWidth: "64px",
    minHeight: "36px",
    color: "#8ab4f8",
    background: "transparent",
    outline: "none",
    borderRadius: "4px",
    cursor: "pointer",
    padding: "0 8px",
    letterSpacing: ".25px",
    fontWeight: "bold",
    "&: hover": {
      borderBottom: "1px soid #8ab4f8",
    },
  },
}));

const MenuProfile = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { data } = useUser();
  let { first_name, last_name, email } = data || {
    first_name: "",
    last_name: "",
    email: "",
  };
  return (
    <div className={classes.profile}>
      <div id="name" className={classes.name}>
        {`${first_name || ""} ${last_name || ""}`}
      </div>
      <div id="email">{email}</div>
      <div
        id="sign-out"
        className={classes.signOut}
        onClick={() => logout(navigate)}
      >
        Sign Out
      </div>
    </div>
  );
};

export default MenuProfile;
