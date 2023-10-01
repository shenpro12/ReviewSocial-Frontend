import axios from "axios";
const request = axios.create({
  baseURL: "https://localhost:7041/api/",
  withCredentials: true,
});

request.interceptors.response.use(
  function (response) {
    return { data: response.data.data, message: response.data.messageText };
  },
  function (err) {
    return errHandle(err);
  }
);

const errHandle = (err) => {
  if (err.response.status == 401) {
  }
  return err;
};

export default request;
