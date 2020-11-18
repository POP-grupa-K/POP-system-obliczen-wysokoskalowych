export default interface IApiResponse<T> {
  isError: boolean;
  content: T;
}

export interface IMessageResponse {
  message: string | number;
}
