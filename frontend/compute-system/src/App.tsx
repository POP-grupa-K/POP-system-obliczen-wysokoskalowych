import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import AppStore from "./components/AppStore/AppStore";
import Navigation from "./components/Navigation/Navigation";
import { routes } from "./const/routes";
import DataShelf from "./components/DataShelf/DataShelf";
import ComputationCockpit from "./components/ComputationCockpit/ComputationCockpit";
import AppDetails from "./components/AppStore/AppDetails/AppDetails";

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
          <Route
            exact
            path={routes.appDetails.path}
            render={() => (
              <AppDetails
                id={1}
                title={"App title"}
                updatedDate={"April 2nd 2005, 9:37PM"}
                description={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem."
                }
                rate={6.9}
                timesUsed={911420}
              />
            )}
          />
        </Switch>
      </Navigation>
    </Router>
  );
}

export default App;
