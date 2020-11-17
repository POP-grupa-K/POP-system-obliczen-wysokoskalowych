import IApiResponse from "./iApiResponse";
import { APPSTORE_URL } from "./urls";

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

export const createAppImageUrl = (appId: number | string) => {
  return `${APPSTORE_URL}img/${appId}?${Date.now()}`;
};
