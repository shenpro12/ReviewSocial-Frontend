import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function SignUp({ onSelect }) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="w-full h-full p-3 flex flex-col items-center justify-center">
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
        <div className="py-3 flex items-center w-full sm:w-4/6 bg-neutral-400/10 px-6 border border-black/10 rounded-full my-2 focus-within:border-orange-500 duration-200">
          <input
            placeholder="Xác nhận mật khẩu"
            type={isShowConfirmPassword ? "text" : "password"}
            className="text-lg w-full bg-transparent outline-none mr-3"
            onInput={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="w-7 text-center">
            {isShowPassword ? (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="hover:cursor-pointer hover:text-orange-500 duration-200"
                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              ></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon
                icon={faEye}
                className="hover:cursor-pointer hover:text-orange-500 duration-200"
                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              ></FontAwesomeIcon>
            )}
          </div>
        </div>
        <div className="text-white text-lg w-full sm:w-4/6 mt-7 flex justify-center font-bold font-mono bg-zinc-300/10 overflow-hidden my-3">
          <button className="w-2/4 text-center rounded-xl items-center bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-2 hover:from-orange-400 hover:to-orange-500">
            Xác nhận
          </button>
        </div>
        <div className="text-orange-500 text-lg w-full sm:w-4/6 mt-1 flex justify-center font-bold bg-zinc-300/10 overflow-hidden my-3">
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
