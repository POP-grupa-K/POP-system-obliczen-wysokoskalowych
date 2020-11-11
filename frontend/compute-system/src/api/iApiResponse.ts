export default interface IApiResponse<T> {
  isError: boolean;
  content: T;
}
