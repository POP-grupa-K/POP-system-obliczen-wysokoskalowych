import * as React from "react";
import { Typography, Grid, Container, useMediaQuery } from "@material-ui/core";
import AppRating from "../AppRating/AppRating";
import mockRatings from "../../../mocks/AppStore/Rating/mockRatings";
import appDetailsStyles from "./appDetailsStyles";
import AppDetailsHeader from "./components/AppDetailsHeader";

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
  const matches = useMediaQuery("(min-width:800px)");

  return (
    <Container>
      <Grid container alignItems="center" spacing={2}>
        <AppDetailsHeader title={props.title} description={props.description} />
        <Grid item container className={classes.body}>
          <Grid item xs={matches ? 3 : 12}>
            <Typography variant="h6">Rate: {props.rate}/10</Typography>
            <Typography variant="h6">Times used: {props.timesUsed}</Typography>
            <Typography variant="subtitle2">
              Last update: {props.updatedDate}
            </Typography>
          </Grid>
          <Grid item xs={matches ? 9 : 12}>
            <Typography variant="h6">Comments:</Typography>
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
