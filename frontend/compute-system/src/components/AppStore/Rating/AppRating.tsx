import * as React from "react";
import { Typography, Grid } from "@material-ui/core";
import ratingSyles from "./appRatingStyles";
import { Star, StarBorder, StarHalf } from "@material-ui/icons";

interface AppRatingProps {
    rate: number,
    description: string
}

const AppRating = (props: AppRatingProps) => {
    const classes = ratingSyles();

    var stars = new Array(10);
    var i = 0;
    for (i = 0; i < Math.floor(props.rate); i++) {
        stars[i] = <Star className={classes.stars} />;
    }
    if (props.rate - Math.floor(props.rate) > 0) {
        stars[i++] = <StarHalf className={classes.stars}/>;
    } else {
        stars[i++] = <StarBorder className={classes.stars}/>;
    }
    for (i; i < 10; i++) {
        stars[i] = <StarBorder className={classes.stars}/>;
    }


    return (
        <Grid container alignItems="center" className={classes.grid}>
            <Grid item container xs={12} alignItems="baseline" className={classes.header}>
                <Grid item xs={1} >
                    <Typography variant="h6" className={classes.rateValue}>{props.rate}/10</Typography>
                </Grid>
                <Grid item xs={11}>
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