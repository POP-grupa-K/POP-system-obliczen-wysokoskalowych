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

interface AppFormProps {
  isEdit: boolean;
  idApp?: number;
  nameApp?: string;
  descriptionApp?: string;
}

const AppForm = (props: AppFormProps) => {
  const classes = AppFormStyles();
  const [open, setOpen] = React.useState(false);
  const [descriptionValid, setValid] = React.useState(true);
  const [nameApp, setNameApp] = React.useState(
    props.nameApp ? props.nameApp : ""
  );
  const [description, setDescription] = React.useState(
    props.descriptionApp ? props.descriptionApp : ""
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEdit = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setOpen(false);

    if (!props.isEdit) {
      setNameApp("");
      setDescription("");
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setDescription(props.descriptionApp ? props.descriptionApp : "");
    setNameApp(props.nameApp ? props.nameApp : "");
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
    setNameApp(nameAppValue);
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
            value={nameApp}
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
