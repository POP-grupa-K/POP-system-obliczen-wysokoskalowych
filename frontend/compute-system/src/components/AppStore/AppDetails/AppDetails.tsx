import { Container, Grid, Typography, useMediaQuery } from "@material-ui/core";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import apiCall from "../../../api/apiCall";
import RequestType from "../../../api/requestType";
import { APPSTORE_URL } from "../../../api/urls";
import mockRatings from "../../../mocks/AppStore/Rating/mockRatings";
import AppCardData, {
  initialAppCardData,
} from "../AppCard/interfaces/appCardData";
import IAppRating, {
  initialAppRatings,
} from "../AppRating/interfaces/appRating";
import AppRating from "../AppRating/AppRating";
import appDetailsStyles from "./appDetailsStyles";
import AppDetailsHeader from "./components/AppDetailsHeader";
import AppStats from "./components/AppStats";
import CommentForm from "./components/CommentForm";
import { createAppImageUrl } from "../../../api/apiUtils";

interface AppDetailsRouteParams {
  appId: string;
}

interface AppDetailsRouteProps
  extends RouteComponentProps<AppDetailsRouteParams> {}

const AppDetails = (props: AppDetailsRouteProps) => {
  const classes = appDetailsStyles();
  const matches = useMediaQuery("(min-width:800px)");
  const { appId } = props.match.params;
  const [userCommented, setCommented] = React.useState(false);
  const [app, setApp] = React.useState<AppCardData>(initialAppCardData);
  const [reload, setReload] = React.useState<boolean>(false);
  const [ratings, setRatings] = React.useState<IAppRating[]>(initialAppRatings);

  const makeReload = () => {
    setReload(true);
  };

  const fetchDetails = React.useCallback(async () => {
    const responseDetails = await apiCall<AppCardData>(
      `${APPSTORE_URL}${appId}`,
      RequestType.GET
    );
    if (responseDetails.isError) {
      return;
    }

    var apiApp = responseDetails.content;
    apiApp.dateUpdate = new Date(apiApp.dateUpdate).toLocaleString();
    apiApp.imageUrl = createAppImageUrl(appId);

    const responseRatings = await apiCall<IAppRating[]>(
      `${APPSTORE_URL}rating/app/${appId}`,
      RequestType.GET
    );
    if (responseRatings.isError) {
      return;
    }

    console.log(`${APPSTORE_URL}/rating/app/${appId}`);
    console.log(responseRatings);

    var appRatings = responseRatings.content;

    setApp(apiApp);
    setRatings(appRatings);
    setReload(false);
  }, [appId]);

  React.useEffect(() => {
    fetchDetails();
    setCommented(true); // TODO
  }, [fetchDetails, reload]);

  return (
    <Container>
      <Grid container alignItems="center" spacing={2}>
        <AppDetailsHeader
          id={app.idApp}
          title={app.nameApp}
          description={app.descriptionApp}
          imageUrl={app.imageUrl}
          makeReload={makeReload}
        />
        <Grid item container className={classes.body}>
          <AppStats
            rate={app.ranking}
            timesUsed={app.timesUsed}
            updatedDate={app.dateUpdate}
          />
          <Grid item xs={matches ? 9 : 12}>
            {userCommented && (
              <>
                <Typography variant="h6">Your comment:</Typography>
                <Container>
                  <AppRating
                    userCommented={true}
                    setCommented={setCommented}
                    {...mockRatings[0]}
                  />
                </Container>
              </>
            )}
            <Typography variant="h6">Comments:</Typography>
            {!userCommented && <CommentForm id={appId} />}
            <Container>
              {Array(ratings.length)
                .fill(mockRatings[0])
                .map((rating, index) => (
                  <AppRating
                    userCommented={false}
                    setCommented={setCommented}
                    {...ratings[index]}
                  />
                ))}
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppDetails;
