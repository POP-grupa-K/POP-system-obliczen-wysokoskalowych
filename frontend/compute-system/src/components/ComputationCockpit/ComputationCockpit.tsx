import React, { useCallback, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@material-ui/core";
import apiCall from "../../api/apiCall";
import { COCKPIT_URL } from "../../api/urls";
import RequestType from "../../api/requestType";
import { TaskData } from "./taskData";
import { mockTask } from "../../mocks/ComputationCockpit/mockTask";
import { StartTask } from "./TaskActions/StartTask";
import { TerminateTask } from "./TaskActions/TerminateTask";
import { ArchiveTask } from "./TaskActions/ArchiveTask";
import { useHistory } from "react-router-dom";
import { routes } from "../../const/routes";
import { MockWarning } from "../common/MockWarning";
import {
  formatTaskClusterAllocation,
  formatTaskCredits,
  formatTaskRuntime,
} from "./taskDataFormat";

const ComputationCockpit: React.FC = () => {
  const history = useHistory();
  const matches = useMediaQuery("(min-width:800px)");

  const [tasks, setTasks] = useState<TaskData[]>();
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const fetchTasks = useCallback(async () => {
    const response = await apiCall<TaskData[]>(COCKPIT_URL, RequestType.GET);
    if (response.isError) {
      return;
    }
    try {
      //TODO: remove this closure when backend no longer returns invalid trash
      let tasks = response.content as TaskData[];
      tasks.forEach((task) => {
        task.startTime &&
          (task.startTime = new Date(task.startTime).toLocaleString());
        task.endTime &&
          (task.endTime = new Date(task.endTime).toLocaleString());
      });
      setTasks(tasks);
      setDownloaded(true);
    } catch (e) {
      setTasks(Array(10).fill(mockTask));
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskClick = (taskId: number) =>
    history.push(`${routes.computationCockpit}/task/${taskId}`);

  return (
    <TableContainer component={Paper}>
      {!downloaded && <MockWarning />}
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {matches && (
              <>
                <TableCell align="right">Version</TableCell>
                <TableCell align="right">Run time</TableCell>
                <TableCell align="right">Credits</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Priority</TableCell>
                <TableCell align="right">Cluster alloc.</TableCell>
              </>
            )}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        {tasks != null && (
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell
                  onClick={() => handleTaskClick(task.id)}
                  component="th"
                  scope="row"
                >
                  <Button>{task.name}</Button>
                </TableCell>
                {matches && (
                  <>
                    <TableCell align="right">{task.version}</TableCell>
                    <TableCell align="right">
                      {formatTaskRuntime(task)}
                    </TableCell>
                    <TableCell align="right">
                      {formatTaskCredits(task)}
                    </TableCell>
                    <TableCell align="right">
                      <Badge badgeContent={task.status} color="primary" />
                    </TableCell>
                    <TableCell align="right">
                      <Badge badgeContent={task.priority} color="secondary" />
                    </TableCell>
                    <TableCell align="right">
                      {formatTaskClusterAllocation(task)}
                    </TableCell>
                  </>
                )}
                <TableCell align="right">
                  <StartTask taskId={task.id} />
                  <TerminateTask taskId={task.id} />
                  <ArchiveTask taskId={task.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default ComputationCockpit;
