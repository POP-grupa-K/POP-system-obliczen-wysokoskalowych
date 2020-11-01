import React from "react";
import { Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import AppCard from "./components/AppStore/components/AppCard";
import mocksAppCards from "./mocks/AppStore/AppCard/mockAppCards";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
      <Route
        exact
        path="/"
        render={() => (
          <AppCard
            title={mocksAppCards[0].title}
            updatedDate={mocksAppCards[0].updatedDate}
            description={mocksAppCards[0].description}
            timesUsed={mocksAppCards[0].timesUsed}
            rate={mocksAppCards[0].rate}
          />
        )}
      />
    </Router>
  );
}

export default App;
