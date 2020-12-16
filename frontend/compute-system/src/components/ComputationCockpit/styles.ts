import { createStyles, makeStyles, Theme } from "@material-ui/core";

const cockpitStyles = makeStyles((theme: Theme) =>
  createStyles({
    summary: {
      alignItems: "center",
    },
    icon: {
      color: theme.palette.tertiary.main,
    },
    button: {
      marginLeft: "auto",
    },
  })
);

export default cockpitStyles;
