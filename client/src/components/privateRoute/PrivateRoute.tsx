import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component, ...rest }: any) => {
  const routeComponent = (props: any) =>
    localStorage.getItem("token") ? (
      React.createElement(component, props)
    ) : (
      <Redirect to="/login" />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
