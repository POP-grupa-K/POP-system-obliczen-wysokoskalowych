export interface User {
  id: number;
  role: string;
  fullname?: string;
}

export enum UserType {
  User = "User",
  Developer = "Developer",
  Admin = "Admin",
}

const mockUsers: User[] = [
  {
    id: 69,
    role: UserType.User,
    fullname: "User 1",
  },
  {
    id: 96,
    role: UserType.User,
    fullname: "User 2",
  },
  {
    id: 2137,
    role: UserType.Admin,
    fullname: "Bożena Admin",
  },
  {
    id: 420,
    role: UserType.Developer,
    fullname: "Deweloper 1",
  },
  {
    id: 997,
    role: UserType.Developer,
    fullname: "Deweloper 2",
  },
];

export default mockUsers;
