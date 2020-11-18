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
import AppForm from "./AppForm/AppForm";
import { appStoreStyles } from "./styles";
import { createAppImageUrl } from "../../api/apiUtils";

const AppStore = () => {
  const [apps, setApps] = React.useState<AppCardData[]>([]);
  const [reload, setReload] = React.useState<boolean>(false);
  const classes = appStoreStyles();
  const theme = useTheme();
  const largeWidth = useMediaQuery(theme.breakpoints.up("lg"));

  const makeReload = () => {
    setReload(true);
  };

  const fetchApps = React.useCallback(async () => {
    const response = await apiCall<AppCardData[]>(
      APPSTORE_URL,
      RequestType.GET
    );
    if (response.isError) {
      return;
    }

    var apiApps = response.content;
    apiApps.forEach((apiApp) => {
      if (apiApp.dateUpdate) {
        apiApp.dateUpdate = new Date(apiApp.dateUpdate).toLocaleString();
      }
      apiApp.imageUrl = createAppImageUrl(apiApp.idApp);
    });

    setApps(apiApps);
    setReload(false);
  }, []);

  React.useEffect(() => {
    fetchApps();
  }, [fetchApps, reload]);

  return (
    <Container maxWidth="lg">
      <AppForm isEdit={false} makeReload={makeReload} />
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
