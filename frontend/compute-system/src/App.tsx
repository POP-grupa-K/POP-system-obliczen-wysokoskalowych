import {createBrowserHistory} from "history";
import React from "react";
import {Route, Router} from "react-router-dom";
import AppStore from "./components/AppStore/AppStore";
import Navigation from "./components/Navigation/Navigation";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
      <Route
        exact
        path="/"
        render={() => (
          <Navigation>
            <AppStore/>
          </Navigation>
        )}
      />
    </Router>
  );
}

export default App;
