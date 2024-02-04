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
import Rate from "../rate/rate.component";
import { useSelector } from "react-redux";
import { IsLogin } from "../../app/reducer/userSlice";
import { useNavigate } from "react-router-dom";
import { getCurrProvince } from "../../app/reducer/provinceSlice";
import { toast } from "react-toastify";
import SelectBoxChip from "../select/select-chip/select-chip.component";
import SelectBox from "../select/select/select.component";
import HttpClient from "../../util/httpClient";
import FormData from "form-data";

function CreatePost() {
  const [riviuText, setRiviuText] = useState("");
  const [images, setImages] = useState([]);
  const [openDesModal, setOpenDesModal] = useState(false);
  const [destination, setDestination] = useState();
  const [postTitle, setPostTitle] = useState("");
  const [rate, setRate] = useState();
  const isLogin = useSelector(IsLogin);
  const navigate = useNavigate();
  const currProvince = useSelector(getCurrProvince);
  const [provinCategory, setProvinCategory] = useState(null);
  const [category, setCategory] = useState(null);

  const [provinceCategoryData, setProvinceCategoryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [loading, setLoading] = useState(false);

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

  const createPostHandle = async () => {
    if (
      postTitle &&
      riviuText &&
      destination &&
      rate &&
      currProvince &&
      provinCategory
    ) {
      console.log(images);
      const formData = new FormData();
      formData.append("title", postTitle);
      formData.append("template", riviuText);
      formData.append("destinationID", destination.id);
      formData.append("provinceID", currProvince.id);
      formData.append("provinceCategoryID", provinCategory.id);

      images.map((item) => {
        formData.append("images", item);
      });

      category.map((item) => {
        formData.append("categoryID[]", item.id);
      });

      rate.forEach((obj, index) => {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            formData.append(`rate[${index}].${key}`, obj[key]);
          }
        }
      });

      await HttpClient.post("Post", setLoading, formData, () => {
        toast.success("Đăng bài thành công!");
      });
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  useEffect(() => {
    document.title = "Viết Riviu";
  }, []);

  useEffect(() => {
    (async () => {
      const res = await HttpClient.get(
        `ProvinceCategory/getByProvince/${currProvince.id}`,
        () => {}
      );
      setProvinceCategoryData(res.items);
    })();
    setCategory(null);
    setProvinCategory(null);
  }, [currProvince]);

  useEffect(() => {
    (async () => {
      const res = await HttpClient.get(`Category/getAll`, () => {});
      setCategoryData(res);
    })();
  }, []);

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin]);
  return (
    <div className="bg-white rounded-xl py-7 px-6">
      <h1 className=" font-bold text-3xl font-mono text-center mb-5">
        Viết Riviu
      </h1>
      <div className="flex flex-col lg:flex-row">
        <div className=" lg:pr-6 w-full mb-5 lg:mb-0 lg:w-3/5 mt-5 lg:mt-0">
          <input
            value={postTitle}
            autoFocus={true}
            name="tieuDe"
            className="w-full outline-none text-xl font-semibold px-4 mb-3 border-2 border-black/20 py-3 rounded-xl"
            placeholder="Tiêu đề*"
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <ReactQuill
            placeholder="bạn có  gì muốn riviu*"
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
          <SelectBox
            items={provinceCategoryData}
            label={`Danh mục thuộc ${currProvince.name}`}
            require={true}
            onChange={setProvinCategory}
            value={provinCategory}
          ></SelectBox>
          <SelectBoxChip
            items={categoryData}
            label={"Danh mục chung"}
            multiple={true}
            onChange={setCategory}
            value={category}
          ></SelectBoxChip>
          <div className="mt-3 flex flex-wrap">
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
        <div className=" lg:pl-6 w-full lg:w-2/5">
          <h1 className=" text-xl font-bold mb-3 text-black/40">
            Địa điểm tại {currProvince.name}
          </h1>
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
              <h1 className="font-semibold ml-2">Nhấn vào để chọn địa điểm*</h1>
            </div>
          )}

          <h1 className=" text-xl font-bold mb-3 mt-7 text-black/40 border-b pb-4">
            Đánh giá*
          </h1>

          <Rate onChangeRate={(rate) => setRate(rate)}></Rate>

          <h1 className="mt-3 font-bold text-red-500 text-xs font-mono">
            *<span className="font-normal text-black/60"> : Bắt buộc</span>
          </h1>

          <div className="text-center md:text-right mt-7">
            <button
              className=" bg-orange-400 hover:bg-orange-500 duration-150 text-white px-4 py-2 font-mono font rounded-md"
              onClick={createPostHandle}
            >
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
