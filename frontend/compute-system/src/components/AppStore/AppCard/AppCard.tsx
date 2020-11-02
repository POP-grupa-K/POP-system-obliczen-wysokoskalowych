import { Button, Grid, Paper } from "@material-ui/core";
import { PanoramaOutlined } from "@material-ui/icons";
import * as React from "react";
import appCardStyles from "./appCardStyles";
import TextsBox from "./components/TextsBox";
import UsedRateRow from "./components/UsedRateRow";

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
        <TextsBox
          title={props.title}
          updatedDate={props.updatedDate}
          description={props.description}
        />
        <Grid item container direction="column" alignItems="center">
          <Grid item container wrap="nowrap" className={classes.usedRateBox}>
            <UsedRateRow isRate={false} timesUsed={props.timesUsed} />
            <UsedRateRow isRate={true} rate={props.rate} />
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
