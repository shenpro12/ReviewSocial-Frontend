import { useContext } from "react";
import { AppContext } from "../../App";

function SideAuth() {
  const _context = useContext(AppContext);

  const toggleAuthHandle = () => {
    _context.publisher.emit("toggleModal");
  };
  return (
    <div className="w-full bg-white rounded-2xl p-4">
      <img
        className="mx-auto mb-3"
        src="https://res.cloudinary.com/dbey8svpl/image/upload/v1700291324/login-logo_fonf4t.svg"
        alt="logo"
      />
      <h1 className="text-center text-black/50 hover:text-black">
        Đăng nhập vào Riviu để cùng nhau ăn khắp nơi chơi khắp chốn bạn nhé!
      </h1>
      <div className="flex justify-around mt-5">
        <button
          className="py-2 w-7/12 bg-orange-200/30 text-orange-400 rounded-xl text-lg hover:bg-orange-200/60 font-semibold"
          onClick={toggleAuthHandle}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
}
export default SideAuth;
