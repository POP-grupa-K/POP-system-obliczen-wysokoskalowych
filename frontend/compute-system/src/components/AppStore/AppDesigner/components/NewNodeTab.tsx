import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import * as React from "react";
import AppCardData from "../../AppCard/interfaces/appCardData";
import actions, { ActionNode } from "../consts/actions";

interface NewNodeTabProps {
  isAppTabActive: boolean;
  apps: AppCardData[];
  setChosenData: (id: string) => void;
}

const NewNodeTab = (props: NewNodeTabProps) => {
  const [chosenAppId, setChosenAppId] = React.useState<string>("");
  const [selectData, setSelectData] = React.useState<
    Array<AppCardData | ActionNode>
  >([]);

  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setChosenAppId(event.target.value as string);
    props.setChosenData(event.target.value as string);
  };

  const isAppCardData = (data: any): data is AppCardData => {
    return "idApp" in data;
  };

  const { apps, isAppTabActive } = props;
  React.useEffect(() => {
    setChosenAppId("");
    if (isAppTabActive) {
      setSelectData(apps);
      return;
    }

    setSelectData(actions);
  }, [apps, isAppTabActive]);

  return (
    <FormControl fullWidth variant="outlined" style={{ marginBottom: "15px" }}>
      <InputLabel htmlFor="appsSelect">
        {props.isAppTabActive ? "Choose an app:" : "Choose an action:"}
      </InputLabel>
      <Select id="appsSelect" value={chosenAppId} onChange={handleSelectChange}>
        {selectData.map((data) => {
          if (isAppCardData(data)) {
            return (
              <MenuItem key={data.idApp} value={data.idApp}>
                {data.nameApp}
              </MenuItem>
            );
          }

          return (
            <MenuItem key={data.actionId} value={data.actionId}>
              {data.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default NewNodeTab;
