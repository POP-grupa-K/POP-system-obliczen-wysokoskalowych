import { createStyles, makeStyles, Theme } from "@material-ui/core";

const appFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    editButton: {
      margin: "5px",
      width: "100px",
      color: theme.palette.tertiary.contrastText,
      backgroundColor: theme.palette.tertiary.main,
      "&:hover": {
        backgroundColor: theme.palette.tertiary.dark,
      },
    },
    addIcon: {
      position: "fixed",
      bottom: "5px",
      right: "5px",
      width: "50px",
      height: "50px",
      color: theme.palette.tertiary.main,
      "&:hover": {
        color: theme.palette.tertiary.dark,
        cursor: "pointer",
      },
    },
  })
);

export default appFormStyles;
