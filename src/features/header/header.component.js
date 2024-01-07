import { faBars, faClose, faPenClip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import debounce from "../../util/debound";
import { GetProfile, IsLogin, logout } from "../../app/reducer/userSlice";
import Auth from "../auth/auth.component";
import Search from "./search.component";
import { LogOutService } from "../../core/services/auth.service";

function Header() {
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  const isLogin = useSelector(IsLogin);
  const profile = useSelector(GetProfile);
  const dispatch = useDispatch();
  const container = useRef();
  const settingsImage = useRef();
  const settingsMenu = useRef();

  const [togleSettings, setTogleSettings] = useState(false);

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

  const logOutHandle = () => {
    LogOutService();
    dispatch(logout());
  };

  useEffect(() => {
    toggleHeaderHandle();
    const scrollCallback = debounce(toggleHeaderHandle);
    document.addEventListener("scroll", scrollCallback);
    return () => {
      document.removeEventListener("scroll", scrollCallback);
    };
  }, []);

  useEffect(() => {
    const documentClickHandle = (e) => {
      if (
        e.target != settingsImage.current &&
        e.target != settingsMenu.current &&
        settingsMenu
      ) {
        setTogleSettings(false);
      }
    };
    document.addEventListener("click", documentClickHandle);
    return () => {
      document.removeEventListener("click", documentClickHandle);
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
            <div className="flex z-10">
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
                      to="/create-post"
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
                    to="/lien-he"
                    className="bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-2 block hover:from-orange-400 hover:to-orange-500"
                  >
                    <h1>Liên hệ</h1>
                  </Link>
                </div>
                {isLogin ? (
                  <div className="absolute top-14 sm:relative sm:top-0 sm:w-10 w-20 h-20 sm:ml-2 sm:h-10 hover:cursor-pointer">
                    <section
                      className="w-full h-full rounded-full overflow-hidden"
                      onClick={() => setTogleSettings(!togleSettings)}
                    >
                      <img
                        ref={settingsImage}
                        src={profile.avatar}
                        className="w-full h-full object-cover"
                        alt="avatar"
                      />
                    </section>
                    <div
                      ref={settingsMenu}
                      className={`absolute bg-white ${
                        togleSettings ? " h-max w-max" : "h-0 w-0 p-0"
                      } right-0 top-12 shadow-md rounded duration-200 overflow-hidden`}
                    >
                      <ul>
                        <li className="py-2 px-4 hover:bg-slate-300/10 hover:text-orange-500 duration-200">
                          <Link to="/">Thông tin tài khoản</Link>
                        </li>
                        <li className="py-2 px-4 hover:bg-slate-300/10 hover:text-orange-500 duration-200">
                          <Link to="/">Địa điểm đã lưu</Link>
                        </li>
                        <li className="py-2 px-4 hover:bg-slate-300/10 hover:text-orange-500 duration-200">
                          <Link to="/">Bài viết đã lưu</Link>
                        </li>
                        <li className="py-2 px-4 hover:bg-slate-300/10 hover:text-orange-500 duration-200">
                          <button onClick={() => logOutHandle()}>
                            Đăng xuất
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Auth></Auth>
                )}
                {isLogin && (
                  <div className="text-white font-bold font-mono rounded-xl border-4 bg-zinc-300/10 overflow-hidden my-3 sm:my-0 sm:hidden sm:mx-2">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-2 block hover:from-orange-400 hover:to-orange-500">
                      <button onClick={logOutHandle}>Đăng xuất</button>
                    </div>
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
