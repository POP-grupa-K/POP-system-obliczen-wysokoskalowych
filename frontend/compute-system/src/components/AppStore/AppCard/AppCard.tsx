import { Button, Grid, Paper } from "@material-ui/core";
import { PanoramaOutlined } from "@material-ui/icons";
import * as React from "react";
import { useHistory } from "react-router-dom";
import appCardStyles from "./appCardStyles";
import TextsBox from "./components/TextsBox";
import UsedRateRow from "./components/UsedRateRow";
import AppCardData from "./interfaces/appCardData";

interface AppCardProps {
  appCard: AppCardData;
}

const AppCard = (props: AppCardProps) => {
  const classes = appCardStyles();
  const history = useHistory();

  const showDetails = () => {
    history.push(`/app/${props.appCard.idApp}`);
  };

  const addToCockpit = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <Paper className={classes.paper} onClick={showDetails}>
      <Grid container alignItems="center" wrap="nowrap">
        <Grid item>
          <PanoramaOutlined className={classes.icon} />
        </Grid>
        <TextsBox
          title={props.appCard.nameApp}
          updatedDate={props.appCard.dateUpdate.substring(0, props.appCard.dateUpdate.length - 3)}
          description={props.appCard.descriptionApp}
        />
        <Grid item container direction="column" alignItems="center">
          <Grid item container wrap="nowrap" className={classes.usedRateBox}>
            <UsedRateRow isRate={false} timesUsed={props.appCard.timesUsed} />
            <UsedRateRow isRate={true} rate={props.appCard.ranking} />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className={classes.addButton}
              onClick={addToCockpit}
            >
              Add to cockpit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AppCard;
