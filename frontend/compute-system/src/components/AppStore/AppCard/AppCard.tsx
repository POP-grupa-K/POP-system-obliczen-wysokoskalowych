import { Avatar, Button, Grid, Paper, Snackbar } from "@material-ui/core";
import * as React from "react";
import { useHistory } from "react-router-dom";
import AddNewTaskDialog from "../../common/Dialogs/AddNewTaskDialog";
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
  const [openAddToCockpitDialog, setOpenAddToCockpitDialog] = React.useState<
    boolean
  >(false);
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);

  const showDetails = () => {
    history.push(`/app/${props.appCard.idApp}`);
  };

  const addToCockpit = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOpenAddToCockpitDialog(true);
  };

  const onAddToCockpitClose = () => {
    setOpenAddToCockpitDialog(false);
  };

  const handleSnackClose = () => {
    setOpenSnack(false);
  };

  const handleSnackbarShow = () => {
    setOpenSnack(true);
  };

  return (
    <>
      <AddNewTaskDialog
        open={openAddToCockpitDialog}
        handleCloseDialog={onAddToCockpitClose}
        idApp={props.appCard.idApp}
        showSnackbar={handleSnackbarShow}
      />
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
        message={`Added task to ${props.appCard.nameApp}`}
        onClose={handleSnackClose}
        autoHideDuration={5000}
      />
    </>
  );
};

export default AppCard;
