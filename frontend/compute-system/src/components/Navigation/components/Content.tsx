import React, { ReactNode, ReactNodeArray } from "react";
import { contentStyles } from "../styles";

interface ContentProps {
  children?: ReactNode | ReactNodeArray;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  const classes = contentStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {children}
    </main>
  );
};

export default Content;