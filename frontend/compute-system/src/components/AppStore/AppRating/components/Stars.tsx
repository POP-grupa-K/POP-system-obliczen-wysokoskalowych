import * as React from "react";
import { Star, StarBorder, StarHalf } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import StarsStyles from "./starsStyles";

interface StarsProps {
  rate: number;
}

const Stars = (props: StarsProps) => {
  const classes = StarsStyles();
  var stars = new Array(10);

  for (var i = 0; i < 5; i++) {
    if (i < Math.floor(props.rate)) {
      stars[i] = <Star key={i} className={classes.stars} />;
    } else if (props.rate - Math.floor(props.rate) > 0 && i < props.rate) {
      stars[i] = <StarHalf key={i} className={classes.stars} />;
    } else {
      stars[i] = <StarBorder key={i} className={classes.stars} />;
    }
  }

  return <Grid item>{stars}</Grid>;
};

export default Stars;
