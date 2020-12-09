import React, { useCallback, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import apiCall from "../../api/apiCall";
import { COCKPIT_URL } from "../../api/urls";
import RequestType from "../../api/requestType";
import { UserTasksByApp } from "./taskData";
import { StartTask } from "./TaskActions/StartTask";
import { TerminateTask } from "./TaskActions/TerminateTask";
import { ArchiveTask } from "./TaskActions/ArchiveTask";
import { useHistory } from "react-router-dom";
import { routes } from "../../const/routes";
import { formatTaskCredits, formatTaskRuntime } from "./taskDataFormat";
import { User } from "../../mocks/common/mockUsers";
import { useSelector } from "react-redux";
import RootState from "../../redux/rootState";

const ComputationCockpit: React.FC = () => {
  const history = useHistory();
  const matches = useMediaQuery("(min-width:800px)");
  const [userTasks, setUserTasks] = React.useState<UserTasksByApp[]>([]);
  const currentUser: User = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const fetchTasks = useCallback(async () => {
    const response = await apiCall<UserTasksByApp[]>(
      `${COCKPIT_URL}/user/tasks/${currentUser.id}`,
      RequestType.GET
    );

    if (response.isError) {
      return;
    }
    var resUserTasks = response.content as UserTasksByApp[];
    setUserTasks(resUserTasks);
  }, [currentUser.id]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskClick = (taskId: number) =>
    history.push(`${routes.computationCockpit}/task/${taskId}`);

  return (
    <>
      {userTasks != null &&
        userTasks.map((userTask) => (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{userTask.appName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      {matches && (
                        <>
                          <TableCell align="right">Run time</TableCell>
                          <TableCell align="right">Credits</TableCell>
                          <TableCell align="right">Status</TableCell>
                          <TableCell align="right">Priority</TableCell>
                        </>
                      )}
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userTask.tasks.map((task) => (
                      <TableRow key={task.idTask}>
                        <TableCell
                          onClick={() => handleTaskClick(task.idTask)}
                          component="th"
                          scope="row"
                        >
                          <Button>{task.name}</Button>
                        </TableCell>
                        {matches && (
                          <>
                            <TableCell align="right">
                              {formatTaskRuntime(task)}
                            </TableCell>
                            <TableCell align="right">
                              {formatTaskCredits(task)}
                            </TableCell>
                            <TableCell align="right">
                              <Badge
                                badgeContent={task.status}
                                color="primary"
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Badge
                                badgeContent={task.priority}
                                color="secondary"
                              />
                            </TableCell>
                          </>
                        )}
                        <TableCell align="right">
                          <StartTask taskId={task.idTask} />
                          <TerminateTask taskId={task.idTask} />
                          <ArchiveTask taskId={task.idTask} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  );
};

export default ComputationCockpit;
