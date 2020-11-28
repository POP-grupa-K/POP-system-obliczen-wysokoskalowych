import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  Badge,
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
import { mockTask } from "../../../mocks/ComputationCockpit/mockTask";
import { MockWarning } from "../../common/MockWarning";
import { taskDetailsStyles } from "./styles";
import {
  formatTaskClusterAllocation,
  formatTaskCredits,
  formatTaskRuntime,
} from "../taskDataFormat";
import { StartTask } from "../TaskActions/StartTask";
import { TerminateTask } from "../TaskActions/TerminateTask";
import { ArchiveTask } from "../TaskActions/ArchiveTask";

interface TaskDetailsRouteParams {
  taskId: string;
}

interface TaskDetailsRouteProps
  extends RouteComponentProps<TaskDetailsRouteParams> {}

export const TaskDetails = (props: TaskDetailsRouteProps) => {
  const classes = taskDetailsStyles();
  const { taskId } = props.match.params;

  const [task, setTask] = useState<TaskData>();
  const [downloaded, setDownloaded] = useState<boolean>(false);

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
      task.startTime &&
        (task.startTime = new Date(task.startTime).toLocaleString());
      task.endTime && (task.endTime = new Date(task.endTime).toLocaleString());
      setTask(task);
      setDownloaded(true);
    } catch (e) {
      setTask(mockTask);
    }
  }, [taskId]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

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
                <TableCell>Cluster alloc.</TableCell>
              </TableRow>
            </TableHead>
            {task != null && (
              <TableBody>
                <TableRow key={task.id}>
                  <TableCell>{formatTaskRuntime(task)}</TableCell>
                  <TableCell>{formatTaskCredits(task)}</TableCell>
                  <TableCell>
                    <Badge badgeContent={task.status} color="primary" />
                  </TableCell>
                  <TableCell>
                    <Badge badgeContent={task.priority} color="secondary" />
                  </TableCell>
                  <TableCell>{formatTaskClusterAllocation(task)}</TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};