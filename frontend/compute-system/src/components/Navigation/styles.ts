import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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

export const topBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    userID: {
      marginLeft: "auto",
      width: "110px",
    },
    select: {
      color: theme.palette.white.main,
      "&:before": {
        borderColor: theme.palette.white.main,
      },
      "&:after": {
        borderColor: theme.palette.white.main,
      },
    },
    icon: {
      fill: theme.palette.white.main,
    },
  })
);

export const navigationStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: rootStyle(),
    toolbar: toolbarStyle(theme),
    navLink: {
      textDecoration: "none",
      color: theme.palette.text.secondary,
      "&.active": {
        color: theme.palette.text.primary,
      },
    },
  })
);
