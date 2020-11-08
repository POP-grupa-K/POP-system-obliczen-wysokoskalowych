import * as React from "react";
import { Typography, Grid, useMediaQuery } from "@material-ui/core";
import ratingStyles from "./appRatingStyles";
import Stars from "./components/Stars";

interface AppRatingProps {
  id: number;
  uid: number;
  rate: number;
  comment: string;
}

const AppRating = (props: AppRatingProps) => {
  const classes = ratingStyles();
  const matches = useMediaQuery("(min-width:870px)");

  return (
    <Grid container alignItems="center" className={classes.grid}>
      <Grid
        item
        container
        alignItems="center"
        className={matches ? classes.header : classes.headerSmallWindow}
      >
        <Grid item xs={matches ? 1 : 3}>
          <Typography variant="h6" className={classes.rateValue}>
            {props.rate}/10
          </Typography>
        </Grid>
        <Stars rate={props.rate} />
      </Grid>
      <Grid item xs={12} className={classes.comment}>
        <Typography variant="body1">{props.comment}</Typography>
      </Grid>
    </Grid>
  );
};

export default AppRating;
