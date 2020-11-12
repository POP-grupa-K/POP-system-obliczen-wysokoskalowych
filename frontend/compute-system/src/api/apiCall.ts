import { handleError, handleResponse } from "./apiUtils";
import IApiResponse from "./iApiResponse";
import RequestType from "./requestType";

const apiCall = async <T>(
  url: string,
  requestType: RequestType
): Promise<IApiResponse<T>> => {
  const response = await fetch(url, {
    method: requestType,
  })
    .then((resp) => resp.json())
    .then<IApiResponse<T>>((r) => {
      return handleResponse((r as unknown) as T);
    })
    .catch<IApiResponse<T>>(handleError);
  return response;
};

export default apiCall;