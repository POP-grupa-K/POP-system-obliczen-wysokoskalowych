import { createStyles, makeStyles, Theme } from "@material-ui/core";

const appStatsStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      display: "inline",
      textWidth: "150px",
    },
    value: {
      display: "inline",
      width: "180px",
    },
    usageRateBox: {
      minWidth: "125px",
    },
  })
);

export default appStatsStyles;
