import * as React from "react";
import { Typography, Grid, Container, useMediaQuery } from "@material-ui/core";
import AppRating from "../AppRating/AppRating";
import mockRatings from "../../../mocks/AppStore/Rating/mockRatings";
import appDetailsStyles from "./appDetailsStyles";
import AppDetailsHeader from "./components/AppDetailsHeader";
import mockAppCard from "../../../mocks/AppStore/AppCard/mockAppCards";
import { RouteComponentProps } from "react-router-dom";
import CommentForm from "./components/CommentForm";
import AppStats from "./components/AppStats";

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

  React.useEffect(() => {
    const loggedUserId = 1;
    if (loggedUserId === mockRatings[0].userId) setCommented(true);
  }, []);

  return (
    <Container>
      <Grid container alignItems="center" spacing={2}>
        <AppDetailsHeader
          title={mockAppCard.nameApp}
          description={mockAppCard.descriptionApp}
        />
        <Grid item container className={classes.body}>
          <AppStats
            rate={mockAppCard.ranking}
            timesUsed={mockAppCard.timesUsed}
            updatedDate={mockAppCard.dateUpdate}
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
