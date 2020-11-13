import { createStyles, makeStyles, Theme } from "@material-ui/core";

const ratingStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      maxWidth: "800px",
      borderRadius: "10px",
      boxShadow: "2px 2px 7px #888888",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
    header: {
      backgroundColor: theme.palette.backgroundColor.dark,
      height: "60px",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
      padding: theme.spacing(2),
      borderBottomWidth: "1px",
      borderBottomColor: "black",
      borderBottomStyle: "solid",
    },
    headerSmallWindow: {
      backgroundColor: theme.palette.backgroundColor.dark,
      height: "100px",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
      padding: theme.spacing(2),
      borderBottomWidth: "1px",
      borderBottomColor: "black",
      borderBottomStyle: "solid",
    },
    comment: {
      backgroundColor: theme.palette.backgroundColor.main,
      borderBottomLeftRadius: "10px",
      borderBottomRightRadius: "10px",
      minHeight: "100px",
      padding: theme.spacing(2),
    },
    blueText: {
      color: theme.palette.primary.main,
    },
    editComment: {
      color: theme.palette.tertiary.main,
      "&:hover": {
        cursor: "pointer",
      },
    },
    deleteComment: {
      color: theme.palette.secondary.main,
      "&:hover": {
        cursor: "pointer",
      },
    },
    textField: {
      width: "100%",
      height: "100px",
    },
    number: {
      width: "50px",
      transform: "translateY(-15px)",
    },
  })
);

export default ratingStyles;
