import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React, {ReactNode} from "react";

interface NavDrawerProps {
  name: string;
  children: ReactNode;
}

const NavDrawerLink: React.FC<NavDrawerProps> = ({name, children}) => {
  return (
    <ListItem button>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={name}/>
    </ListItem>
  )
}

export default NavDrawerLink;