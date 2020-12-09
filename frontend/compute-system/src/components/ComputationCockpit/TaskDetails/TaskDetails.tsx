import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import {
  Badge,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { TaskData } from "../taskData";
import apiCall from "../../../api/apiCall";
import { COCKPIT_URL } from "../../../api/urls";
import RequestType from "../../../api/requestType";
import { taskDetailsStyles } from "./styles";
import { formatTaskCredits, formatTaskRuntime } from "../taskDataFormat";
import { StartTask } from "../TaskActions/StartTask";
import { TerminateTask } from "../TaskActions/TerminateTask";
import { ArchiveTask } from "../TaskActions/ArchiveTask";
import { UserTasksByApp } from "../taskData";

interface TaskDetailsRouteParams {
  taskId: string;
}

interface TaskDetailsRouteProps
  extends RouteComponentProps<TaskDetailsRouteParams> {}

export const TaskDetails = (props: TaskDetailsRouteProps) => {
  const history = useHistory();
  const classes = taskDetailsStyles();
  const { taskId } = props.match.params;

  const [appName, setAppName] = React.useState<string>("");
  const [task, setTask] = useState<TaskData>();

  const fetchTask = useCallback(async () => {
    const response = await apiCall<UserTasksByApp>(
      `${COCKPIT_URL}/${taskId}`,
      RequestType.GET
    );
    if (response.isError) {
      return;
    }

    var responseData = response.content as UserTasksByApp;
    var taskData = responseData.tasks[0] as TaskData;

    taskData.dateStart &&
      (taskData.dateStart = new Date(taskData.dateStart).toLocaleString());
    taskData.dateEnd &&
      (taskData.dateEnd = new Date(taskData.dateEnd).toLocaleString());

    setAppName(responseData.appName);
    setTask(taskData);
  }, [taskId]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const goToApp = () => {
    history.push(`/app/${task?.idApp}`);
  };

  return (
    <Container>
      <Paper className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3">{task?.name}</Typography>
            <Typography>{task?.version}</Typography>
          </Grid>
          <Grid item xs={12} md={6} className={classes.actions}>
            <StartTask taskId={taskId} />
            <TerminateTask taskId={taskId} />
            <ArchiveTask taskId={taskId} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Run time</TableCell>
                <TableCell>Credits</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
              </TableRow>
            </TableHead>
            {task && (
              <TableBody>
                <TableRow key={task.idTask}>
                  <TableCell>{formatTaskRuntime(task)}</TableCell>
                  <TableCell>{formatTaskCredits(task)}</TableCell>
                  <TableCell>
                    <Badge badgeContent={task.status} color="primary" />
                  </TableCell>
                  <TableCell>
                    <Badge badgeContent={task.priority} color="secondary" />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <Divider className={classes.divider} />
        <Button onClick={goToApp}>{`Go to App ${appName}`}</Button>
      </Paper>
    </Container>
  );
};
