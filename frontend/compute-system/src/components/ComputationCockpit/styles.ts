import { createStyles, makeStyles, Theme } from "@material-ui/core";

const cockpitStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      width: "35px",
      height: "35px",
      color: theme.palette.tertiary.main,
    },
  })
);

export default cockpitStyles;
