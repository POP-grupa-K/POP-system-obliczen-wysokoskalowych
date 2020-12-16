import React, { FC } from "react";
import { TaskActionProps } from "./taskAction";
import { Button } from "@material-ui/core";
import apiCall from "../../../api/apiCall";
import { COCKPIT_URL } from "../../../api/urls";
import RequestType from "../../../api/requestType";

export const TerminateTask: FC<TaskActionProps> = ({
  taskId,
  makeReload,
  allowReload,
  taskStatus,
}) => {
  const handleTerminateTask = async () => {
    await apiCall(`${COCKPIT_URL}/${taskId}/stop`, RequestType.POST);
    if (allowReload) makeReload();
  };

  return (
    <Button
      color="secondary"
      onClick={
        taskStatus === "created" || taskStatus === "stopped"
          ? undefined
          : handleTerminateTask
      }
    >
      Terminate
    </Button>
  );
};
