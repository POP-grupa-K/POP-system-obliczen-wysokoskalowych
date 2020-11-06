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
      height: "80px",
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
    rateValue: {
      color: theme.palette.primary.main,
    },
  })
);

export default ratingStyles;