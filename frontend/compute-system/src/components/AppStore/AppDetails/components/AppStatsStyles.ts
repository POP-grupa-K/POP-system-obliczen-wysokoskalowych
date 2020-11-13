import { createStyles, makeStyles, Theme } from "@material-ui/core";

const appStatsStyles = makeStyles((theme: Theme) =>
  createStyles({
    usageRateBox: {
      minWidth: "125px",
    },
  })
);

export default appStatsStyles;
