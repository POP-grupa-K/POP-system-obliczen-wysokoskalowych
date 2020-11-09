import * as React from "react";
import { Typography, Grid, useMediaQuery, Box } from "@material-ui/core";
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
      <Typography variant="h6">Rate: {props.rate}/10</Typography>
      <Typography variant="h6">Times used: {props.timesUsed}</Typography>
      <Typography variant="subtitle2">
        Last update: {props.updatedDate}
      </Typography>
    </Grid>
  );
};

export default AppStats;
