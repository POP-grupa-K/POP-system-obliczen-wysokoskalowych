import React, {ReactNode, ReactNodeArray} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {toolbarStyle} from "../styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: toolbarStyle(theme),
  }),
);

interface ContentProps {
  children?: ReactNode | ReactNodeArray;
}

const Content: React.FC<ContentProps> = ({children}) => {
  const classes = useStyles();


  return (
    <main className={classes.content}>
      <div className={classes.toolbar}/>
      {children}
    </main>
  )
};

export default Content;