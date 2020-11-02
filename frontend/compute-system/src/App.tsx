import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import AppStore from "./components/AppStore/AppStore";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
      <Route
        exact
        path="/"
        render={() => (
          <AppStore />
        )}
      />
    </Router>
  );
}

export default App;
