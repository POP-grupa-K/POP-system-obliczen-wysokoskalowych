import { handleError, handleResponse } from "./apiUtils";
import IApiResponse from "./iApiResponse";
import RequestType from "./requestType";

const apiCall = async <T>(
  url: string,
  requestType: RequestType,
  itemToSend?: T
): Promise<IApiResponse<T | Error>> => {
  const body = JSON.stringify(itemToSend);
  const response = await fetch(url, {
    method: requestType,
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 409) {
        throw new Error("409");
      }
    })
    .then<IApiResponse<T>>((r) => {
      return handleResponse((r as unknown) as T);
    })
    .catch<IApiResponse<Error>>(handleError);
  return response;
};

export default apiCall;
