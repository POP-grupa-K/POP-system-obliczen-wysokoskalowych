import { Button, Grid, Paper } from "@material-ui/core";
import { PanoramaOutlined } from "@material-ui/icons";
import * as React from "react";
import appCardStyles from "./appCardStyles";
import TextsBox from "./components/TextsBox";
import UsedRateRow from "./components/UsedRateRow";
import AppCardData from "./interfaces/appCard";

interface AppCardProps {
  appCard: AppCardData;
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
          title={props.appCard.nameApp}
          updatedDate={props.appCard.dateUpdate}
          description={props.appCard.descriptionApp}
        />
        <Grid item container direction="column" alignItems="center">
          <Grid item container wrap="nowrap" className={classes.usedRateBox}>
            <UsedRateRow isRate={false} timesUsed={props.appCard.timesUsed} />
            <UsedRateRow isRate={true} rate={props.appCard.ranking} />
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
