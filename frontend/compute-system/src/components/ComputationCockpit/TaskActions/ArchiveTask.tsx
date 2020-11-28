import React, { FC } from "react";
import { TaskActionProps } from "./taskAction";
import { Button } from "@material-ui/core";
import apiCall from "../../../api/apiCall";
import { COCKPIT_URL } from "../../../api/urls";
import RequestType from "../../../api/requestType";

export const ArchiveTask: FC<TaskActionProps> = ({ taskId }) => {
  const handleArchiveTask = async () => {
    await apiCall(`${COCKPIT_URL}/${taskId}`, RequestType.DELETE);
  };

  return <Button onClick={handleArchiveTask}>Archive</Button>;
};