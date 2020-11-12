import { createStyles, makeStyles, Theme } from "@material-ui/core";

const editAppStyles = makeStyles((theme: Theme) =>
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
  })
);

export default editAppStyles;
