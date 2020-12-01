import { TextField, Container, Button, Grid } from "@material-ui/core";
import * as React from "react";
import apiCall from "../../../../api/apiCall";
import RequestType from "../../../../api/requestType";
import { APPSTORE_URL } from "../../../../api/urls";
import Stars from "../../AppRating/components/Stars";
import IAppRating from "../../AppRating/interfaces/appRating";
import commentFormStyles from "./CommentFormStyles";
import { User } from "../../../../mocks/common/mockUsers";
import { useSelector } from "react-redux";
import RootState from "../../../../redux/rootState";

interface CommentFormProps {
  appId: string;
  setCommented: (isComment: IAppRating) => void;
  makeReload: () => void;
}

const CommentForm = (props: CommentFormProps) => {
  const classes = commentFormStyles();
  const [rate, setRate] = React.useState(5);
  const [comment, setComment] = React.useState("");
  const [commentValid, setValid] = React.useState(true);
  const currentUser: User = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var value = Number(event.target.value);
    if (value <= 5 && value >= 0) setRate(value);
  };

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    var commentValue = event.target.value;
    if (commentValue.length > 5000) {
      setValid(false);
    } else {
      setValid(true);
    }
    setComment(commentValue);
  };

  const handleSubmit = async () => {
    if (!commentValid) {
      return;
    }

    const newRating: IAppRating = {
      comm: comment,
      value: rate,
      idUser: currentUser.id,
    };

    const response = await apiCall(
      `${APPSTORE_URL}${props.appId}/rate`,
      RequestType.POST,
      newRating
    );
    if (response.isError) {
      return;
    }

    props.setCommented(newRating);
    props.makeReload();
  };

  return (
    <Container>
      <form>
        <Grid
          item
          container
          alignItems="center"
          spacing={2}
          className={classes.formContainer}
        >
          <Grid item xs={2}>
            <TextField
              required
              label="Rate"
              type="number"
              value={rate}
              className={classes.number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={10}>
            <Stars rate={rate} />
          </Grid>
          <Grid item xs={12}>
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
              rowsMax={6}
              className={classes.comment}
              onChange={handleComment}
              value={comment}
            />
          </Grid>
          <Grid item container xs={12} className={classes.buttonContainer}>
            <Button
              variant="contained"
              className={classes.commentButton}
              onClick={handleSubmit}
            >
              Add comment
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CommentForm;
