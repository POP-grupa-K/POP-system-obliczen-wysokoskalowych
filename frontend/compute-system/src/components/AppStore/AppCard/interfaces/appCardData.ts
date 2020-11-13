export default interface AppCardData {
  idApp: number;
  nameApp: string;
  dateUpdate: string;
  descriptionApp: string;
  ranking: number;
  timesUsed: number;
}

export const initialAppCardData: AppCardData = {
  idApp: 0,
  nameApp: "",
  dateUpdate: "",
  descriptionApp: "",
  ranking: 0,
  timesUsed: 0,
};
