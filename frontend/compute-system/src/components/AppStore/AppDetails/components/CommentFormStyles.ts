import { createStyles, makeStyles, Theme } from "@material-ui/core";

const commentFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      margin: "4px 0px 4px 0px",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      borderRadius: "16px",
      borderWidth: "2px",
      borderColor: theme.palette.backgroundColor.dark,
      borderStyle: "solid",
      maxWidth: "800px",
    },
    comment: {
      width: "100%",
      maxWidth: "800px",
    },
    number: {
      minWidth: "50px",
    },
    commentButton: {
      width: "140px",
      marginRight: "0",
      marginLeft: "auto",
    },
    buttonContainer: {
      width: "100%",
      maxWidth: "815px",
    },
  })
);

export default commentFormStyles;
