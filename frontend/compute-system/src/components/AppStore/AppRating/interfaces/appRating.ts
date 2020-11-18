export default interface IAppRating {
  idRating?: number;
  idApp?: number;
  idUser: number;
  comm: string;
  value: number;
  dateUpdate?: string;
}

const initialAppRating: IAppRating = {
  idRating: 0,
  idApp: 0,
  idUser: 0,
  comm: "",
  value: 0,
  dateUpdate: "",
};

export const initialAppRatings: IAppRating[] = [initialAppRating];
