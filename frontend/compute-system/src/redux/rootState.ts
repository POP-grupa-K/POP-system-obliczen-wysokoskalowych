import { User } from "../mocks/common/mockUsers";

export default interface RootState {
  userReducer: {
    user: User;
  };
}
