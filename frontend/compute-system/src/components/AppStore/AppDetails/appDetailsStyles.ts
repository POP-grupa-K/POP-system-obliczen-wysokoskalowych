import { createStyles, makeStyles, Theme } from "@material-ui/core";

const appDetailsStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      width: "150px",
      height: "150px",
    },
    iconSmall: {
      width: "100px",
      height: "100px",
    },
    body: {
      backgroundColor: theme.palette.backgroundColor.main,
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
    editIcon: {
      color: theme.palette.white.main,
      paddingRight: theme.spacing(1),
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
    deleteIcon: {
      color: theme.palette.white.main,
      paddingRight: theme.spacing(1),
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

export default appDetailsStyles;
