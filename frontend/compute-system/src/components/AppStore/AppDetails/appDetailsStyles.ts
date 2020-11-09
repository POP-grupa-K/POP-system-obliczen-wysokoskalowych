import { createStyles, makeStyles, Theme } from "@material-ui/core";

const appDetailsStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      backgroundColor: theme.palette.backgroundColor.main,
    },
  })
);

export default appDetailsStyles;
