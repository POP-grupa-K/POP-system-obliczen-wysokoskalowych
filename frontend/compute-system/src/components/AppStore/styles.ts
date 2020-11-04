import { makeStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core";

export const appStoreStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      overflow: "hidden",
    },
  })
);