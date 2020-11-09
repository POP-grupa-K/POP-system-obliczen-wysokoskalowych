import * as React from "react";
import {
  Typography,
  Grid,
  useMediaQuery,
  Button,
  TextField,
} from "@material-ui/core";
import ratingStyles from "./appRatingStyles";
import Stars from "./components/Stars";
import { DeleteForever, Edit } from "@material-ui/icons";

interface AppRatingProps {
  id: number;
  userCommented: boolean;
  uid: number;
  rate: number;
  comment: string;
  setCommented: (isComment: boolean) => void;
}

const AppRating = (props: AppRatingProps) => {
  const classes = ratingStyles();
  const matches = useMediaQuery("(min-width:525px)");
  const [isEditMode, setEditMode] = React.useState(false);
  const [commentValid, setValid] = React.useState(true);
  const [rate, editRate] = React.useState(props.rate);
  const [rateChanged, setChangedRate] = React.useState(rate);
  const [comment, editComment] = React.useState(props.comment);
  const [commentChanged, setChangedComment] = React.useState(comment);

  const changeEditMode = () => {
    setEditMode(!isEditMode);
  };

  const deleteComment = () => {
    props.setCommented(false);
  };

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    var commentValue = event.target.value;
    if (commentValue.length > 5000) {
      setValid(false);
    } else {
      setValid(true);
    }
    editComment(commentValue);
  };

  const changeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
    var value = Number(event.target.value);
    if (value <= 10 && value >= 0) editRate(value);
  };

  const cancelChange = () => {
    setEditMode(!isEditMode);
    editComment(commentChanged);
    editRate(rateChanged);
  };

  const submitChange = () => {
    setEditMode(false);
    setChangedComment(comment);
    setChangedRate(rate);
  };

  return (
    <Grid container alignItems="center" className={classes.grid}>
      <Grid
        item
        container
        alignItems="center"
        justify={props.userCommented ? "space-between" : undefined}
        className={matches ? classes.header : classes.headerSmallWindow}
      >
        {isEditMode ? (
          <Grid item container xs={10}>
            <TextField
              label="Rate"
              type="number"
              value={rate}
              className={classes.number}
              onChange={changeRate}
            />
            <Stars rate={rate} />
          </Grid>
        ) : (
          <Grid item container xs={10}>
            <Typography variant="h6" className={classes.blueText}>
              {rateChanged}/10
            </Typography>
            <Stars rate={rateChanged} />
          </Grid>
        )}

        {props.userCommented && !isEditMode ? (
          <Grid item>
            <Edit onClick={changeEditMode} className={classes.editComment} />
            <DeleteForever
              onClick={deleteComment}
              className={classes.deleteComment}
            />
          </Grid>
        ) : null}
      </Grid>
      {!isEditMode ? (
        <Grid item xs={12} className={classes.comment}>
          <Typography variant="body1">{commentChanged}</Typography>
        </Grid>
      ) : (
        <>
          <Grid item xs={12} className={classes.comment}>
            <TextField
              error={!commentValid}
              label="Comment"
              helperText={
                commentValid
                  ? ""
                  : "Your comment is too long, max length is 5000 characters."
              }
              variant="outlined"
              multiline
              rowsMax={3}
              className={classes.textField}
              onChange={handleComment}
              value={comment}
            />
          </Grid>
          <Grid item container justify="space-between">
            <Grid item></Grid>
            <Grid item>
              <Button color="secondary" onClick={cancelChange}>
                Cancel
              </Button>
              <Button className={classes.blueText} onClick={submitChange}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default AppRating;
