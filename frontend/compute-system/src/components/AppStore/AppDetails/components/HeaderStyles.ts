import { createStyles, makeStyles, Theme } from "@material-ui/core";

const headerStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      width: "150px",
      height: "150px",
    },
    iconSmall: {
      width: "100px",
      height: "100px",
    },
    header: {
      backgroundColor: theme.palette.backgroundColor.dark,
    },
    editButton: {
      margin: "5px",
      width: "100px",
      color: theme.palette.tertiary.contrastText,
      backgroundColor: theme.palette.tertiary.main,
      "&:hover": {
        backgroundColor: theme.palette.tertiary.dark,
      },
    },
    deleteButton: {
      margin: "5px",
      width: "100px",
      color: theme.palette.white.main,
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
      },
    },
    addButton: {
      margin: "5px",
      color: theme.palette.tertiary.contrastText,
      backgroundColor: theme.palette.tertiary.main,
      "&:hover": {
        backgroundColor: theme.palette.tertiary.dark,
      },
    },
  })
);

export default headerStyles;
