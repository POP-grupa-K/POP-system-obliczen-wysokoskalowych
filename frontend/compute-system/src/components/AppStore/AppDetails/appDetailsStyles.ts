import { createStyles, makeStyles, Theme } from "@material-ui/core";

const appDetailsStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      width: "150px",
      height: "150px",
    },
    root: {
      backgroundColor: theme.palette.backgroundColor.main,
    },
  })
);

export default appDetailsStyles;
