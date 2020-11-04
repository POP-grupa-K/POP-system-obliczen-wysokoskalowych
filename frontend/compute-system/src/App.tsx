import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import AppStore from "./components/AppStore/AppStore";
import Navigation from "./components/Navigation/Navigation";
import { routes } from "./const/routes";
import DataShelf from "./components/DataShelf/DataShelf";
import ComputationCockpit from "./components/ComputationCockpit/ComputationCockpit";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
      <Navigation>
        <Switch>
          <Route exact path={routes.appStore.path} component={AppStore} />
          <Route exact path={routes.dataShelf.path} component={DataShelf} />
          <Route
            exact
            path={routes.computationCockpit.path}
            component={ComputationCockpit}
          />
        </Switch>
      </Navigation>
    </Router>
  );
}

export default App;
