export default interface PostTaskData {
  name: string;
  reservedCredits: number;
  idApp: number;
  idUser: number;
  priority: string;
}

export const initialTaskData: PostTaskData = {
  name: "",
  reservedCredits: 0,
  idApp: 0,
  idUser: 0,
  priority: "1",
};
