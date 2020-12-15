import React, { FC } from "react";
import { TaskActionProps } from "./taskAction";
import { Button } from "@material-ui/core";
import apiCall from "../../../api/apiCall";
import { COCKPIT_URL } from "../../../api/urls";
import RequestType from "../../../api/requestType";
import { useHistory } from "react-router-dom";
import { routes } from "../../../const/routes";

export const DeleteTask: FC<TaskActionProps> = ({
  taskId,
  makeReload,
  allowReload,
  taskStatus,
}) => {
  const history = useHistory();

  const handleArchiveTask = async () => {
    await apiCall(`${COCKPIT_URL}/${taskId}`, RequestType.DELETE);
    if (allowReload) makeReload();
    else history.push(`${routes.computationCockpit}`);
  };

  return (
    <Button onClick={taskStatus === "ongoing" ? undefined : handleArchiveTask}>
      Delete
    </Button>
  );
};
