function SideAuth() {
  return (
    <div className="w-full bg-white rounded-2xl p-4">
      <img
        className="mx-auto mb-3"
        src="https://res.cloudinary.com/dbey8svpl/image/upload/v1700291324/login-logo_fonf4t.svg"
      />
      <h1 className="text-center text-black/50 hover:text-black">
        Đăng nhập vào Riviu để cùng nhau ăn khắp nơi chơi khắp chốn bạn nhé!
      </h1>
      <div className="flex justify-around mt-5">
        <button className="px-3 py-2 w-5/12 bg-neutral-200 text-black rounded-xl hover:bg-neutral-300">
          Đăng ký
        </button>
        <button className="px-3 py-2 w-5/12 bg-orange-200/30 text-orange-400 rounded-xl hover:bg-orange-200/60">
          Đăng nhập
        </button>
      </div>
    </div>
  );
}
export default SideAuth;
