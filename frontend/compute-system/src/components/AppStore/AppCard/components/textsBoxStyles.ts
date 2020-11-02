import { createStyles, makeStyles, Theme } from "@material-ui/core";

const textsBoxStyles = makeStyles((theme: Theme) =>
  createStyles({
    textBox: {
      marginLeft: theme.spacing(2),
      width: "750px",
    },
    updatedText: {
      marginBottom: theme.spacing(1),
    },
  })
);

export default textsBoxStyles;
