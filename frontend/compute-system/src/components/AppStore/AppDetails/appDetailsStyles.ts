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
    buttonEdit: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      width: "25px",
      height: "25px",
      color: theme.palette.tertiary.main,
      "&:hover": {
        color: theme.palette.tertiary.dark,
        cursor: "pointer",
      },
    },
    buttonDelete: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      width: "25px",
      height: "25px",
      color: theme.palette.secondary.main,
      "&:hover": {
        color: theme.palette.secondary.dark,
        cursor: "pointer",
      },
    },
  })
);

export default appDetailsStyles;
