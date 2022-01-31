import React from "react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Layout from "./pages/Layout";
import MapView from "./pages/MapView";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [addSpeedLimit, setAddSpeedLimit] = React.useState(false);
  const [speedLimitSectionId, setSpeedLimitSectionId] = React.useState(null);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <Layout
                setAddSpeedLimit={setAddSpeedLimit}
                setSpeedLimitSectionId={setSpeedLimitSectionId}
                speedLimitSectionId={speedLimitSectionId}
              />
            }
          >
            {/** Map element */}
            <Route
              path=""
              element={
                <MapView
                  setAddSpeedLimit={setAddSpeedLimit}
                  speedLimitSectionId={speedLimitSectionId}
                  addSpeedLimit={addSpeedLimit}
                />
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
