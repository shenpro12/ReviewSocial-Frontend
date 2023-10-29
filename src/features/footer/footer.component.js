import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import debounce from "../../util/debound";

function Footer() {
  const goTopBtn = useRef();

  const goToTopHandle = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const toggleGoToTopHandle = () => {
    if (window.scrollY < 300) {
      goTopBtn.current.classList.remove("md:flex");
    } else {
      goTopBtn.current.classList.add("md:flex");
    }
  };

  useEffect(() => {
    toggleGoToTopHandle();
    const scrollCallback = debounce(toggleGoToTopHandle);
    document.addEventListener("scroll", scrollCallback);
    return () => {
      document.removeEventListener("scroll", scrollCallback);
    };
  }, []);
  return (
    <div className="w-full mt-14 -z-10 px-3 pb-6 md:px-0 relative border-t-2 border-neutral-200/50 pt-5">
      <button
        ref={goTopBtn}
        className="bg-white animate-bounce hidden fixed right-5 bottom-5 w-10 h-10 rounded-full justify-center items-center border border-orange-500/50 text-orange-500 duration-200 hover:bg-orange-500 hover:text-white"
        onClick={goToTopHandle}
      >
        <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
      </button>
      <div className="container mx-auto xl:max-w-6xl">
        <div className="w-full border-b pb-6 sm:flex sm:justify-between mb-6">
          <div className="flex items-center">
            <img
              src="https://res.cloudinary.com/dbey8svpl/image/upload/v1696124001/Untitled_w8c4d2.png"
              className="w-10 h-10 mr-3"
              alt="main icon"
            />
            <h1>Ăn khắp nơi chơi khắp chốn</h1>
          </div>
          <div className="leading-10 text-right">
            <Link
              to={"/"}
              className="ml-5 inline-block text-black/70 text-base duration-150 hover:text-black"
            >
              <h1>Về chúng tôi</h1>
            </Link>
            <Link
              to={"/"}
              className="ml-5 inline-block text-black/70 text-base duration-150 hover:text-black"
            >
              <h1>Liên hệ</h1>
            </Link>
            <Link
              to={"/"}
              className="ml-5 inline-block text-black/70 text-base duration-150 hover:text-black"
            >
              <h1>Chính sách</h1>
            </Link>
          </div>
        </div>
        <h2 className="text-black/50 font-medium">
          © Công Ty TNHH Một Mình Tui • Địa chỉ: 234 Trần Hưng Đạo, Phường 2,
          Quận 5, HCM • Số điện thoại: 091 6565632 • Mã số thuế: 0316164433 Giấy
          phép thiết lập MXH số 123/GP-BTTTT , Ký ngày : 17/11/2020
        </h2>
      </div>
    </div>
  );
}

export default Footer;
