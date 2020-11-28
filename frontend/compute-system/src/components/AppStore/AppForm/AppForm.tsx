import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { AddCircle, DeleteForever, Edit } from "@material-ui/icons";
import AppFormStyles from "./AppFormStyles";
import apiCall from "../../../api/apiCall";
import {
  AppCardData,
  initialAppCardData,
} from "../AppCard/interfaces/appCardData";
import { APPSTORE_URL } from "../../../api/urls";
import RequestType from "../../../api/requestType";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { createAppImageUrl } from "../../../api/apiUtils";
import Divider from "@material-ui/core/Divider";
import { IMessageResponse } from "../../../api/iApiResponse";

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
  const [helperText, setHelperText] = React.useState<string>("");
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
      setHelperText("Name is not given");
      return;
    }

    const response = await apiCall<AppCardData>(
      `${APPSTORE_URL}${props.idApp}`,
      RequestType.PUT,
      editAppCard
    );

    if (response.isError) {
      const error = response.content as Error;
      if (error.message === "409") {
        setHelperText("Name is already taken");
      }
      return;
    }

    handleAppImageUpload(props.idApp!!);
  };

  const handleAdd = async () => {
    if (appName === "") {
      setHelperText("Name is not given");
      return;
    }

    const addAppCard: AppCardData = initialAppCardData;
    addAppCard.nameApp = appName;
    addAppCard.descriptionApp = description;
    addAppCard.dateUpdate = new Date().toISOString();

    const response = await apiCall<AppCardData | IMessageResponse>(
      APPSTORE_URL,
      RequestType.POST,
      addAppCard
    );

    if (response.isError) {
      const error = response.content as Error;
      if (error.message === "409") {
        setHelperText("Name is already taken");
      }
      return;
    }

    if (!props.isEdit) {
      setSnackAppName(appName);
      setAppName("");
      setDescription("");
    }

    setSnackOpen(true);
    var resp = response.content as IMessageResponse;
    handleAppImageUpload(resp.message as number);
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
      setHelperText("Name is not given");
    } else if (nameAppValue.length > 50) {
      setHelperText("Name is too long");
    } else {
      setHelperText("");
    }
    setAppName(nameAppValue);
  };

  const handleAppImageUpload = (id: number) => {
    if (id == null) {
      setOpen(false);
      props.makeReload();
      return;
    }

    const formData = new FormData();
    // @ts-ignore
    formData.append("image", appImage);
    fetch(createAppImageUrl(id), {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (id == null) {
        return;
      }
      if (response.status === 409) {
        fetch(createAppImageUrl(id), {
          method: "PUT",
          body: formData,
        });
      }
    });
    setOpen(false);
    props.makeReload();
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
              <form>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    if (e.target.files != null) {
                      setAppImage(e.target.files[0]);
                    }
                  }}
                />
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
            error={helperText.length > 0}
            helperText={helperText}
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
