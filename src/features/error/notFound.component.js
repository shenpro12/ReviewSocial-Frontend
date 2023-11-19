import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <h1 className="font-bold text-3xl px-10 font-mono mb-10">
        Xin lỗi trang bạn kiếm không tồn tại! Về{" "}
        <Link
          to="/"
          className="text-orange-300 hover:text-orange-500 duration-150"
        >
          Trang chủ
        </Link>
      </h1>
      <img
        className="mx-auto mb-3"
        src="https://res.cloudinary.com/dbey8svpl/image/upload/v1700291324/login-logo_fonf4t.svg"
        alt="logo"
      />
    </div>
  );
}
export default NotFound;
