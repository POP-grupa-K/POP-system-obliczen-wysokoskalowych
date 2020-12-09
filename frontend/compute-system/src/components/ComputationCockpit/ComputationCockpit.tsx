import React, { useCallback, useEffect, useState } from "react";
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
import { APPSTORE_URL, COCKPIT_URL } from "../../api/urls";
import RequestType from "../../api/requestType";
import { TaskData, UserTasksByApp } from "./taskData";
import { mockTasks } from "../../mocks/ComputationCockpit/mockTasks";
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
import AppCardData from "../AppStore/AppCard/interfaces/appCardData";
import { createAppImageUrl } from "../../api/apiUtils";
import { User } from "../../mocks/common/mockUsers";
import { useSelector } from "react-redux";
import RootState from "../../redux/rootState";

const ComputationCockpit: React.FC = () => {
  const history = useHistory();
  const matches = useMediaQuery("(min-width:800px)");

  const [apps, setApps] = React.useState<AppCardData[]>([]);
  const [appNames, setAppNames] = React.useState<string[]>([]);
  const [userTasks, setUserTasks] = React.useState<UserTasksByApp[]>([]);
  const [tasks, setTasks] = useState<TaskData[]>();
  const [downloaded, setDownloaded] = useState<boolean>(false);
  const currentUser: User = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const fetchApps = React.useCallback(async () => {
    const response = await apiCall<AppCardData[]>(
      APPSTORE_URL,
      RequestType.GET
    );
    if (response.isError) {
      return;
    }

    var apiApps = response.content as AppCardData[];
    apiApps.forEach((apiApp) => {
      if (apiApp.dateUpdate) {
        apiApp.dateUpdate = new Date(apiApp.dateUpdate).toLocaleString();
      }
      apiApp.imageUrl = createAppImageUrl(apiApp.idApp);
    });

    setApps(apiApps);
  }, []);

  const fetchTasks = useCallback(async () => {
    const response = await apiCall<TaskData[]>(
      `${COCKPIT_URL}`,
      RequestType.GET
    );
    if (response.isError) {
      return;
    }
    try {
      //TODO: remove this closure when backend no longer returns invalid trash
      let tasks = response.content as TaskData[];
      tasks.forEach((task) => {
        task.dateStart &&
          (task.dateStart = new Date(task.dateStart).toLocaleString());
        task.dateEnd &&
          (task.dateEnd = new Date(task.dateEnd).toLocaleString());
      });
      setTasks(tasks);
      setDownloaded(true);
    } catch (e) {
      setTasks(mockTasks);
    }
  }, []);

  const fetchAll = useCallback(async () => {
    const response = await apiCall<UserTasksByApp[]>(
      `${COCKPIT_URL}/user/tasks/${currentUser.id}`,
      RequestType.GET
    );

    if (response.isError) {
      return;
    }
    var resUserTasks = response.content as UserTasksByApp[];
    var apps = Object.keys(resUserTasks);

    setUserTasks(resUserTasks);
    setAppNames(apps);
    console.log(userTasks);
  }, [currentUser.id]);

  useEffect(() => {
    fetchApps();
    fetchTasks();
    fetchAll();
  }, [fetchApps, fetchTasks, fetchAll]);

  const handleTaskClick = (taskId: number) =>
    history.push(`${routes.computationCockpit}/task/${taskId}`);

  return (
    <>
      {!downloaded && <MockWarning />}
      {tasks != null &&
        appNames.map((app) => (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{app}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
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
                  <TableBody>
                    {/* {tasks
                      .filter((task) => task.idApp === app.idApp)
                      .map((task) => (
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
                                {task.version}
                              </TableCell>
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
                              <TableCell align="right">
                                {formatTaskClusterAllocation(task)}
                              </TableCell>
                            </>
                          )}
                          <TableCell align="right">
                            <StartTask taskId={task.idTask} />
                            <TerminateTask taskId={task.idTask} />
                            <ArchiveTask taskId={task.idTask} />
                          </TableCell>
                        </TableRow>
                      ))} */}
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
