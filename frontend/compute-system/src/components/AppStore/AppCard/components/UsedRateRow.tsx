import { Grid, Typography } from "@material-ui/core";
import * as React from "react";

interface UsedRateRowProps {
  isRate: boolean;
  rate?: number;
  timesUsed?: number;
}

const UsedRateRow = (props: UsedRateRowProps) => {
  return (
    <Grid item container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="subtitle2">
          {props.isRate ? props.rate : props.timesUsed}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption">
          {props.isRate ? "Rate" : "Used"}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UsedRateRow;
