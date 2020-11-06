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
  })
);

export default appDetailsStyles;
