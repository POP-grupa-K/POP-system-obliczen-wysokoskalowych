import { Button, Grid, Paper } from "@material-ui/core";
import { PanoramaOutlined } from "@material-ui/icons";
import * as React from "react";
import { useHistory } from "react-router-dom";
import appCardStyles from "./appCardStyles";
import TextsBox from "./components/TextsBox";
import UsedRateRow from "./components/UsedRateRow";

interface AppCardProps {
  id: number;
  title: string;
  updatedDate: string;
  description: string;
  timesUsed: number;
  rate: number;
}

const AppCard = (props: AppCardProps) => {
  const classes = appCardStyles();
  const history = useHistory();

  const showDetails = () => {
    history.push(`/app/${props.id}`);
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
