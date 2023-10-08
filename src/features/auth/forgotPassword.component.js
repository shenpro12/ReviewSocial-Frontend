import { useState } from "react";

function ForgotPassword({ onSelect }) {
  const [email, setEmail] = useState("");

  return (
    <div className="w-full h-full p-3 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold text-orange-500 mb-10">
        Quên mật khẩu
      </h1>
      <div className="w-full flex items-center flex-col">
        <div className="w-full sm:w-4/6 flex items-center">
          <div className="py-3 w-full bg-neutral-400/10 px-6 border border-black/10 rounded-full my-2 focus-within:border-orange-500 duration-200">
            <input
              placeholder="Email đăng ký"
              className="text-lg w-full bg-transparent outline-none"
              onInput={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="text-white text-lg w-full sm:w-4/6 mt-7 flex justify-center font-bold font-mono bg-zinc-300/10 overflow-hidden my-3">
          <button className="w-2/4 text-center rounded-xl items-center bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-2 hover:from-orange-400 hover:to-orange-500">
            Xác nhận
          </button>
        </div>
        <div className="text-orange-500 text-lg w-full sm:w-4/6 mt-1 flex justify-center font-bold bg-zinc-300/10 overflow-hidden my-3">
          <button
            className="w-max text-center rounded-xl items-center px-3 py-2"
            onClick={() => onSelect("signup")}
          >
            Tạo tài khoản
          </button>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;
