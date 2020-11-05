import * as React from "react";
import { Typography, Grid, useMediaQuery } from "@material-ui/core";
import ratingStyles from "./appRatingStyles";
import Stars from "./components/Stars";

interface AppRatingProps {
    rate: number,
    description: string
}

const AppRating = (props: AppRatingProps) => {
    const classes = ratingStyles();
    const matches = useMediaQuery('(min-width:700px)');

    return (
        <Grid container alignItems="center" className={classes.grid}>
            <Grid item container alignItems="center" className={classes.header}>
                <Grid item xs={matches ? 1 : 2}>
                    <Typography variant="h6" className={classes.rateValue}>{props.rate}/10</Typography>
                </Grid>
                <Stars rate={props.rate} />
            </Grid>
            <Grid item xs={12} className={classes.comment}>
                <Typography variant="body1">{props.description}</Typography>
            </Grid>
        </Grid>
    );
};

export default AppRating;