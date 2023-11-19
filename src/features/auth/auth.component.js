import { useState } from "react";
import AuthModal from "./authModal.component";
import { useContext } from "react";
import { AppContext } from "../../App";
import { useEffect } from "react";

function Auth() {
  const [toggleModal, setToggleModal] = useState(false);
  const _context = useContext(AppContext);

  const toggleModalHandle = () => {
    setToggleModal(!toggleModal);
  };

  useEffect(() => {
    const toggleHandler = () => {
      setToggleModal(!toggleModal);
    };
    _context.publisher.subcribe("toggleModal", toggleHandler);
    return () => {
      _context.publisher.unSubcribe("toggleModal", toggleHandler);
    };
  }, []);

  return (
    <>
      <div className="text-white font-bold font-mono rounded-xl border-4 bg-zinc-300/10 overflow-hidden my-3 sm:my-0 sm:ml-2 lg:hidden">
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
