import { faBars, faClose, faPenClip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import debounce from "../../util/debound";

function Header() {
  const [isToggleMenu, setIsToggleMenu] = useState(false);
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
        <div className="flex justify-between">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dbey8svpl/image/upload/v1696128651/logo_wmnuov.png"
              className="w-24 h-12"
              alt="logo"
            />
          </Link>
          <div
            className={`${
              isToggleMenu ? "-left-0" : "-left-full"
            } flex items-center justify-center flex-col text-sm fixed bg-white top-0 left-0 bottom-0 w-full z-40 duration-500 sm:flex-row sm:justify-between sm:bg-white sm:relative sm:w-max sm:-left-0`}
          >
            <button
              className="text-orange-500 absolute top-4 right-4 sm:hidden duration-300 hover:text-orange-500/70"
              onClick={toggleMenuHandle}
            >
              <FontAwesomeIcon icon={faClose} size="2x"></FontAwesomeIcon>
            </button>
            <div className="text-white font-bold font-mono rounded-xl mx-2 border-4 bg-zinc-300/10 overflow-hidden my-3 sm:my-0">
              <Link
                to="/"
                className="flex items-center bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-2 hover:from-orange-400 hover:to-orange-500"
              >
                <FontAwesomeIcon icon={faPenClip}></FontAwesomeIcon>
                <h1 className="ml-2">Viết Riviu</h1>
              </Link>
            </div>
            <div className="text-white font-bold font-mono rounded-xl mx-2 border-4 bg-zinc-300/10 overflow-hidden my-3 sm:my-0">
              <Link
                to="/"
                className="bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-2 block hover:from-orange-400 hover:to-orange-500"
              >
                <h1>Thêm địa điểm</h1>
              </Link>
            </div>
            <div className="text-white font-bold font-mono rounded-xl ml-2 border-4 bg-zinc-300/10 overflow-hidden my-3 sm:my-0">
              <Link
                to="/"
                className="bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-2 block hover:from-orange-400 hover:to-orange-500"
              >
                <h1>Liên hệ</h1>
              </Link>
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
  );
}

export default Header;
