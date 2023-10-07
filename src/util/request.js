import axios from "axios";
const request = axios.create({
  baseURL: "https://localhost:7041/api/",
  withCredentials: true,
});

export function getToken() {
  try {
    return JSON.parse(window.localStorage.getItem("token"));
  } catch (err) {
    return {};
  }
}

request.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }

  return config;
});

request.interceptors.response.use(
  function (response) {
    return {
      data: response.data.data,
      message: response.data.messageText,
      code: response.data.statusCode,
    };
  },
  function (err) {
    return {
      code: err.response.status,
    };
  }
);

export default request;
