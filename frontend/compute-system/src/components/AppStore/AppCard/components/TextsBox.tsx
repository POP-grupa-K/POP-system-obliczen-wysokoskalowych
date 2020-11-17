import { Grid, Typography } from "@material-ui/core";
import * as React from "react";
import textsBoxStyles from "./textsBoxStyles";

interface TextsBoxProps {
  title: string;
  updatedDate: string;
  description: string;
}

const TextsBox = (props: TextsBoxProps) => {
  const classes = textsBoxStyles();

  return (
    <Grid
      item
      container
      direction="column"
      wrap="nowrap"
      className={classes.textBox}
    >
      <Grid item>
        <Typography variant="h5">
          {props.title && props.title.length > 24
              ? `${props.title.substring(0, 21)}...`
              : props.title}
        </Typography>
      </Grid>
      <Grid item className={classes.updatedText}>
        <Typography variant="body1">{`Updated on ${props.updatedDate}`}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption">
          {props.description && props.description.length > 135
            ? `${props.description.substring(0, 132)}...`
            : props.description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TextsBox;
