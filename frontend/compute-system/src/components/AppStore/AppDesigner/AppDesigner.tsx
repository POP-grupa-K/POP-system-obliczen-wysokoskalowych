import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import * as React from "react";
import { JsxElement } from "typescript";
import AppFormStyles from "../AppForm/AppFormStyles";
import AppNode from "./components/AppNode";

const AppDesigner = () => {
  const buttonClasses = AppFormStyles();
  const [appName, setAppName] = React.useState<string>("");
  const [addNewNodeActive, setAddNewNodeActive] = React.useState<boolean>(
    false
  );
  const [description, setDescription] = React.useState<string>("");
  const [helperText, setHelperText] = React.useState<string>("");
  const [descriptionValid, setDescritpionValid] = React.useState<boolean>(true);
  const [currentNodes, setCurrentNodes] = React.useState<JsxElement[]>([]);

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

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    var descriptionValue = event.target.value;
    if (descriptionValue.length > 5000) {
      setDescritpionValid(false);
    } else {
      setDescritpionValid(true);
    }
    setDescription(descriptionValue);
  };

  const handleAddNewNodeClick = () => {
    setAddNewNodeActive(true);
  };

  return (
    <Container maxWidth="lg">
      <Grid container direction="column">
        <Grid xs={6} direction="column">
          <Typography variant="h5" style={{ marginBottom: "8px" }}>
            Create an app
          </Typography>
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
          <Button
            variant="contained"
            startIcon={<Save />}
            className={buttonClasses.editButton}
            style={{ marginLeft: "0px" }}
          >
            Save
          </Button>
        </Grid>
        <Grid container justify="center" alignItems="center">
          <AppNode />
          <Grid>
            {addNewNodeActive ? (
              <AppNode
                formActive={true}
                closeForm={() => {
                  setAddNewNodeActive(false);
                }}
              />
            ) : (
              <Button
                variant="contained"
                className={buttonClasses.editButton}
                onClick={handleAddNewNodeClick}
              >
                Add new node
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppDesigner;
