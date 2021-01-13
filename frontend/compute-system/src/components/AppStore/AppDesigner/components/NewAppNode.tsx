import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Tab,
  Tabs,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import * as React from "react";
import apiCall from "../../../../api/apiCall";
import RequestType from "../../../../api/requestType";
import { APPSTORE_URL } from "../../../../api/urls";
import AppCardData from "../../AppCard/interfaces/appCardData";
import NewNodeTab from "./NewNodeTab";

interface NewAppNodeProps {
  closeForm: () => void;
  addNewNode: (id: string, isAppNode: boolean) => void;
}

const NewAppNode = (props: NewAppNodeProps) => {
  const [selectedTab, setSelectedTab] = React.useState<number>(0);
  const [chosenData, setChosenData] = React.useState<string>("");
  const [apps, setApps] = React.useState<AppCardData[]>([]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
    setChosenData("");
  };

  const handleChangeData = (id: string) => {
    setChosenData(id);
  };

  const fetchApps = async () => {
    const response = await apiCall<AppCardData[]>(
      APPSTORE_URL,
      RequestType.GET
    );
    if (response.isError) {
      return;
    }
    var apiApps = response.content as AppCardData[];
    setApps(apiApps);
  };

  const handleAdd = () => {
    if (chosenData === "") {
      return;
    }

    const isAppNode = selectedTab === 0;
    props.addNewNode(chosenData, isAppNode);
    setChosenData("");
  };

  const handleFormClose = () => {
    setChosenData("");
    props.closeForm();
  };

  React.useEffect(() => {
    fetchApps();
  }, []);

  return (
    <Card>
      <CardHeader
        title="Add new node:"
        action={
          <IconButton aria-label="close" onClick={handleFormClose}>
            <Clear />
          </IconButton>
        }
      />
      <CardContent>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab value={0} label="Apps" />
          <Tab value={1} label="Actions" />
        </Tabs>
        <NewNodeTab
          isAppTabActive={selectedTab === 0}
          apps={apps}
          setChosenData={handleChangeData}
        />
      </CardContent>
      <CardActions>
        <Button
          style={{ marginLeft: "auto" }}
          onClick={handleAdd}
          color="primary"
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewAppNode;
