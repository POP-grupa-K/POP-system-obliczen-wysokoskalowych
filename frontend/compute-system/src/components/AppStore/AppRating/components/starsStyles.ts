import { createStyles, makeStyles, Theme } from "@material-ui/core";

const starsStyles = makeStyles((theme: Theme) =>
  createStyles({
    stars: {
      color: theme.palette.sLight.main,
    },
  })
);

export default starsStyles;