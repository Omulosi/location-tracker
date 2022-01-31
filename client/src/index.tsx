import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from "./ErrorBoundary";
import App from "./App";
import { AuthContextProvider } from "./context/auth";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <BrowserRouter>
            <CssBaseline />
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
