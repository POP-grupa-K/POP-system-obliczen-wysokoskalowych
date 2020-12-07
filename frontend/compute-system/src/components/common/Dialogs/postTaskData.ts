export default interface PostTaskData {
  name: string;
  reservedCredits: number;
  idApp: number;
  userId: number;
}

export const initialTaskData: PostTaskData = {
  name: "",
  reservedCredits: 0,
  idApp: 0,
  userId: 0,
};
