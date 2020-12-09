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
import { APPSTORE_URL, COCKPIT_URL } from "../../../api/urls";
import RequestType from "../../../api/requestType";
import { mockTasks } from "../../../mocks/ComputationCockpit/mockTasks";
import { MockWarning } from "../../common/MockWarning";
import { taskDetailsStyles } from "./styles";
import { formatTaskCredits, formatTaskRuntime } from "../taskDataFormat";
import { StartTask } from "../TaskActions/StartTask";
import { TerminateTask } from "../TaskActions/TerminateTask";
import { ArchiveTask } from "../TaskActions/ArchiveTask";
import AppCardData, {
  initialAppCardData,
} from "../../AppStore/AppCard/interfaces/appCardData";
import { createAppImageUrl } from "../../../api/apiUtils";

interface TaskDetailsRouteParams {
  taskId: string;
}

interface TaskDetailsRouteProps
  extends RouteComponentProps<TaskDetailsRouteParams> {}

export const TaskDetails = (props: TaskDetailsRouteProps) => {
  const history = useHistory();
  const classes = taskDetailsStyles();
  const { taskId } = props.match.params;

  const [app, setApp] = React.useState<AppCardData>(initialAppCardData);
  const [task, setTask] = useState<TaskData>();
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const fetchApp = React.useCallback(async () => {
    const responseDetails = await apiCall<AppCardData>(
      `${APPSTORE_URL}${task?.idApp}`,
      RequestType.GET
    );
    if (responseDetails.isError) {
      return;
    }

    try {
      // in case of problems with server - "apiApp" is undefined
      const apiApp = responseDetails.content as AppCardData;
      apiApp.dateUpdate = new Date(apiApp.dateUpdate).toLocaleString();
      apiApp.imageUrl = createAppImageUrl(task?.idApp || "");
      setApp(apiApp);
    } catch (e) {}
  }, [task?.idApp]);

  const fetchTask = useCallback(async () => {
    const response = await apiCall<TaskData>(
      `${COCKPIT_URL}/${taskId}`,
      RequestType.GET
    );
    if (response.isError) {
      return;
    }
    try {
      //TODO: remove this closure when backend no longer returns invalid trash
      let task = response.content as TaskData;
      task.dateStart &&
        (task.dateStart = new Date(task.dateStart).toLocaleString());
      task.dateEnd && (task.dateEnd = new Date(task.dateEnd).toLocaleString());
      setTask(task);
      setDownloaded(true);
    } catch (e) {
      const task = mockTasks.filter(
        (task) => task.idTask.toString() === taskId
      )[0];
      setTask(task);
    }
  }, [taskId]);

  useEffect(() => {
    fetchTask();
    fetchApp();
  }, [fetchApp, fetchTask]);

  const goToApp = () => {
    history.push(`/app/${task?.idApp}`);
  };

  return (
    <Container>
      {!downloaded && <MockWarning />}
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
            {task != null && (
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
        <Button onClick={goToApp}>{`Go to App ${app.nameApp}`}</Button>
      </Paper>
    </Container>
  );
};
