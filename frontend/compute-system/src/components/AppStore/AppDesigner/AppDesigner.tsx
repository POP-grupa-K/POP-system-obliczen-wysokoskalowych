import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import * as React from "react";
import AppFormStyles from "../AppForm/AppFormStyles";
import AppNode from "./components/AppNode";
import NewAppNode from "./components/NewAppNode";
import AppNodeData from "./interfaces/appNodeData";

const AppDesigner = () => {
  const buttonClasses = AppFormStyles();
  const [appName, setAppName] = React.useState<string>("");
  const [addNewNodeActive, setAddNewNodeActive] = React.useState<boolean>(
    false
  );
  const [description, setDescription] = React.useState<string>("");
  const [helperText, setHelperText] = React.useState<string>("");
  const [descriptionValid, setDescritpionValid] = React.useState<boolean>(true);
  const [currentNodes, setCurrentNodes] = React.useState<AppNodeData[]>([]);

  const handleNameApp = (event: React.ChangeEvent<HTMLInputElement>) => {
    var nameAppValue = event.target.value;
    if (!nameAppValue) {
      setHelperText("Name is not given");
    } else if (nameAppValue.length > 50) {
      setHelperText("Name is too long");
    } else {
      setHelperText("");
    }
    setAppName(nameAppValue);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    var descriptionValue = event.target.value;
    if (descriptionValue.length > 5000) {
      setDescritpionValid(false);
    } else {
      setDescritpionValid(true);
    }
    setDescription(descriptionValue);
  };

  const handleAddNewNodeClick = (node: AppNodeData) => {
    node.addFormActive = !node.addFormActive;
    setCurrentNodes([...currentNodes]);
  };

  const handleAddNewNode = (
    dataId: string,
    branches: number,
    isAppNode: boolean
  ) => {
    //TODO change end node to node, set xs/branches, new end nodes!
    const newNode: AppNodeData = {
      diagramId: currentNodes.length + 1,
      isAppNode: isAppNode,
      appId: isAppNode ? dataId : "",
      actionId: isAppNode ? "" : dataId,
      nextNodes: [],
    };

    let nodes: AppNodeData[];
    if (currentNodes[0].diagramId === 0) {
      //todo zamień nudesa i ustaw childy
      newNode.diagramId = 1;
      nodes = [];
    } else {
      nodes = currentNodes;
    }

    nodes.push(newNode);

    for (let i = 1; i <= branches; i++) {
      //todo create as many end nodes and set parent's nextNodes
      const endNode: AppNodeData = {
        diagramId: newNode.diagramId + i,
        isAppNode: false,
        actionId: "5",
        addFormActive: false,
        nextNodes: [],
      };

      newNode.nextNodes.push(endNode.diagramId);
      nodes.push(endNode);
    }

    setCurrentNodes([...nodes]);
  };

  React.useEffect(() => {
    const endNodeArray: AppNodeData[] = [
      {
        diagramId: 0,
        isAppNode: false,
        actionId: "5",
        nextNodes: [],
      },
    ];
    setCurrentNodes(endNodeArray);
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container direction="column">
        <Grid item container xs={6} direction="column">
          <Typography variant="h5" style={{ marginBottom: "8px" }}>
            Create an app
          </Typography>
          <TextField
            autoFocus
            error={helperText.length > 0}
            helperText={helperText}
            variant="outlined"
            margin="dense"
            id="name"
            label="App name"
            fullWidth
            value={appName}
            required={true}
            onChange={handleNameApp}
          />
          <TextField
            error={!descriptionValid}
            variant="outlined"
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={6}
            helperText={descriptionValid ? "" : "Description is too long!"}
            value={description}
            onChange={handleDescription}
          />
          <Button
            variant="contained"
            startIcon={<Save />}
            className={buttonClasses.editButton}
            style={{ marginLeft: "0px" }}
          >
            Save
          </Button>
        </Grid>
        <Grid item container justify="center" alignItems="center">
          {currentNodes.map((node) => {
            if (!node.isAppNode && node.actionId === "5") {
              return (
                <Grid item key={node.diagramId}>
                  {node.addFormActive ? (
                    <NewAppNode
                      closeForm={() => handleAddNewNodeClick(node)}
                      addNewNode={handleAddNewNode}
                    />
                  ) : (
                    <Button
                      variant="contained"
                      className={buttonClasses.editButton}
                      onClick={() => handleAddNewNodeClick(node)}
                    >
                      Add new node
                    </Button>
                  )}
                </Grid>
              );
            }

            return <AppNode key={node.diagramId} nodeData={node} />;
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppDesigner;
