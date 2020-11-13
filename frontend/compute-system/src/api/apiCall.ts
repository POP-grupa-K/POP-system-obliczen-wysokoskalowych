import { handleError, handleResponse } from "./apiUtils";
import IApiResponse from "./iApiResponse";
import RequestType from "./requestType";

const apiCall = async <T>(
  url: string,
  requestType: RequestType,
  itemToSend?: T
): Promise<IApiResponse<T>> => {
  const body = JSON.stringify(itemToSend);
  const response = await fetch(url, {
    method: requestType,
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((resp) => resp.json())
    .then<IApiResponse<T>>((r) => {
      return handleResponse((r as unknown) as T);
    })
    .catch<IApiResponse<T>>(handleError);
  return response;
};

export default apiCall;
