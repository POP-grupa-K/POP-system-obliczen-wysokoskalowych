import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import AppStore from "./components/AppStore/AppStore";
import Navigation from "./components/Navigation/Navigation";
import { routes } from "./const/routes";
import DataShelf from "./components/DataShelf/DataShelf";
import ComputationCockpit from "./components/ComputationCockpit/ComputationCockpit";
import AppDetails from "./components/AppStore/AppDetails/AppDetails";
import { TaskDetails } from "./components/ComputationCockpit/TaskDetails/TaskDetails";
import AppDesigner from "./components/AppStore/AppDesigner/AppDesigner";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
      <Navigation>
        <Switch>
          <Route exact path={routes.appStore} component={AppStore} />
          <Route exact path={routes.dataShelf} component={DataShelf} />
          <Route
            exact
            path={routes.computationCockpit}
            component={ComputationCockpit}
          />
          <Route
            exact
            path={routes.appDetails}
            render={(props) => <AppDetails {...props} />}
          />
          <Route
            exact
            path={routes.taskDetails}
            render={(props) => <TaskDetails {...props} />}
          />
          <Route exact path={routes.appDesigner} component={AppDesigner} />
        </Switch>
      </Navigation>
    </Router>
  );
}

export default App;
