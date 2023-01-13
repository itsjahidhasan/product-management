import axios from "axios";

const AxiosGet = async (apiRoute: string) => {
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  try {
    const response = await axiosInstance.get(`${apiRoute}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
export default AxiosGet;
