import { useState } from "react";
import SignIn from "./signin.component";
import SignUp from "./signup.component";
import ForgotPassword from "./forgotPassword.component";

function AuthModal({ onClose }) {
  const [activeTab, setActivateTab] = useState("signin");

  const changeActivateTab = (tab) => {
    setActivateTab(tab);
  };

  return (
    <div
      className="fixed top-0 px-10 right-0 bottom-0 left-0 z-50 bg-black/70 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded flex h-max w-full md:w-max"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="hidden md:w-5/12 md:block">
          <img
            src="https://res.cloudinary.com/dbey8svpl/image/upload/v1696728944/backgroud_login_eeatd3.svg"
            alt="authBanner"
          />
        </div>
        <div className="w-full md:w-7/12 py-3 px-4">
          {activeTab === "signin" && (
            <SignIn onSelect={changeActivateTab}></SignIn>
          )}
          {activeTab === "signup" && (
            <SignUp onSelect={changeActivateTab}></SignUp>
          )}
          {activeTab === "forgotpassword" && (
            <ForgotPassword onSelect={changeActivateTab}></ForgotPassword>
          )}
        </div>
      </div>
    </div>
  );
}
export default AuthModal;
