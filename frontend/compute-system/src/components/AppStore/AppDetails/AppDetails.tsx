import * as React from "react";
import { Typography, Grid, Container } from "@material-ui/core";
import { PanoramaOutlined } from "@material-ui/icons";
import AppRating from "../AppRating/AppRating";
import mockRatings from "../../../mocks/AppStore/Rating/mockRatings";
import appDetailsStyles from "./appDetailsStyles";

interface AppDetailsProps {
  id: number;
  title: string;
  updatedDate: string;
  description: string;
  timesUsed: number;
  rate: number;
}

const AppDetails = (props: AppDetailsProps) => {
  const classes = appDetailsStyles();

  return (
    <Container className={classes.root}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item container>
          <Grid item xs={2}>
            <PanoramaOutlined className={classes.icon} />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h4">{props.title}</Typography>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item xs={2}>
            <Typography variant="body1">Rate: {props.rate}</Typography>
            <Typography variant="body1">
              Times used: {props.timesUsed}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">{props.description}</Typography>
            Ratings/comments:
            <Container>
              {Array(10)
                .fill(mockRatings)
                .map((ratings, index) => (
                  <AppRating key={index} {...ratings} />
                ))}
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppDetails;
