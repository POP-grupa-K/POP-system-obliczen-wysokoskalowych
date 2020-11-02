import { createStyles, makeStyles, Theme } from "@material-ui/core";

const appCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.backgroundColor.light,
      maxWidth: "578px",
      padding: theme.spacing(2),
    },
    icon: {
      width: "100px",
      height: "100px",
      color: "#727272",
    },
    addButton: {
      color: theme.palette.tertiary.contrastText,
      backgroundColor: theme.palette.tertiary.main,
      "&:hover": {
        backgroundColor: theme.palette.tertiary.dark,
      },
    },
    usedRateBox: {
      marginBottom: theme.spacing(2),
    },
  })
);

export default appCardStyles;
