import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import mockUsers, { User } from "../../../mocks/common/mockUsers";
import store from "../../../redux/configureStore";
import RootState from "../../../redux/rootState";
import { setUser } from "../../../redux/slices/userSlice";
import { topBarStyles } from "../styles";

const UserSelect = () => {
  const [userID, setUserID] = React.useState<number>(69);
  const currentUser: User = useSelector(
    (state: RootState) => state.userReducer.user
  );
  const classes = topBarStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    var value: number = event.target.value as number;
    setUserID(value);
    store.dispatch(setUser(value));
  };

  React.useEffect(() => {
    setUserID(currentUser.id);
  }, [currentUser]);

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
        {mockUsers.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.fullname}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UserSelect;
