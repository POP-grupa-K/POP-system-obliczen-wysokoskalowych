import * as React from "react";
import {
  Avatar,
  Button,
  Grid,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import headerStyles from "./HeaderStyles";
import apiCall from "../../../../api/apiCall";
import { APPSTORE_URL } from "../../../../api/urls";
import RequestType from "../../../../api/requestType";
import { useHistory } from "react-router-dom";
import AppForm from "../../AppForm/AppForm";
import { User, UserType } from "../../../../mocks/common/mockUsers";
import { useSelector } from "react-redux";
import RootState from "../../../../redux/rootState";
import AddNewTaskDialog from "../../../common/Dialogs/AddNewTaskDialog";

interface AppDetailsHeaderProps {
  id: number;
  idUser: number;
  title: string;
  description: string;
  imageUrl?: string;
  makeReload: () => void;
}

const AppDetailsHeader = (props: AppDetailsHeaderProps) => {
  const [isOwner, setOwner] = React.useState<boolean>(false);
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);
  const [openAddToCockpitDialog, setOpenAddToCockpitDialog] = React.useState<
    boolean
  >(false);
  const currentUser: User = useSelector(
    (state: RootState) => state.userReducer.user
  );
  const classes = headerStyles();
  const matches = useMediaQuery("(min-width:800px)");
  const history = useHistory();

  const handleDeleteClick = async () => {
    const response = await apiCall(
      `${APPSTORE_URL}${props.id}`,
      RequestType.DELETE
    );

    if (response.isError) {
      return;
    }

    history.push("/");
  };

  const addToCockpit = () => {
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

  React.useEffect(() => {
    if (
      currentUser.role === UserType.Admin ||
      (currentUser.role === UserType.Developer &&
        currentUser.id === props.idUser)
    ) {
      setOwner(true);
    } else {
      setOwner(false);
    }
  }, [currentUser, props.idUser, props.id]);

  return (
    <>
      <AddNewTaskDialog
        open={openAddToCockpitDialog}
        handleCloseDialog={onAddToCockpitClose}
        idApp={props.id}
        showSnackbar={handleSnackbarShow}
      />
      <Grid
        item
        container
        alignItems="center"
        direction="column"
        className={classes.header}
      >
        <Grid item xs={12}>
          <Typography variant="h4">{props.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Avatar
            alt={props.title}
            variant="square"
            src={props.imageUrl}
            className={matches ? classes.icon : classes.iconSmall}
          />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">{props.description}</Typography>
        </Grid>
        <Grid item container xs={12} justify="center">
          {isOwner && (
            <>
              <AppForm
                isEdit={true}
                idApp={props.id}
                nameApp={props.title}
                descriptionApp={props.description}
                makeReload={props.makeReload}
              />
              <Button
                variant="contained"
                startIcon={<DeleteForever />}
                className={classes.deleteButton}
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </>
          )}
        </Grid>
        <Grid item container xs={12} justify="center">
          <Button
            variant="contained"
            className={classes.addButton}
            onClick={addToCockpit}
          >
            Add to cockpit
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnack}
        message={`Added task to ${props.title}`}
        onClose={handleSnackClose}
        autoHideDuration={5000}
      />
    </>
  );
};

export default AppDetailsHeader;
