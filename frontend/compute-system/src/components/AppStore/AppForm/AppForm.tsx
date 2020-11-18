import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
} from "@material-ui/core";
import { AddCircle, DeleteForever, Edit } from "@material-ui/icons";
import AppFormStyles from "./AppFormStyles";
import apiCall from "../../../api/apiCall";
import AppCardData, {
  initialAppCardData,
} from "../AppCard/interfaces/appCardData";
import { APPSTORE_URL } from "../../../api/urls";
import RequestType from "../../../api/requestType";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { createAppImageUrl } from "../../../api/apiUtils";
import Divider from "@material-ui/core/Divider";

interface AppFormProps {
  isEdit: boolean;
  idApp?: number;
  nameApp?: string;
  descriptionApp?: string;
  makeReload: () => void;
}

const AppForm = (props: AppFormProps) => {
  const classes = AppFormStyles();
  const [open, setOpen] = React.useState(false);
  const [descriptionValid, setDescritpionValid] = React.useState<boolean>(true);
  const [nameGivenValid, setNameGivenValid] = React.useState<boolean>(true);
  const [nameLenghtValid, setNameLenghtValid] = React.useState<boolean>(true);
  const [appName, setAppName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [appImage, setAppImage] = React.useState<File>();
  const [openSnack, setSnackOpen] = React.useState<boolean>(false);
  const [snackAppName, setSnackAppName] = React.useState<string>("");

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

    if (appName === "") {
      setNameGivenValid(false);
      return;
    }

    const response = await apiCall<AppCardData>(
      `${APPSTORE_URL}${props.idApp}`,
      RequestType.PUT,
      editAppCard
    );

    if (response.isError) {
      return;
    }

    setOpen(false);
    props.makeReload();
  };

  const handleAdd = async () => {
    if (!props.isEdit) {
      setSnackAppName(appName);
      setAppName("");
      setDescription("");
    }

    if (appName === "") {
      setNameGivenValid(false);
      return;
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
    setSnackOpen(true);
    props.makeReload();
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setDescription(props.descriptionApp ? props.descriptionApp : "");
    setAppName(props.nameApp ? props.nameApp : "");
    setAppImage(undefined);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    var descriptionValue = event.target.value;
    if (descriptionValue.length > 5000) {
      setDescritpionValid(false);
    } else {
      setDescritpionValid(true);
    }
    setDescription(descriptionValue);
  };

  const handleNameApp = (event: React.ChangeEvent<HTMLInputElement>) => {
    var nameAppValue = event.target.value;
    if (!nameAppValue) {
      setNameGivenValid(false);
    } else if (nameAppValue.length > 50) {
      setNameLenghtValid(false);
    } else {
      setNameGivenValid(true);
      setNameLenghtValid(true);
    }
    setAppName(nameAppValue);
  };

  const handleAppImageUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (props.idApp == null) {
      return;
    }
    const formData = new FormData();
    // @ts-ignore
    formData.append("image", appImage);
    fetch(createAppImageUrl(props.idApp), {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (props.idApp == null) {
        return;
      }
      if (response.status === 409) {
        fetch(createAppImageUrl(props.idApp), {
          method: "PUT",
          body: formData,
        });
      }
    });
    props.makeReload();
    setOpen(false);
  };

  const handleAppImageDelete = () => {
    if (props.idApp == null) {
      return;
    }
    apiCall(createAppImageUrl(props.idApp), RequestType.DELETE);
    props.makeReload();
    setOpen(false);
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
          <Card className={classes.card}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                Upload app avatar
              </Typography>
              <form onSubmit={handleAppImageUpload}>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    if (e.target.files != null) {
                      setAppImage(e.target.files[0]);
                    }
                  }}
                />
                <Button type="submit">Upload</Button>
              </form>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                Delete app avatar
              </Typography>
              <Button
                variant="contained"
                startIcon={<DeleteForever />}
                color="secondary"
                onClick={handleAppImageDelete}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
          <Divider />
          <TextField
            autoFocus
            error={!nameGivenValid || !nameLenghtValid}
            helperText={
              nameGivenValid && nameLenghtValid
                ? ""
                : nameGivenValid
                ? "Name is too long!"
                : "Name is not given!"
            }
            variant="outlined"
            margin="dense"
            id="name"
            label="App name"
            fullWidth
            value={appName}
            required={true}
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnack}
        message={`App added ${snackAppName}`}
        onClose={handleSnackClose}
        autoHideDuration={5000}
      />
    </>
  );
};

export default AppForm;
