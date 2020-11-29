import {
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { DeleteForever, Edit } from "@material-ui/icons";
import * as React from "react";
import { useSelector } from "react-redux";
import apiCall from "../../../api/apiCall";
import RequestType from "../../../api/requestType";
import { APPSTORE_URL } from "../../../api/urls";
import { User } from "../../../mocks/common/mockUsers";
import RootState from "../../../redux/rootState";
import ratingStyles from "./appRatingStyles";
import Stars from "./components/Stars";
import IAppRating from "./interfaces/appRating";

interface AppRatingProps {
  idApp?: number;
  idRating?: number;
  userCommented: boolean;
  idUser: number;
  value: number;
  comm: string;
  setCommented: (isComment: IAppRating | undefined) => void;
  makeReload: () => void;
}

const AppRating = (props: AppRatingProps) => {
  const classes = ratingStyles();
  const matches = useMediaQuery("(min-width:525px)");
  const [isEditMode, setEditMode] = React.useState(false);
  const [commentValid, setValid] = React.useState(true);
  const [rate, editRate] = React.useState(props.value);
  const [rateChanged, setChangedRate] = React.useState(rate);
  const [comment, editComment] = React.useState(props.comm);
  const [commentChanged, setChangedComment] = React.useState(comment);
  const currentUser: User = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const changeEditMode = () => {
    setEditMode(!isEditMode);
  };

  const deleteComment = async () => {
    const response = await apiCall(
      `${APPSTORE_URL}rating/${props.idRating}`,
      RequestType.DELETE
    );
    if (response.isError) {
      return;
    }

    props.setCommented(undefined);
    props.makeReload();
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
    if (value <= 5 && value >= 0) editRate(value);
  };

  const cancelChange = () => {
    setEditMode(!isEditMode);
    editComment(commentChanged);
    editRate(rateChanged);
  };

  const submitChange = async () => {
    setEditMode(false);
    const editComment: IAppRating = {
      comm: comment,
      value: rate,
      idUser: currentUser.id,
    };
    const response = await apiCall(
      `${APPSTORE_URL}rating/${props.idRating}`,
      RequestType.PUT,
      editComment
    );
    if (response.isError) {
      return;
    }
    setChangedComment(comment);
    setChangedRate(rate);
    props.makeReload();
  };
  const { comm, value } = props;

  React.useEffect(() => {
    setChangedComment(comm);
    setChangedRate(value);
  }, [comm, value]);

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
              inputProps={{ step: "0.5" }}
              value={rate}
              className={classes.number}
              onChange={changeRate}
            />
            <Stars rate={rate} />
          </Grid>
        ) : (
          <Grid item container xs={10}>
            <Typography variant="h6" className={classes.blueText}>
              {rateChanged}/5
            </Typography>
            <Stars rate={rateChanged} />
          </Grid>
        )}
        {props.userCommented && !isEditMode && (
          <Grid item>
            <Edit onClick={changeEditMode} className={classes.editComment} />
            <DeleteForever
              onClick={deleteComment}
              className={classes.deleteComment}
            />
          </Grid>
        )}
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
