import { Container, Grid, Typography, useMediaQuery } from "@material-ui/core";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import apiCall from "../../../api/apiCall";
import RequestType from "../../../api/requestType";
import { APPSTORE_URL } from "../../../api/urls";
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
  const [ownComment, setOwnComment] = React.useState<IAppRating>();
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

    const apiApp = responseDetails.content as AppCardData;
    apiApp.dateUpdate = new Date(apiApp.dateUpdate).toLocaleString();
    apiApp.imageUrl = createAppImageUrl(appId);

    const responseRatings = await apiCall<IAppRating[]>(
      `${APPSTORE_URL}rating/app/${appId}`,
      RequestType.GET
    );
    if (responseRatings.isError) {
      return;
    }

    const appRatings = responseRatings.content as IAppRating[];
    const ownRating = appRatings.find((x) => x.idUser === 2137);
    if (ownRating != null) {
      const index = appRatings.indexOf(ownRating);
      appRatings.splice(index, 1);
      setOwnComment(ownRating);
    }

    setApp(apiApp);
    setRatings(appRatings);
    setReload(false);
  }, [appId]);

  React.useEffect(() => {
    fetchDetails();
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
            {ownComment && (
              <>
                <Typography variant="h6">Your comment:</Typography>
                <Container>
                  <AppRating
                    userCommented={true}
                    setCommented={setOwnComment}
                    makeReload={makeReload}
                    {...ownComment}
                  />
                </Container>
              </>
            )}
            <Typography variant="h6">Comments:</Typography>
            {!ownComment && (
              <CommentForm
                appId={appId}
                setCommented={setOwnComment}
                makeReload={makeReload}
              />
            )}
            <Container>
              {ratings.map((rating, index) => (
                <AppRating
                  key={index}
                  userCommented={false}
                  setCommented={setOwnComment}
                  makeReload={makeReload}
                  {...rating}
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
