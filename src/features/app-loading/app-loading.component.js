import { useCallback, useEffect, useRef } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import particlesOptions from "../../constants/particleOptions";

function AppLoading({ loading }) {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const container = useRef();
  const ticker = useRef();

  useEffect(() => {
    if (loading) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    clearTimeout(ticker.current);
    ticker.current = setTimeout(() => {
      if (loading) {
        container.current.classList.add("z-50");
        container.current.classList.remove("-z-10");
      } else {
        container.current.classList.add("-z-10");
        container.current.classList.remove("z-50");
      }
    }, 700);
  }, [loading]);

  return (
    <div
      ref={container}
      className={`flex justify-center items-center flex-col fixed top-0 left-0 bottom-0 right-0 z-50 duration-700 ${
        loading ? "opacity-100" : "opacity-0"
      }`}
    >
      <Particles
        className="z-10"
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />
      <img
        className="z-20"
        alt="logo"
        width="150px"
        height="150px"
        src="https://res.cloudinary.com/dbey8svpl/image/upload/v1696060251/favicon_th1bhh.png"
      />
      <div className="mt-5 text-lg font-bold font-mono text-black z-20 flex items-center justify-between w-24 text-black/80">
        <FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon>
        <h1>Loading</h1>
      </div>
    </div>
  );
}

export default AppLoading;
