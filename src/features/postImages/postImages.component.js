import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

function PostImages({ file, removeImage }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const img = useRef();
  const fcImg = useRef();

  useEffect(() => {
    img.current.src = URL.createObjectURL(file);
    fcImg.current && (fcImg.current.src = URL.createObjectURL(file));
  }, [file]);

  useEffect(() => {
    isFullScreen &&
      fcImg.current &&
      (fcImg.current.src = URL.createObjectURL(file));
  }, [isFullScreen]);

  return (
    <>
      {isFullScreen ? (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/80 z-10  flex justify-center items-center">
          <div
            className="text-white right-0 top-0 absolute text-3xl py-2 px-5 hover:cursor-pointer"
            onClick={() => setIsFullScreen(false)}
          >
            <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
          </div>
          <img ref={fcImg} className="w-3/5 max-h-screen" alt="postImage" />
        </div>
      ) : (
        ""
      )}
      <div className="mr-3 mb-3 rounded-md relative shadow-md hover:shadow-lg hover:cursor-pointer">
        <div
          title="Xóa ảnh"
          className=" absolute w-6 h-6 bg-orange-400 rounded-full -right-2 -top-2 flex justify-center items-center text-white text-xs hover:cursor-pointer hover:bg-orange-500 duration-200"
          onClick={() => removeImage(file)}
        >
          <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
        </div>
        <img
          ref={img}
          className="w-24 h-24 rounded-md"
          alt="postImage"
          onClick={(e) => setIsFullScreen(!isFullScreen)}
        />
      </div>
    </>
  );
}
export default PostImages;
