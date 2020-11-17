import * as React from "react";
import { Typography, Grid, useMediaQuery } from "@material-ui/core";
import appStatsStyles from "./AppStatsStyles";

interface AppStatsProps {
  rate: number;
  timesUsed: number;
  updatedDate: string;
}

const AppStats = (props: AppStatsProps) => {
  const classes = appStatsStyles();
  const matches = useMediaQuery("(min-width:800px)");
  return (
    <Grid item xs={matches ? 3 : 12}>
      <Grid item container>
        <Grid item className={classes.usageRateBox}>
          <Typography variant="h6">Rate:</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6"> {props.rate}/5</Typography>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item className={classes.usageRateBox}>
          <Typography variant="h6">Times used:</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6"> {props.timesUsed}</Typography>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item className={classes.usageRateBox}>
          <Typography variant="subtitle2">Last update:</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">{props.updatedDate.substring(0, props.updatedDate.length - 3)}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AppStats;
