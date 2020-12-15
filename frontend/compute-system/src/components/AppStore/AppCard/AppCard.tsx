import { Avatar, Button, Grid, Paper, Snackbar } from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { COCKPIT_URL } from "../../../api/urls";
import { User } from "../../../mocks/common/mockUsers";
import RootState from "../../../redux/rootState";
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
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);
  const currentUser: User = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const showDetails = () => {
    history.push(`/app/${props.appCard.idApp}`);
  };

  const addAppToCockpit = React.useCallback(async () => {
    const data = { idApp: props.appCard.idApp, idUser: currentUser.id };
    const response = await fetch(`${COCKPIT_URL}/apps`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      handleSnackbarShow();
    }
  }, [props.appCard.idApp, currentUser.id]);

  const addToCockpit = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    addAppToCockpit();
  };

  const handleSnackClose = () => {
    setOpenSnack(false);
  };

  const handleSnackbarShow = () => {
    setOpenSnack(true);
  };

  return (
    <>
      <Paper className={classes.paper} onClick={showDetails}>
        <Grid container alignItems="center" wrap="nowrap">
          <Grid item>
            {
              <Avatar
                alt={props.appCard.nameApp}
                variant="square"
                src={props.appCard.imageUrl}
                className={classes.icon}
              />
            }
          </Grid>
          <TextsBox
            title={props.appCard.nameApp}
            updatedDate={props.appCard.dateUpdate.substring(
              0,
              props.appCard.dateUpdate.length - 3
            )}
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnack}
        message={`Added app ${props.appCard.nameApp} to cockpit`}
        onClose={handleSnackClose}
        autoHideDuration={5000}
      />
    </>
  );
};

export default AppCard;
