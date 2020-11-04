import * as React from "react";
import mockAppCard from "../../mocks/AppStore/AppCard/mockAppCards";
import AppCard from "./AppCard/AppCard";
import {
  Container,
  GridList,
  GridListTile,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { appStoreStyles } from "./styles";

const AppStore = () => {
  const classes = appStoreStyles();
  const theme = useTheme();
  const largeWidth = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Container maxWidth="lg">
      <GridList cols={largeWidth ? 2 : 1}>
        {Array(10)
          .fill(mockAppCard)
          .map((appCard, index) => (
            <GridListTile key={index} cols={1} className={classes.root}>
              <AppCard {...appCard} />
            </GridListTile>
          ))}
      </GridList>
    </Container>
  );
};

export default AppStore;
