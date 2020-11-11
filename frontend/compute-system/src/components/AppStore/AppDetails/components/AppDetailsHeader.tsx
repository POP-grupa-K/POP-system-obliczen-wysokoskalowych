import * as React from "react";
import { Typography, Grid, Button, useMediaQuery } from "@material-ui/core";
import { PanoramaOutlined, DeleteForever, Edit } from "@material-ui/icons";
import headerStyles from "./HeaderStyles";

interface AppDetailsHeaderProps {
  title: string;
  description: string;
}

const AppDetailsHeader = (props: AppDetailsHeaderProps) => {
  const classes = headerStyles();
  const matches = useMediaQuery("(min-width:800px)");

  return (
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
        <PanoramaOutlined
          className={matches ? classes.icon : classes.iconSmall}
        />
      </Grid>
      <Grid item xs={10}>
        <Typography variant="body1">{props.description}</Typography>
      </Grid>
      <Grid item container xs={12} justify="center">
        <Button
          variant="contained"
          startIcon={<Edit />}
          className={classes.editButton}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteForever />}
          className={classes.deleteButton}
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
