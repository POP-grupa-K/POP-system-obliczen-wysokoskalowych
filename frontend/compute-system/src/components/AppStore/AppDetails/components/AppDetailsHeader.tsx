import * as React from "react";
import { Typography, Grid, useMediaQuery, Button } from "@material-ui/core";
import { PanoramaOutlined } from "@material-ui/icons";
import appDetailsStyles from "../appDetailsStyles";

interface AppDetailsHeaderProps {
  title: string;
  description: string;
}

const AppDetailsHeader = (props: AppDetailsHeaderProps) => {
  const classes = appDetailsStyles();
  const matches = useMediaQuery("(min-width:800px)");

  return (
    <Grid
      item
      container
      alignItems="center"
      direction={matches ? "row" : "column"}
      className={classes.header}
    >
      <Grid item xs={matches ? 3 : 12}>
        <Typography variant="h4">{props.title}</Typography>
        <PanoramaOutlined
          className={matches ? classes.icon : classes.iconSmall}
        />
      </Grid>
      <Grid item xs={matches ? 8 : 10}>
        <Typography variant="body1">{props.description}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained">Edit</Button>
        <Button variant="contained" color="secondary">
          Delete
        </Button>
      </Grid>
    </Grid>
  );
};

export default AppDetailsHeader;
