import React, { ReactNode, ReactNodeArray, useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import StoreIcon from "@material-ui/icons/Store";
import SaveIcon from "@material-ui/icons/Save";
import ComputerIcon from "@material-ui/icons/Computer";
import NavDrawer from "./NavDrawer/NavDrawer";
import TopBar from "./NavDrawer/TopBar";
import NavDrawerLink from "./NavDrawer/NavDrawerLink";
import Content from "./NavDrawer/Content";
import { rootStyle, toolbarStyle } from "./styles";
import { appName } from "../../const/strings";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: rootStyle(),
    toolbar: toolbarStyle(theme),
  })
);

const AppStoreLink = () => (
  <NavDrawerLink name="App Store">
    <StoreIcon />
  </NavDrawerLink>
);

const DataShelfLink = () => (
  <NavDrawerLink name="Data Shelf">
    <SaveIcon />
  </NavDrawerLink>
);

const ComputationCockpitLink = () => (
  <NavDrawerLink name="Computation Cockpit">
    <ComputerIcon />
  </NavDrawerLink>
);

interface NavigationProps {
  children?: ReactNode | ReactNodeArray;
}

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <TopBar title={appName} isOpen={open} onDrawerOpen={handleDrawerOpen} />
      <NavDrawer isOpen={open}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <AppStoreLink />
          <DataShelfLink />
          <ComputationCockpitLink />
        </List>
      </NavDrawer>
      <Content>{children}</Content>
    </div>
  );
};

export default Navigation;