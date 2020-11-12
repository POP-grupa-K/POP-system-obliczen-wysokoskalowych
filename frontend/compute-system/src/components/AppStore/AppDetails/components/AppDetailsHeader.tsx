import * as React from "react";
import { Typography, Grid, Button, useMediaQuery } from "@material-ui/core";
import { PanoramaOutlined, DeleteForever } from "@material-ui/icons";
import headerStyles from "./HeaderStyles";
import apiCall from "../../../../api/apiCall";
import { APPSTORE_URL } from "../../../../api/urls";
import RequestType from "../../../../api/requestType";
import { useHistory } from "react-router-dom";
import AppForm from "../../AppForm/AppForm";

interface AppDetailsHeaderProps {
  id: number;
  title: string;
  description: string;
}

const AppDetailsHeader = (props: AppDetailsHeaderProps) => {
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

  return (
    <Grid
      item
      container
      alignItems="center"
      direction="column"
      className={classes.header}
    >
      <Grid item xs={12}>
        <Typography variant="h4">{props.id}</Typography>
      </Grid>
      <Grid item xs={12}>
        <PanoramaOutlined
          className={matches ? classes.icon : classes.iconSmall}
        />
      </Grid>
      <Grid item xs={10}>
        <Typography variant="body1">{props.description}</Typography>
      </Grid>
      <Grid item container xs={12} justify="center">
        <AppForm
          isEdit={true}
          idApp={props.id}
          nameApp={props.title}
          descriptionApp={props.description}
        />
        <Button
          variant="contained"
          startIcon={<DeleteForever />}
          className={classes.deleteButton}
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
      </Grid>
      <Grid item container xs={12} justify="center">
        <Button variant="contained" className={classes.addButton}>
          Add to cockpit
        </Button>
      </Grid>
    </Grid>
  );
};

export default AppDetailsHeader;
