import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import AppStore from "./components/AppStore/AppStore";
import AppRating from "./components/AppStore/AppRating/AppRating";
import mockRatings from "./mocks/AppStore/Rating/mockRatings"

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
      <Route 
        path="/rating" 
        render={() => (
        <AppRating rate={mockRatings[0].rate} description={mockRatings[0].description}/>
        )} 
      />
    </Router>
  );
}

export default App;
