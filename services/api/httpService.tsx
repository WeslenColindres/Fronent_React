import axios, { AxiosResponse } from "axios";
import { HttpRequestOptions } from "../../src/interfaces/Interfaces";

export const sendHttpRequest = async (
  { url, method, data, authToken }: HttpRequestOptions,
  onSuccess: (response: AxiosResponse) => void,
  onError: (error: any) => void
) => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (authToken) {
      headers["Authorization"] = `Token ${authToken}`;
    }
    const response = await axios({
      url,
      method,
      data,
      headers,
      withCredentials: true,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export const getAuthToken = () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {

      console.log("No token found");
      return null;
    }
    return token;
  } catch (error) {

    console.error("Something went wrong accessing the local storage", error);
    return null;
  }
};
