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
import AppRating from "../AppRating/AppRating";
import appDetailsStyles from "./appDetailsStyles";
import AppDetailsHeader from "./components/AppDetailsHeader";
import AppStats from "./components/AppStats";
import CommentForm from "./components/CommentForm";

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

  const fetchDetails = React.useCallback(async () => {
    const response = await apiCall<AppCardData>(
      `${APPSTORE_URL}${appId}`,
      RequestType.GET
    );
    if (response.isError) {
      return;
    }

    setApp(response.content);
  }, [appId]);

  React.useEffect(() => {
    fetchDetails();
    setCommented(true); // TODO
  }, [fetchDetails]);

  return (
    <Container>
      <Grid container alignItems="center" spacing={2}>
        <AppDetailsHeader
          id={app.idApp}
          title={app.nameApp}
          description={app.descriptionApp}
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
              {Array(10)
                .fill(mockRatings[1])
                .map((ratings, index) => (
                  <AppRating
                    key={index}
                    userCommented={false}
                    setCommented={setCommented}
                    {...ratings}
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
