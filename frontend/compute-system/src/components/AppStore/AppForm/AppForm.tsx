import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Edit, AddCircle } from "@material-ui/icons";
import AppFormStyles from "./AppFormStyles";
import apiCall from "../../../api/apiCall";
import AppCardData, {
  initialAppCardData,
} from "../AppCard/interfaces/appCardData";
import { APPSTORE_URL } from "../../../api/urls";
import RequestType from "../../../api/requestType";
import { useHistory } from "react-router-dom";

interface AppFormProps {
  isEdit: boolean;
  idApp?: number;
  nameApp?: string;
  descriptionApp?: string;
}

const AppForm = (props: AppFormProps) => {
  const classes = AppFormStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [descriptionValid, setValid] = React.useState<boolean>(true);
  const [appName, setAppName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const { nameApp, descriptionApp } = props;
  React.useEffect(() => {
    setAppName(nameApp ? nameApp : "");
    setDescription(descriptionApp ? descriptionApp : "");
  }, [nameApp, descriptionApp]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEdit = async () => {
    const editAppCard: AppCardData = initialAppCardData;
    editAppCard.nameApp = appName;
    editAppCard.descriptionApp = description;
    editAppCard.dateUpdate = new Date().toISOString();

    const response = await apiCall<AppCardData>(
      `${APPSTORE_URL}${props.idApp}`,
      RequestType.PUT,
      editAppCard
    );

    if (response.isError) {
      return;
    }

    setOpen(false);
  };

  const handleAdd = async () => {
    if (!props.isEdit) {
      setAppName("");
      setDescription("");
    }

    const addAppCard: AppCardData = initialAppCardData;
    addAppCard.nameApp = appName;
    addAppCard.descriptionApp = description;
    addAppCard.dateUpdate = new Date().toISOString();

    const respose = await apiCall<AppCardData>(
      APPSTORE_URL,
      RequestType.POST,
      addAppCard
    );

    if (respose.isError) {
      return;
    }

    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setDescription(props.descriptionApp ? props.descriptionApp : "");
    setAppName(props.nameApp ? props.nameApp : "");
  };

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    var descriptionValue = event.target.value;
    if (descriptionValue.length > 5000) {
      setValid(false);
    } else {
      setValid(true);
    }
    setDescription(descriptionValue);
  };

  const handleNameApp = (event: React.ChangeEvent<HTMLInputElement>) => {
    var nameAppValue = event.target.value;
    setAppName(nameAppValue);
  };

  return (
    <>
      {props.isEdit ? (
        <Button
          variant="contained"
          startIcon={<Edit />}
          className={classes.editButton}
          onClick={handleClickOpen}
        >
          Edit
        </Button>
      ) : (
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          className={classes.editButton}
          onClick={handleClickOpen}
        >
          Add
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {props.isEdit ? "Edit app" : "Add app"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="App name"
            fullWidth
            value={appName}
            onChange={handleNameApp}
          />
          <TextField
            error={!descriptionValid}
            variant="outlined"
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={6}
            helperText={descriptionValid ? "" : "Description is too long!"}
            value={description}
            onChange={handleDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={props.isEdit ? handleEdit : handleAdd}
            color="primary"
          >
            {props.isEdit ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppForm;
