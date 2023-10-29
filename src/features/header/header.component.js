import { faBars, faClose, faPenClip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import debounce from "../../util/debound";
import { GetProfile, IsLogin } from "../../app/reducer/userSlice";
import Auth from "../auth/auth.component";
import Search from "./search.component";

function Header() {
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  const isLogin = useSelector(IsLogin);
  const profile = useSelector(GetProfile);
  const container = useRef();

  const toggleMenuHandle = () => {
    setIsToggleMenu(!isToggleMenu);
    if (!isToggleMenu) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  };

  const toggleHeaderHandle = () => {
    if (window.scrollY > 300) {
      container.current.classList.add("fixed");
      container.current.classList.add("animate-fadeDown");
    }
    if (window.scrollY === 0) {
      container.current.classList.remove("fixed");
      container.current.classList.remove("animate-fadeDown");
    }
  };

  useEffect(() => {
    toggleHeaderHandle();
    const scrollCallback = debounce(toggleHeaderHandle);
    document.addEventListener("scroll", scrollCallback);
    return () => {
      document.removeEventListener("scroll", scrollCallback);
    };
  }, []);

  return (
    <div
      className="w-full bg-white px-3 py-5 z-40 shadow-md md:px-0"
      ref={container}
    >
      <div className="container mx-auto xl:max-w-6xl">
        <div className="flex">
          <div className="w-24 h-12 relative">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dbey8svpl/image/upload/v1696128651/logo_wmnuov.png"
                alt="logo"
                className="2-full h-full"
              />
            </Link>
          </div>
          <div className="flex flex-1 justify-end">
            <Search></Search>
            <div className="flex z-0">
              <div
                className={`${
                  isToggleMenu ? "-left-0" : "-left-full"
                } flex items-center justify-center flex-col text-sm fixed bg-white top-0 left-0 bottom-0 w-full duration-500 sm:flex-row sm:justify-between sm:bg-white sm:relative sm:w-max sm:-left-0`}
              >
                <button
                  className="text-orange-500 absolute top-4 right-4 sm:hidden duration-300 hover:text-orange-500/70"
                  onClick={toggleMenuHandle}
                >
                  <FontAwesomeIcon icon={faClose} size="2x"></FontAwesomeIcon>
                </button>
                {isLogin && (
                  <div className="text-white font-bold font-mono rounded-xl border-4 bg-zinc-300/10 overflow-hidden my-3 sm:my-0 sm:hidden sm:mx-2">
                    <Link
                      to="/"
                      className="bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-2 block hover:from-orange-400 hover:to-orange-500"
                    >
                      <h1>Thông tin tài khoản</h1>
                    </Link>
                  </div>
                )}
                {isLogin && (
                  <div className="text-white font-bold font-mono rounded-xl border-4 bg-zinc-300/10 overflow-hidden my-3 sm:my-0 sm:mr-2">
                    <Link
                      to="/"
                      className="flex items-center bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-2 hover:from-orange-400 hover:to-orange-500"
                    >
                      <FontAwesomeIcon icon={faPenClip}></FontAwesomeIcon>
                      <h1 className="ml-2">Viết Riviu</h1>
                    </Link>
                  </div>
                )}
                {isLogin && (
                  <div className="text-white font-bold font-mono rounded-xl border-4 bg-zinc-300/10 overflow-hidden my-3 sm:my-0 sm:mx-2 sm:hidden md:block">
                    <Link
                      to="/"
                      className="bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-2 block hover:from-orange-400 hover:to-orange-500"
                    >
                      <h1>Thêm địa điểm</h1>
                    </Link>
                  </div>
                )}
                <div className="text-white font-bold font-mono rounded-xl border-4 bg-zinc-300/10 overflow-hidden my-3 sm:my-0 sm:hidden sm:mx-2 lg:block">
                  <Link
                    to="/"
                    className="bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-2 block hover:from-orange-400 hover:to-orange-500"
                  >
                    <h1>Liên hệ</h1>
                  </Link>
                </div>
                {isLogin ? (
                  <div className="absolute top-14 sm:relative sm:top-0 sm:w-10 w-20 h-20 sm:ml-2 sm:h-10 rounded-full overflow-hidden">
                    <img
                      src={profile.avatar}
                      className="w-full h-full object-cover"
                      alt="avatar"
                    />
                  </div>
                ) : (
                  <Auth></Auth>
                )}
                {isLogin && (
                  <div className="text-white font-bold font-mono rounded-xl border-4 bg-zinc-300/10 overflow-hidden my-3 sm:my-0 sm:hidden sm:mx-2">
                    <Link
                      to="/"
                      className="bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-2 block hover:from-orange-400 hover:to-orange-500"
                    >
                      <h1>Đăng xuất</h1>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <button
              className="my-auto text-orange-500 sm:hidden"
              onClick={toggleMenuHandle}
            >
              <FontAwesomeIcon icon={faBars} size="2x"></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
