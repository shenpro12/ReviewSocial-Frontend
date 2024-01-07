import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../constants/textEditorConfig.const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateBack,
  faImages,
  faMapLocation,
} from "@fortawesome/free-solid-svg-icons";
import PostImages from "../postImages/postImages.component";
import DestinationModal from "../destinationModal/destinationModal.component";

function CreatePost() {
  const [riviuText, setRiviuText] = useState("");
  const [images, setImages] = useState();
  const [openDesModal, setOpenDesModal] = useState(false);
  const [destination, setDestination] = useState();
  const [postTitle, setPostTitle] = useState();

  const AddImageHandle = (e) => {
    setImages([...e.target.files]);
  };

  const removePostImageHandle = (image) => {
    setImages(images.filter((i) => i !== image));
  };

  const changeDesHandle = (des) => {
    setOpenDesModal(false);
    setDestination(des);
  };

  useEffect(() => {
    document.title = "Viết Riviu";
  }, []);
  return (
    <div className="bg-white rounded-xl py-5 px-6">
      <h1 className=" font-bold text-3xl font-mono text-center mb-5">
        Viết Riviu
      </h1>
      <div className="flex flex-col lg:flex-row">
        <div className=" pr-3 w-full mb-5 lg:mb-0 lg:w-3/5 mt-5 lg:mt-0">
          <input
            value={postTitle}
            autoFocus={true}
            name="tieuDe"
            className="w-full border-none outline-none text-2xl font-semibold px-4 mb-3"
            placeholder="Tiêu đề..."
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <ReactQuill
            placeholder="bạn có  gì muốn riviu..."
            formats={formats}
            modules={modules}
            style={{
              height: "300px",
              border: "1px solid rgb(172, 172, 172)",
              borderRadius: "12px",
              overflow: "hidden",
              fontSize: "16px",
            }}
            theme="snow"
            value={riviuText}
            onChange={setRiviuText}
          />
          <div className="mt-5 flex flex-wrap">
            <div className="mr-3 mb-3 ">
              <label
                title="Tải ảnh lên"
                className=" w-24 h-24 rounded-md border border-black/20 flex justify-center items-center p-3 flex-col hover:cursor-pointer hover:bg-slate-300/10 duration-200"
              >
                <input
                  className="hidden"
                  type="file"
                  multiple={true}
                  accept=".jpg, .jpeg, .png"
                  onChangeCapture={AddImageHandle}
                />
                <FontAwesomeIcon
                  icon={faImages}
                  className=" text-3xl mb-1"
                ></FontAwesomeIcon>
                <p className="text-xs font-semibold text-black/60">
                  Tải ảnh lên
                </p>
              </label>
            </div>
            {images && images.length
              ? images.map((i, index) => (
                  <PostImages
                    key={index}
                    file={i}
                    removeImage={removePostImageHandle}
                  ></PostImages>
                ))
              : ""}
          </div>
        </div>
        <div className=" h-44 lg:pl-3 w-full lg:w-2/5">
          <h1 className=" text-xl font-bold mb-3 text-black/40">Địa điểm</h1>
          {destination ? (
            <div
              title="Đổi địa điểm"
              className="rounded-lg flex hover:cursor-pointer border border-black/10 border-dashed px-4 py-2 hover:bg-slate-300/10 relative"
              onClick={(e) => {
                setOpenDesModal(true);
              }}
            >
              <div
                title="Đổi địa điểm"
                className=" absolute bg-orange-400 text-white w-7 h-7 rounded-full text-xs duration-200 flex justify-center items-center -right-2 -top-2 hover:bg-orange-500"
              >
                <FontAwesomeIcon icon={faArrowRotateBack}></FontAwesomeIcon>
              </div>
              <div className=" w-24 h-24 overflow-hidden rounded-3xl mr-3">
                <img
                  src={destination.thumb}
                  alt="destination thumb"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 py-1">
                <h1 className="font-bold text-lg">{destination.name}</h1>
                <p className="text-sm text-black/50 font-semibold">
                  {destination.address}
                </p>
              </div>
            </div>
          ) : (
            <div
              className="flex text-black/50 justify-center items-center border border-black/10 border-dashed rounded-lg px-4 py-10 hover:cursor-pointer hover:bg-slate-300/10 "
              onClick={() => setOpenDesModal(true)}
            >
              <FontAwesomeIcon icon={faMapLocation}></FontAwesomeIcon>
              <h1 className="font-semibold ml-2">Nhấn vào để chọn địa điểm</h1>
            </div>
          )}

          <h1 className=" text-xl font-bold mb-3 mt-7 text-black/40">
            Đánh giá
          </h1>

          <div className="text-right mt-7">
            <button className=" bg-orange-400 hover:bg-orange-500 duration-150 text-white px-4 py-2 font-mono font rounded-md">
              Đăng bài
            </button>
          </div>
        </div>
      </div>
      {openDesModal && (
        <DestinationModal
          onClose={() => setOpenDesModal(false)}
          onChooseDes={changeDesHandle}
        ></DestinationModal>
      )}
    </div>
  );
}

export default CreatePost;
