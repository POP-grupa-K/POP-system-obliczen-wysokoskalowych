import React, { useCallback, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  IconButton,
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
  Snackbar,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import apiCall from "../../api/apiCall";
import { COCKPIT_URL } from "../../api/urls";
import RequestType from "../../api/requestType";
import { UserTasksByApp } from "./taskData";
import { StartTask } from "./TaskActions/StartTask";
import { TerminateTask } from "./TaskActions/TerminateTask";
import { DeleteTask } from "./TaskActions/DeleteTask";
import { useHistory } from "react-router-dom";
import { routes } from "../../const/routes";
import { formatTaskCredits } from "./taskDataFormat";
import { User } from "../../mocks/common/mockUsers";
import { useSelector } from "react-redux";
import RootState from "../../redux/rootState";
import { AddCircle } from "@material-ui/icons";
import cockpitStyles from "./styles";
import AddNewTaskDialog from "../common/Dialogs/AddNewTaskDialog";

const ComputationCockpit: React.FC = () => {
  const history = useHistory();
  const classes = cockpitStyles();
  const matches = useMediaQuery("(min-width:800px)");
  const [userTasks, setUserTasks] = React.useState<UserTasksByApp[]>([]);
  const [openAddToCockpitDialog, setOpenAddToCockpitDialog] = React.useState<
    boolean
  >(false);
  const [makeReload, setReload] = React.useState<boolean>(false);
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);
  const currentUser: User = useSelector(
    (state: RootState) => state.userReducer.user
  );
  const statusTaskMap = new Map<string, string>();
  statusTaskMap.set("1", "Highest");
  statusTaskMap.set("2", "Middle");
  statusTaskMap.set("3", "Low");

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
    setReload(false);
  }, [currentUser.id]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, openAddToCockpitDialog, makeReload]);

  const handleTaskClick = (taskId: number) =>
    history.push(`${routes.computationCockpit}/task/${taskId}`);

  const addToCockpit = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOpenAddToCockpitDialog(true);
  };

  const onAddToCockpitClose = () => {
    setOpenAddToCockpitDialog(false);
  };

  const handleSnackClose = () => {
    setOpenSnack(false);
  };

  const handleSnackbarShow = () => {
    setOpenSnack(true);
  };

  const handleReload = () => {
    setReload(true);
  };

  return (
    <>
      {userTasks != null &&
        userTasks.map((userTask) => (
          <Accordion key={userTask.appName}>
            <AccordionSummary
              classes={{ content: classes.summary }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>{userTask.appName}</Typography>
              <IconButton onClick={addToCockpit} className={classes.button}>
                <AddCircle className={classes.icon} />
              </IconButton>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <AddNewTaskDialog
                  open={openAddToCockpitDialog}
                  handleCloseDialog={onAddToCockpitClose}
                  idApp={1}
                  showSnackbar={handleSnackbarShow}
                />
                <Snackbar
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  open={openSnack}
                  message={`Added task to ${userTask.appName}`}
                  onClose={handleSnackClose}
                  autoHideDuration={5000}
                />
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      {matches && (
                        <>
                          <TableCell align="right">Credits</TableCell>
                          <TableCell align="right">Status</TableCell>
                          <TableCell align="right">Priority</TableCell>
                        </>
                      )}
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userTask.tasks
                      .filter((task) => {
                        if (task.priority !== "-1") return task;
                        return null;
                      })
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
                                  badgeContent={statusTaskMap.get(
                                    task.priority
                                  )}
                                  color="secondary"
                                />
                              </TableCell>
                            </>
                          )}
                          <TableCell align="right">
                            <StartTask
                              taskId={task.idTask}
                              taskStatus={task.status}
                              makeReload={handleReload}
                              allowReload={true}
                            />
                            <TerminateTask
                              taskId={task.idTask}
                              taskStatus={task.status}
                              makeReload={handleReload}
                              allowReload={true}
                            />
                            <DeleteTask
                              taskId={task.idTask}
                              taskStatus={task.status}
                              makeReload={handleReload}
                              allowReload={true}
                            />
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
