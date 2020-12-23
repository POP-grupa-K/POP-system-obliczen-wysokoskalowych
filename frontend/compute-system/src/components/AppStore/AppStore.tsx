import {
  Button,
  Container,
  Grid,
  GridList,
  GridListTile,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ControlPointDuplicateIcon from "@material-ui/icons/ControlPointDuplicate";
import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import apiCall from "../../api/apiCall";
import { createAppImageUrl } from "../../api/apiUtils";
import RequestType from "../../api/requestType";
import { APPSTORE_URL } from "../../api/urls";
import { routes } from "../../const/routes";
import { User, UserType } from "../../mocks/common/mockUsers";
import RootState from "../../redux/rootState";
import AppCard from "./AppCard/AppCard";
import AppCardData from "./AppCard/interfaces/appCardData";
import AppForm from "./AppForm/AppForm";
import AppFormStyles from "./AppForm/AppFormStyles";
import { appStoreStyles } from "./styles";

const AppStore = () => {
  const buttonClasses = AppFormStyles();
  const [apps, setApps] = React.useState<AppCardData[]>([]);
  const [reload, setReload] = React.useState<boolean>(false);
  const classes = appStoreStyles();
  const theme = useTheme();
  const history = useHistory();
  const largeWidth = useMediaQuery(theme.breakpoints.up("lg"));
  const currentUser: User = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const makeReload = () => {
    setReload(true);
  };

  const handleCreateAppButtonClick = () => {
    history.push(routes.appDesigner);
  };

  const fetchApps = React.useCallback(async () => {
    const response = await apiCall<AppCardData[]>(
      APPSTORE_URL,
      RequestType.GET
    );
    if (response.isError) {
      return;
    }

    var apiApps = response.content as AppCardData[];
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
      <Grid container>
        {currentUser.role === UserType.User ? null : (
          <AppForm isEdit={false} makeReload={makeReload} />
        )}
        <Button
          variant="contained"
          startIcon={<ControlPointDuplicateIcon />}
          className={buttonClasses.editButton}
          onClick={handleCreateAppButtonClick}
        >
          Create an app
        </Button>
      </Grid>
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
