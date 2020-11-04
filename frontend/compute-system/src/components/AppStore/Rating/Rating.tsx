import * as React from "react";
import { Typography, Grid } from "@material-ui/core";
import ratingSyles from "./ratingStyles";
import { Star, StarBorder, StarHalf } from "@material-ui/icons";

interface RatingProps {
    rate: number,
    description: string
}

const Rating = (props: RatingProps) =>{
    const classes = ratingSyles();

    return (
        <Grid container alignItems="center" className={classes.grid}>
            <Grid item container xs={12} alignItems="baseline" className={classes.header}>
                <Grid item xs={2}>
                    <Typography variant="h6" className={classes.rateValue}>{props.rate}/10</Typography>
                </Grid>
                <Grid item xs={10}>
                    Stars
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.comment}>
                <Typography variant="body1">{props.description}</Typography>
            </Grid>
        </Grid>
    );
};

export default Rating;