import IApiResponse from "./iApiResponse";

export const handleResponse = async <T>(
  response: T
): Promise<IApiResponse<T>> => {
  return {
    isError: false,
    content: response as T,
  };
};

export const handleError = <T>(error: any): IApiResponse<T> => {
  return {
    isError: true,
    content: error,
  };
};
