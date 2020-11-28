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
import { NavLink } from "react-router-dom";
import { routes } from "../../const/routes";

interface LinkProps {
  className?: string;
  onClick?: () => void;
}

const AppStoreLink: React.FC<LinkProps> = ({ className, onClick }) => (
  <NavLink
    to={routes.appStore}
    className={className}
    onClick={onClick}
    exact
  >
    <NavDrawerLink name="App Store">
      <StoreIcon />
    </NavDrawerLink>
  </NavLink>
);

const DataShelfLink: React.FC<LinkProps> = ({ className, onClick }) => (
  <NavLink
    to={routes.dataShelf}
    className={className}
    onClick={onClick}
    exact
  >
    <NavDrawerLink name="Data Shelf">
      <SaveIcon />
    </NavDrawerLink>
  </NavLink>
);

const ComputationCockpitLink: React.FC<LinkProps> = ({
  className,
  onClick,
}) => (
  <NavLink
    to={routes.computationCockpit}
    className={className}
    onClick={onClick}
    exact
  >
    <NavDrawerLink name="Computation Cockpit">
      <ComputerIcon />
    </NavDrawerLink>
  </NavLink>
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
          <AppStoreLink
            className={classes.navLink}
            onClick={handleDrawerClose}
          />
          <DataShelfLink
            className={classes.navLink}
            onClick={handleDrawerClose}
          />
          <ComputationCockpitLink
            className={classes.navLink}
            onClick={handleDrawerClose}
          />
        </List>
      </Drawer>
      <Content>{children}</Content>
    </div>
  );
};

export default Navigation;
