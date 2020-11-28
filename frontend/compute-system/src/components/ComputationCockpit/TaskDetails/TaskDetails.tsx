import React from "react";
import {RouteComponentProps} from "react-router-dom";

interface TaskDetailsRouteParams {
  appId: string;
}

interface TaskDetailsRouteProps
  extends RouteComponentProps<TaskDetailsRouteParams> {}

export const TaskDetails = (props: TaskDetailsRouteProps) => {
  return (
    <p>WIP</p>
  )
}