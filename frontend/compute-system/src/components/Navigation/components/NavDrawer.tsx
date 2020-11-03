import React, { ReactNode, ReactNodeArray } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import { navDrawerStyles } from "../styles";

interface NavDrawerProps {
  isOpen?: boolean;
  children?: ReactNode | ReactNodeArray;
}

const NavDrawer: React.FC<NavDrawerProps> = ({ isOpen, children }) => {
  const classes = navDrawerStyles();

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: !isOpen,
          }),
        }}
      >
        {children}
      </Drawer>
    </div>
  );
};

export default NavDrawer;