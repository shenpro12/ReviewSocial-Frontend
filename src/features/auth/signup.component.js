import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import validator from "validator";
import FormData from "form-data";
import { toast } from "react-toastify";
import HttpClient from "../../util/httpClient";
import RequestLoading from "../app-loading/requestLoading.component";

function SignUp({ onSelect }) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpHandle = async () => {
    if (!userName || !password || !email) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (!validator.isLength(userName, { min: 6 })) {
      toast.error("UserName không hợp lệ!");
      return;
    }
    if (!validator.isLength(password, { min: 8 })) {
      toast.error("Password không hợp lệ!");
      return;
    }
    if (!validator.isEmail(email)) {
      toast.error("Email không hợp lệ!");
      return;
    }
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    await HttpClient.post("auth/signup", setLoading, formData, () => {
      toast.success("Đăng ký thành công!");
      onSelect("signin");
    });
  };
  return (
    <div className="w-full h-full p-3 flex flex-col items-center justify-center">
      {loading && <RequestLoading></RequestLoading>}
      <h1 className="text-4xl font-semibold text-orange-500 mb-10">Đăng ký</h1>
      <div className="w-full flex items-center flex-col">
        <div className="py-3 w-full sm:w-4/6 bg-neutral-400/10 px-6 border border-black/10 rounded-full my-2 focus-within:border-orange-500 duration-200">
          <input
            placeholder="Tên đăng nhập"
            className="text-lg w-full bg-transparent outline-none"
            onInput={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="py-3 flex items-center w-full sm:w-4/6 bg-neutral-400/10 px-6 border border-black/10 rounded-full my-2 focus-within:border-orange-500 duration-200">
          <input
            placeholder="Email"
            className="text-lg w-full bg-transparent outline-none mr-3"
            onInput={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="py-3 flex items-center w-full sm:w-4/6 bg-neutral-400/10 px-6 border border-black/10 rounded-full my-2 focus-within:border-orange-500 duration-200">
          <input
            placeholder="Mật khẩu"
            type={isShowPassword ? "text" : "password"}
            className="text-lg w-full bg-transparent outline-none mr-3"
            onInput={(e) => setPassword(e.target.value)}
          />
          <div className="w-7 text-center">
            {isShowPassword ? (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="hover:cursor-pointer hover:text-orange-500 duration-200"
                onClick={() => setIsShowPassword(!isShowPassword)}
              ></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon
                icon={faEye}
                className="hover:cursor-pointer hover:text-orange-500 duration-200"
                onClick={() => setIsShowPassword(!isShowPassword)}
              ></FontAwesomeIcon>
            )}
          </div>
        </div>
        <div className="text-white text-lg w-full sm:w-4/6 mt-7 flex justify-center font-bold font-mono overflow-hidden my-3">
          <button
            className="w-2/4 text-center rounded-xl items-center bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-2 hover:from-orange-400 hover:to-orange-500"
            onClick={signUpHandle}
          >
            Xác nhận
          </button>
        </div>
        <div className="text-orange-500 text-lg w-full sm:w-4/6 mt-1 flex justify-center font-bold overflow-hidden my-3">
          <button
            className="w-2/4 text-center rounded-xl items-center px-3 py-2"
            onClick={() => onSelect("signin")}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
