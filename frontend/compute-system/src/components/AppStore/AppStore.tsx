import {
  Container,
  GridList,
  GridListTile,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import * as React from "react";
import apiCall from "../../api/apiCall";
import RequestType from "../../api/requestType";
import { APPSTORE_URL } from "../../api/urls";
import AppCard from "./AppCard/AppCard";
import AppCardData from "./AppCard/interfaces/appCardData";
import { appStoreStyles } from "./styles";

const AppStore = () => {
  const [apps, setApps] = React.useState<AppCardData[]>([]);
  const classes = appStoreStyles();
  const theme = useTheme();
  const largeWidth = useMediaQuery(theme.breakpoints.up("lg"));

  const fetchApps = React.useCallback(async () => {
    const response = await apiCall<AppCardData[]>(
      APPSTORE_URL,
      RequestType.GET
    );
    if (response.isError) {
      return;
    }

    setApps(response.content);
  }, []);

  React.useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  return (
    <Container maxWidth="lg">
      <GridList cols={largeWidth ? 2 : 1}>
        {apps.map((appCard, index) => (
          <GridListTile key={index} cols={1} className={classes.root}>
            <AppCard appCard={appCard} />
          </GridListTile>
        ))}
      </GridList>
    </Container>
  );
};

export default AppStore;
