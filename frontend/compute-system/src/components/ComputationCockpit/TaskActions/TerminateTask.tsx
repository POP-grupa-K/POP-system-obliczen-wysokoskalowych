import React, { FC } from "react";
import { TaskActionProps } from "./taskAction";
import { Button } from "@material-ui/core";
import apiCall from "../../../api/apiCall";
import { COCKPIT_URL } from "../../../api/urls";
import RequestType from "../../../api/requestType";

export const TerminateTask: FC<TaskActionProps> = ({ taskId }) => {
  const handleTerminateTask = async () => {
    await apiCall(`${COCKPIT_URL}/${taskId}/terminate`, RequestType.POST);
  };

  return <Button color="secondary" onClick={handleTerminateTask}>Terminate</Button>;
};