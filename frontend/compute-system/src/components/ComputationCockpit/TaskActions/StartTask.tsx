import React, { FC } from "react";
import { TaskActionProps } from "./taskAction";
import { Button } from "@material-ui/core";
import apiCall from "../../../api/apiCall";
import { COCKPIT_URL } from "../../../api/urls";
import RequestType from "../../../api/requestType";

export const StartTask: FC<TaskActionProps> = ({ taskId }) => {
  const handleStartTask = async () => {
    await apiCall(`${COCKPIT_URL}/${taskId}/run`, RequestType.POST);
  };

  return (
    <Button color="primary" onClick={handleStartTask}>
      Start
    </Button>
  );
};