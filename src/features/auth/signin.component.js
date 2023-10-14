import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";
import HttpClient from "../../util/httpClient";
import FormData from "form-data";
import RequestLoading from "../app-loading/requestLoading.component";
import { useDispatch } from "react-redux";
import { login } from "../../app/reducer/userSlice";

function SignIn({ onSelect }) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const signinHandle = async () => {
    if (!userName || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (!validator.isLength(userName, { min: 6 })) {
      toast.error("UserName không hợp lệ!");
      return;
    }
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("password", password);
    const token = await HttpClient.post("auth/signin", setLoading, formData);

    window.localStorage.setItem("token", JSON.stringify(token.data));

    const user = await HttpClient.get("UserProfile", setLoading);
    dispatch(login(user.data));
  };
  return (
    <div className="w-full h-full p-3 flex flex-col items-center justify-center">
      {loading && <RequestLoading></RequestLoading>}
      <h1 className="text-4xl font-semibold text-orange-500 mb-10">
        Đăng nhập
      </h1>
      <div className="w-full flex items-center flex-col">
        <div className="py-3 w-full sm:w-4/6 bg-neutral-400/10 px-6 border border-black/10 rounded-full my-2 focus-within:border-orange-500 duration-200">
          <input
            placeholder="Tên đăng nhập"
            className="text-lg w-full bg-transparent outline-none"
            onInput={(e) => {
              console.log(e);
              setUserName(e.target.value);
            }}
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
        <div className="w-full sm:w-4/6 mt-1 text-black/60 text-right">
          <p
            className="duration-200 hover:cursor-pointer hover:text-orange-500 inline-block pr-3"
            onClick={() => onSelect("forgotpassword")}
          >
            Quên mật khẩu?
          </p>
        </div>
        <div className="text-white text-lg w-full sm:w-4/6 mt-7 flex justify-center font-bold font-mono bg-zinc-300/10 overflow-hidden my-3">
          <button
            className="w-2/4 text-center rounded-xl items-center bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-2 hover:from-orange-400 hover:to-orange-500"
            onClick={signinHandle}
          >
            Đăng nhập
          </button>
        </div>
        <div className="text-orange-500 text-lg w-full sm:w-4/6 mt-1 flex justify-center font-bold bg-zinc-300/10 overflow-hidden my-3">
          <button
            className=" w-max text-center rounded-xl items-center px-3 py-2"
            onClick={() => onSelect("signup")}
          >
            Tạo tài khoản
          </button>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
