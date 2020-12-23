import { Card, CardHeader, IconButton } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ArrowDownward, Clear, Edit } from "@material-ui/icons";
import * as React from "react";

interface AppNodeProps {
  formActive?: boolean;
  closeForm?: () => void;
}

const AppNode = (props: AppNodeProps) => {
  return (
    <Grid container alignItems="center" justify="center" direction="column">
      <Card>
        <CardHeader
          title="New node"
          action={
            <>
              {!props.formActive && (
                <IconButton aria-label="edit">
                  <Edit />
                </IconButton>
              )}
              {props.formActive && (
                <IconButton aria-label="close" onClick={props.closeForm}>
                  <Clear />
                </IconButton>
              )}
            </>
          }
        />
      </Card>
      {!props.formActive && <ArrowDownward />}
    </Grid>
  );
};

export default AppNode;
