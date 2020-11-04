import * as React from "react";
import mockAppCard from "../../mocks/AppStore/AppCard/mockAppCards";
import AppCard from "./AppCard/AppCard";
import {Container, GridList, GridListTile} from "@material-ui/core";

const AppStore = () => {
  return (
    <Container maxWidth="lg">
      <GridList cols={2}>
        {
          Array(10).fill(mockAppCard).map(
            (appCard, index) => (
              <GridListTile key={index} cols={1}>
                <AppCard {...appCard}/>
              </GridListTile>
            )
          )
        }
      </GridList>
    </Container>
  );
};

export default AppStore;
