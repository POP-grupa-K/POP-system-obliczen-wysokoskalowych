import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { drawerWidth } from "../../const/values";

export const toolbarStyle = (theme: Theme) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  };
};

export const rootStyle = () => {
  return { display: "flex" };
};

export const contentStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: toolbarStyle(theme),
  })
);

export const navDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: rootStyle(),
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
  })
);

export const topBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
  })
);

export const navigationStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: rootStyle(),
    toolbar: toolbarStyle(theme),
  })
);
