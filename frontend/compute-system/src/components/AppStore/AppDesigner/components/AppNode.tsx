import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ArrowDownward, Clear, Edit } from "@material-ui/icons";
import * as React from "react";
import AppNodeData from "../interfaces/appNodeData";

interface AppNodeProps {
  formActive?: boolean;
  closeForm?: () => void;
  nodeData: AppNodeData;
}

const AppNode = (props: AppNodeProps) => {
  return (
    <Grid
      container
      item
      alignItems="center"
      justify="center"
      direction="column"
    >
      <Card>
        <CardHeader
          title={props.nodeData.isAppNode ? "App node" : "Action node"}
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
        <CardContent>
          {props.nodeData.isAppNode ? (
            <Typography variant="h3">{props.nodeData.appName}</Typography>
          ) : (
            <Typography variant="h3">{props.nodeData.actionName}</Typography>
          )}
        </CardContent>
      </Card>
      {!props.formActive && <ArrowDownward />}
    </Grid>
  );
};

export default AppNode;
