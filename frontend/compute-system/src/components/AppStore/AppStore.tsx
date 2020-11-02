import * as React from "react";
import mocksAppCards from "../../mocks/AppStore/AppCard/mockAppCards";
import AppCard from "./AppCard/AppCard";

const AppStore = () => {
  return (
    <AppCard
      title={mocksAppCards[0].title}
      updatedDate={mocksAppCards[0].updatedDate}
      description={mocksAppCards[0].description}
      timesUsed={mocksAppCards[0].timesUsed}
      rate={mocksAppCards[0].rate}
    />
  );
};

export default AppStore;
