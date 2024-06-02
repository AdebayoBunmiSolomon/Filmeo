import axios from "axios";
import { BASE_URL } from "@env";

export const PostRequest = async (url: string, payload: any, headers: any) => {
  try {
    const { data, status } = await axios.post(
      `${BASE_URL}${url}`,
      payload,
      headers
    );
    // const { status, data } = res;
    console.log(data);
    return { status, data };
  } catch (err: any) {
    const error = err;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);

      return { status: error.request.status, data: null };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      return { status: error.request.status, data: null };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      return { status: error.request.status, data: null };
    }
    // console.log(error.config);
  }
};
