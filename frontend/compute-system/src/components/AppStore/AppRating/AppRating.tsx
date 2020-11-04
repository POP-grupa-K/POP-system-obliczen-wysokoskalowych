import * as React from "react";
import { Typography, Grid, useMediaQuery } from "@material-ui/core";
import ratingSyles from "./appRatingStyles";
import { Star, StarBorder, StarHalf } from "@material-ui/icons";

interface AppRatingProps {
    rate: number,
    description: string
}

const AppRating = (props: AppRatingProps) => {
    const classes = ratingSyles();
    const matches = useMediaQuery('(min-width:700px)');

    var stars = new Array(10);

    for (var i = 0; i < 10; i++) {
        if (i < Math.floor(props.rate)) {
            stars[i] = <Star className={classes.stars} />;
        } else if (props.rate - Math.floor(props.rate) > 0 && i < props.rate) {
            stars[i] = <StarHalf className={classes.stars} />;
        } else {
            stars[i] = <StarBorder className={classes.stars} />;
        }
    }

    return (
        <Grid container alignItems="center" className={classes.grid}>
            <Grid item container alignItems="center" className={classes.header}>
                <Grid item xs={matches ? 1 : 2}>
                    <Typography variant="h6" className={classes.rateValue}>{props.rate}/10</Typography>
                </Grid>
                <Grid item>
                    {stars}
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.comment}>
                <Typography variant="body1">{props.description}</Typography>
            </Grid>
        </Grid>
    );
};

export default AppRating;