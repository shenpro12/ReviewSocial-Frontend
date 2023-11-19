import { useState } from "react";
import AuthModal from "./authModal.component";
import { useContext } from "react";
import { AppContext } from "../../App";
import { useEffect } from "react";
import PublisherEventName from "../../constants/publisherEventName";
import { useParams } from "react-router-dom";

function Auth() {
  const [toggleModal, setToggleModal] = useState(false);
  const params = useParams();
  const _context = useContext(AppContext);

  const toggleModalHandle = () => {
    setToggleModal(!toggleModal);
  };

  useEffect(() => {
    const toggleHandler = () => {
      setToggleModal(!toggleModal);
    }; //handler xử lý khi sự kiện được kích hoạt, phải khai báo theo kiểu này mới có thể hủy lắng nghe sự kiện
    _context.publisher.subcribe(PublisherEventName.ToggleModal, toggleHandler); //đăng ký nhận thông báo khi sự kiện toggleModal được phát ở các component khác
    return () => {
      // bắt buộc phải hủy đăng ký sự kiện khi component destroy. hạn chế memory leak
      _context.publisher.unSubcribe(
        PublisherEventName.ToggleModal,
        toggleHandler
      );
    };
  }, []);

  return (
    <>
      <div
        className={`text-white font-bold font-mono rounded-xl border-4 bg-zinc-300/10 overflow-hidden my-3 sm:my-0 sm:ml-2 ${
          window.location.pathname === "/" ? "lg:hidden" : ""
        }`}
      >
        <button
          className="bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-2 block hover:from-orange-400 hover:to-orange-500"
          onClick={toggleModalHandle}
        >
          <h1>Đăng nhập</h1>
        </button>
      </div>
      {toggleModal && <AuthModal onClose={toggleModalHandle}></AuthModal>}
    </>
  );
}
export default Auth;
