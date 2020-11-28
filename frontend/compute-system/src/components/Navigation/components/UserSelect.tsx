import * as React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { topBarStyles } from "../styles";

const UserSelect = () => {
  const [userID, setUser] = React.useState<number>(69);
  const classes = topBarStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    var value: number = event.target.value as number;
    setUser(value);
  };

  return (
    <FormControl className={classes.userID}>
      <InputLabel id="logged-user" className={classes.select}>
        Logged in as
      </InputLabel>
      <Select
        labelId="logged-user"
        id="logged-user"
        className={classes.select}
        inputProps={{
          classes: {
            icon: classes.icon,
          },
        }}
        value={userID}
        onChange={handleChange}
      >
        <MenuItem value={69}>User1</MenuItem>
        <MenuItem value={96}>User2</MenuItem>
        <MenuItem value={2137}>Admin</MenuItem>
        <MenuItem value={420}>Developer1</MenuItem>
        <MenuItem value={997}>Developer2</MenuItem>
      </Select>
    </FormControl>
  );
};

export default UserSelect;
