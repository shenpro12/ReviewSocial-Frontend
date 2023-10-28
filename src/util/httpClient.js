import { toast } from "react-toastify";
import request from "./request";
import { getToken } from "./request";

export default class HttpClient {
  static async get(url, setLoading, callBack) {
    return await fetchWithoutData(url, setLoading, "get", callBack);
  }
  static async delete(url, setLoading, callBack) {
    return await fetchWithoutData(url, setLoading, "delete", callBack);
  }
  static async post(url, setLoading, data, callBack) {
    return await fetchWithData(url, setLoading, "post", data, callBack);
  }
  static async put(url, setLoading, data, callBack) {
    return await fetchWithData(url, setLoading, "put", data, callBack);
  }
  static async patch(url, setLoading, data, callBack) {
    return await fetchWithData(url, setLoading, "patch", data, callBack);
  }
}

async function fetchWithoutData(url, setLoading, method, callBack) {
  const instance = request[method].bind(request); //tạo instance để có thể gọi lại api khi bị lỗi 401 ở hàm check lỗi
  setLoading(true);
  const res = await instance(url);
  if (res.code >= 200 && res.code < 300) {
    setLoading(false);
    callBack && callBack();
    return res.data;
  }
  if (res.code >= 400 && res.code < 600) {
    return await errHandle(res, instance, url, setLoading);
  }
}

async function fetchWithData(url, setLoading, method, data, callBack) {
  const instance = request[method].bind(request);
  setLoading(true);
  const res = await instance(url, data && data, {
    headers: {
      "Content-Type": "multipart/form-data", //tất cả các method trừ get, delete fai set contentType nếu có dữ liệu đẩy lên server
    },
  });
  if (res.code >= 200 && res.code < 300) {
    setLoading(false);
    callBack && callBack();
    return res.data;
  }
  if (res.code >= 400 && res.code < 600) {
    return await errHandle(res, instance, url, setLoading, data && data);
  }
}

async function errHandle(res, instance, url, setLoading, data) {
  if (res.code === 400) {
    //các lỗi khi fetch thành công nhưng mà code là 400
    toast.error(res.message);
    setLoading(false);
  } else if (res.code === 401) {
    //xử lý lỗi auth
    //lấy token hiện tại
    const token = getToken();
    if (token) {
      //nếu token tồn tại thì gọi api để lấy accessToken mới
      const refeshInfo = await request.post(
        "auth/refeshToken",
        `${token.refeshToken}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //nếu phát sinh lỗi trong quá trình lấy token thì logout user luôn
      if (refeshInfo.code >= 400 && refeshInfo.code < 600) {
        toast.error("Hết phiên đăng nhập!");
        window.localStorage.removeItem("token");
        setLoading(false);
        return;
      }
      //nếu lấy thành công thì set token mới vào bộ nhớ
      if (refeshInfo.code === 200) {
        const newToken = {
          accessToken: refeshInfo.data.accessToken,
          refeshToken: token.refeshToken,
        };
        window.localStorage.setItem("token", JSON.stringify(newToken));
        //sau khi lấy dc token mới thì gọi lại api bị lỗi ở phase trước và trả ra dữ liệu
        const reFetchData = await instance(url, data && data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setLoading(false);
        return reFetchData;
      }
    }
    setLoading(false);
  } else {
    //các lỗi khác
    toast.error("Có gì đó không đúng! Vui lòng thử lại!");
    setLoading(false);
  }
}
