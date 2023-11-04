import { faClose, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProvince,
  getAll,
  getCurrProvince,
} from "../../app/reducer/provinceSlice";
import { useEffect, useRef, useState } from "react";
import styled from "./header.module.css";
import { Link } from "react-router-dom";

function Search() {
  const [toggleProvinceSelect, setToggleProvinceSelect] = useState(false);
  const [toggleMobileSearch, setToggleMobileSearch] = useState(false);
  const [toggleSearchRecomment, setToggleSearchRecomment] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [renderItems, setRenderItems] = useState([]);
  const currProvince = useSelector(getCurrProvince);
  const provinces = useSelector(getAll);
  const dispatch = useDispatch();

  const searchInput = useRef();
  const provinceSearchInput = useRef();

  const changeProvinceHandler = (id) => {
    dispatch(changeProvince(id));
    searchProvinceHandle();
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

  useEffect(() => {
    toggleMobileSearch && searchInput.current.focus();
  }, [toggleMobileSearch]);

  useEffect(() => {
    toggleProvinceSelect && provinceSearchInput.current.focus();
  }, [toggleProvinceSelect]);
  return (
    <div
      className={`${
        toggleMobileSearch &&
        "fixed top-0 left-0 bottom-0 right-0 bg-black/90 z-40 pt-20"
      } px-7 sm:relative sm:bg-transparent sm:pt-0`}
      onMouseLeave={() => setToggleSearchRecomment(false)}
    >
      {toggleMobileSearch && !toggleProvinceSelect && (
        <FontAwesomeIcon
          icon={faClose}
          className="text-2xl text-white hover:text-orange-500 duration-150 absolute top-5 right-5 hover:cursor-pointer sm:hidden"
          onClick={() => {
            setToggleMobileSearch(!toggleMobileSearch);
            setToggleSearchRecomment(false);
          }}
        ></FontAwesomeIcon>
      )}
      <div
        className={`${toggleMobileSearch && "px-5"} ${
          !toggleSearchRecomment && "rounded-full"
        } flex sm:px-5 py-3 bg-white sm:bg-neutral-100/50 sm:border sm:border-neutral-200/60`}
      >
        {toggleProvinceSelect && (
          <div
            className="fixed bg-white/50 flex justify-center z-40 top-0 left-0 right-0 bottom-0"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="bg-white rounded-lg w-11/12 h-475px sm:w-475px border-2 border-black/10 mt-20 overflow-hidden">
              <header className="flex px-7 py-4 items-center border border-black/10">
                <h1 className="font-bold flex-1 text-center">Chọn khu vực</h1>
                <FontAwesomeIcon
                  icon={faClose}
                  className="text-lg hover:cursor-pointer"
                  onClick={() => {
                    setToggleProvinceSelect(!toggleProvinceSelect);
                    searchProvinceHandle();
                  }}
                ></FontAwesomeIcon>
              </header>
              <div
                className={`p-3 h-full overflow-y-scroll ${styled.custom_scrollbar}`}
              >
                <div className="flex px-5 py-3 bg-neutral-100/50 rounded-full border border-neutral-200/60 mb-5 mt-3 focus-within:border-orange-300 duration-200">
                  <div>
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className=" text-black/20 text-lg"
                    ></FontAwesomeIcon>
                  </div>
                  <div>
                    <input
                      ref={provinceSearchInput}
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
                            if (i.id !== currProvince.id) {
                              changeProvinceHandler(i.id);
                              setToggleProvinceSelect(!toggleProvinceSelect);
                            }
                          }}
                        >
                          <p>
                            {i.name}{" "}
                            <span className=" text-black/50 text-sm italic font-normal">
                              {i.id === currProvince.id && "(Hiện tại)"}
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
        <div className="flex flex-1 items-center">
          <div>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className=" text-black/20 text-xl sm:text-lg hover:cursor-pointer hover:text-orange-500 duration-150 sm:hover:text-black/20"
              onClick={() => {
                setToggleMobileSearch(!toggleMobileSearch);
                searchInput.current.focus();
                setToggleSearchRecomment(false);
              }}
              title={`${toggleMobileSearch ? "Đóng" : "Tìm kiếm"}`}
            ></FontAwesomeIcon>
          </div>
          <div
            className={`${
              toggleMobileSearch ? "block" : "hidden"
            } flex-1 sm:block`}
          >
            <input
              value={searchValue}
              ref={searchInput}
              placeholder="Tìm kiếm review"
              className=" bg-transparent outline-none pl-3 pr-2 w-full"
              onClick={() => setToggleSearchRecomment(true)}
              onFocus={() => setToggleSearchRecomment(true)}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          {toggleMobileSearch && (
            <FontAwesomeIcon
              icon={faClose}
              className={`${
                searchValue ? "opacity-100" : "opacity-0"
              } text-xs text-black/40 hover:cursor-pointer`}
              onClick={() => {
                setSearchValue("");
                searchInput.current.focus();
              }}
            ></FontAwesomeIcon>
          )}
        </div>
        <div
          className={`${toggleMobileSearch ? "block" : "hidden"} sm:block pl-4`}
        >
          <h1
            className="font-bold text-black/60 hover:cursor-pointer hover:text-black duration-150 whitespace-nowrap"
            title="Tỉnh/Thành"
            onClick={() => {
              setToggleProvinceSelect(!toggleProvinceSelect);
            }}
          >
            {currProvince.name}
          </h1>
        </div>
      </div>
      {toggleSearchRecomment && (
        <div
          className={`sm:bg-neutral-100 bg-white left-0 right-0 top-32 h-96 sm:h-72 sm:top-full sm:bottom-0 absolute mx-7 sm:border sm:border-neutral-200/60 p-3 shadow-lg overflow-y-scroll ${
            styled.custom_scrollbar
          } ${toggleMobileSearch && "border border-t-neutral-200/60"}`}
        >
          <h1 className=" text-black/40 text-sm font-semibold mb-3">
            Từ khóa thịnh hành
          </h1>
          <ul>
            {["Trà sữa", "Món Hàn", "Đà Lạt", "Cafe", "Vui chơi"].map((i) => (
              <li className="inline-block rounded-full border border-black/10 px-4 mb-3 text-sm font-semibold bg-neutral-200 text-black/60 hover:bg-orange-400 duration-150 hover:text-white hover:cursor-pointer py-1 mx-1">
                <Link>{i}</Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center">
            <h1 className=" text-black/40 text-sm font-semibold mb-3 mt-2">
              Lịch sử tìm kiếm
            </h1>
            <h1 className=" text-black/40 text-xs font-semibold mb-3 mt-2 italic hover:cursor-pointer hover:text-orange-500 duration-150">
              Xóa lịch sử
            </h1>
          </div>
          <ul>
            {[
              "Trà sữa",
              "Món Hàn",
              "Đà Lạt",
              "Cafe",
              "Vui chơi",
              "Vui chơi",
              "Cafe",
              "Vui chơi",
              "Vui chơi",
            ].map((i) => (
              <li className=" px-2 mb-3 font-semibold text-black/50 duration-150 hover:text-orange-500 hover:cursor-pointer">
                <Link to={`/${i}`}>{i}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
