import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import PublisherEventName from "../../constants/publisherEventName";
import { useSelector } from "react-redux";
import { GetProfile, IsLogin } from "../../app/reducer/userSlice";

function SideAuth() {
  const _context = useContext(AppContext);
  const profile = useSelector(GetProfile);
  const isLogin = useSelector(IsLogin);

  useEffect(() => {
    console.log();
  });

  const toggleAuthHandle = () => {
    _context.publisher.emit(PublisherEventName.ToggleModal);
  };
  return isLogin ? (
    <div className="p-4 bg-white rounded-xl shadow-sm">
      <div className="flex border-b pb-4 mb-2">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src={profile.avatar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-start flex-col justify-center pl-3">
          <div>
            <h1 className=" font-semibold text-lg">{profile.name}</h1>
          </div>
          <div>
            <p className="text-black/50 font-semibold">{profile.identify}</p>
          </div>
        </div>
      </div>
      <div className="flex ">
        <div className=" flex-1 text-center">
          <h1 className="font-semibold text-lg mb-1">1</h1>
          <p className="text-black/50 text-sm font-semibold">Posts</p>
        </div>
        <div className=" flex-1 text-center">
          <h1 className="font-semibold text-lg mb-1">1</h1>
          <p className="text-black/50 text-sm font-semibold">Followers</p>
        </div>
        <div className=" flex-1 text-center">
          <h1 className="font-semibold text-lg mb-1">1</h1>
          <p className="text-black/50 text-sm font-semibold">Followings</p>
        </div>
      </div>
    </div>
  ) : (
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
