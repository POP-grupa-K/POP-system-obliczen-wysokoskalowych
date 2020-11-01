import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { PanoramaOutlined } from "@material-ui/icons";
import * as React from "react";
import appCardStyles from "./appCardStyles";

interface AppCardProps {
  title: string;
  updatedDate: string;
  description: string;
  timesUsed: number;
  rate: number;
}

const AppCard = (props: AppCardProps) => {
  const classes = appCardStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container alignItems="center" wrap="nowrap">
        <Grid item>
          <PanoramaOutlined className={classes.icon} />
        </Grid>
        <Grid item container direction="column" wrap="nowrap">
          <Grid item>
            <Typography variant="h5">{props.title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{`Updated on ${props.updatedDate}`}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">{props.description}</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Grid item container wrap="nowrap">
            <Grid item container direction="column">
              <Grid item>
                <Typography variant="subtitle2">{props.timesUsed}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">Used</Typography>
              </Grid>
            </Grid>
            <Grid item container direction="column">
              <Grid item>
                <Typography variant="subtitle2">{props.rate}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">Rate</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button className={classes.addButton}>Add to cockpit</Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AppCard;
