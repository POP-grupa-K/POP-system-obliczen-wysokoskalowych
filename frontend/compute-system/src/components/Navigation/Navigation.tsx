import React, { ReactNode, ReactNodeArray, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import StoreIcon from "@material-ui/icons/Store";
import SaveIcon from "@material-ui/icons/Save";
import ComputerIcon from "@material-ui/icons/Computer";
import TopBar from "./components/TopBar";
import NavDrawerLink from "./components/NavDrawerLink";
import Content from "./components/Content";
import { navigationStyles } from "./styles";
import { appName } from "../../const/strings";
import { Drawer } from "@material-ui/core";

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
  const classes = navigationStyles();
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
      <TopBar title={appName} onDrawerOpen={handleDrawerOpen} />
      <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
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
      </Drawer>
      <Content>{children}</Content>
    </div>
  );
};

export default Navigation;
