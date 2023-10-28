import { faClose, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProvince,
  getAll,
  getCurrProvince,
} from "../../app/reducer/provinceSlice";
import { useEffect, useState } from "react";
import styled from "./header.module.css";

function Search() {
  const [toggleProvinceSelect, setToggleProvinceSelect] = useState(false);
  const [renderItems, setRenderItems] = useState([]);
  const currProvince = useSelector(getCurrProvince);
  const provinces = useSelector(getAll);
  const dispatch = useDispatch();

  const changeProvinceHandler = (id) => {
    dispatch(changeProvince(id));
  };

  const searchProvinceHandle = (kw) => {
    if (kw) {
      setRenderItems(
        provinces.filter((i) => i.name.toLowerCase().includes(kw.toLowerCase()))
      );
    } else {
      setRenderItems(provinces);
    }
  };

  useEffect(() => {
    setRenderItems(provinces);
  }, [provinces]);

  return (
    <div className="flex px-5 py-3 bg-neutral-100/50 rounded-full border border-neutral-200/60 mr-3">
      {toggleProvinceSelect && (
        <div
          className="fixed bg-white/50 z-50 flex justify-center top-0 left-0 right-0 bottom-0"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="bg-white rounded-lg w-11/12 h-475px sm:w-475px border-2 border-black/10 mt-10 overflow-hidden">
            <header className="flex px-7 py-4 items-center border border-black/10">
              <h1 className="font-bold flex-1 text-center">Chọn khu vực</h1>
              <FontAwesomeIcon
                icon={faClose}
                className="text-lg hover:cursor-pointer"
                onClick={() => {
                  setToggleProvinceSelect(!toggleProvinceSelect);
                }}
              ></FontAwesomeIcon>
            </header>
            <div
              className={`p-3 h-full overflow-y-scroll ${styled.custom_scrollbar}`}
            >
              <div className="flex px-5 py-3 bg-neutral-100/50 rounded-full border border-neutral-200/60 mb-5 mt-3">
                <div>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className=" text-black/20 text-lg"
                  ></FontAwesomeIcon>
                </div>
                <div>
                  <input
                    placeholder="Tìm kiếm"
                    className=" bg-transparent outline-none pl-3 pr-7"
                    onInput={(e) => searchProvinceHandle(e.target.value)}
                  />
                </div>
              </div>
              <ul>
                {renderItems.length
                  ? renderItems.map((i) => (
                      <li
                        className={`py-3 px-2 font-medium hover:bg-cyan-100/20 hover:text-orange-500 hover:cursor-pointer`}
                        key={i.id}
                        onClick={() => {
                          if (i.id != currProvince.id) {
                            changeProvinceHandler(i.id);
                            setToggleProvinceSelect(!toggleProvinceSelect);
                          }
                        }}
                      >
                        <p>
                          {i.name}{" "}
                          <span className=" text-black/50 text-sm italic font-normal">
                            {i.id == currProvince.id && "(Hiện tại)"}
                          </span>
                        </p>
                      </li>
                    ))
                  : ""}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="flex">
        <div>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className=" text-black/20 text-lg"
          ></FontAwesomeIcon>
        </div>
        <div>
          <input
            placeholder="Tìm kiếm review"
            className=" bg-transparent outline-none pl-3 pr-7"
          />
        </div>
      </div>
      <div>
        <h1
          className="font-bold text-black/60 hover:cursor-pointer hover:text-black duration-150"
          title="Tỉnh/Thành"
          onClick={() => setToggleProvinceSelect(!toggleProvinceSelect)}
        >
          {currProvince.name}
        </h1>
      </div>
    </div>
  );
}

export default Search;
