import React from "react";
import { Route, Switch } from "react-router";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Main from "./pages";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = () => {
  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/" component={Main} />

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
