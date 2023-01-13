import axios from "axios";

const authToken = "YOUR_AUTH_TOKEN";

const AxiosPost = async (data: any, apiRoute: string) => {
  console.log(apiRoute);
  try {
    const response = await axios.post(`${apiRoute}`, data, {
      headers: {},
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default AxiosPost;
