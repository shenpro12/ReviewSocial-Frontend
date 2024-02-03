import { faClose, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debounce from "../../util/debound";
import { useRef, useState } from "react";
import HttpClient from "../../util/httpClient";
import styled from "./destinationModal.module.css";
import { useSelector } from "react-redux";
import { getCurrProvince } from "../../app/reducer/provinceSlice";

function DestinationModal({ onClose, onChooseDes }) {
  const [listDestination, setListDestination] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const search = useRef();
  const currProvince = useSelector(getCurrProvince);

  const findDestinationHandle = debounce(async () => {
    if (search.current.value) {
      let res = await HttpClient.get(
        `destination/getByKeyword?keyword=${search.current.value}&provinceID=${currProvince.id}`,
        setIsLoading
      );
      setListDestination(res);
    } else {
      setListDestination([]);
    }
  });

  const clearSearchInputHandle = () => {
    search.current.value = "";
    search.current.focus();
    setListDestination([]);
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/80 z-10 flex justify-center pt-20 px-5 md:px-0">
      <div
        className=" absolute right-5 top-4 text-white text-2xl hover:cursor-pointer"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
      </div>
      <div className="rounded-md shadow bg-white w-full md:w-3/5 lg:w-2/5 h-3/5 p-3 md:p-7 flex flex-col">
        <div className="flex items-center flex-col md:flex-row px-7 md:px-0">
          <h1 className="font-semibold mr-3 mb-3 md:mb-0">Chọn địa điểm</h1>
          <div className="flex-1 w-full flex py-2 px-5 bg-slate-200/30 rounded-full items-center">
            <input
              autoFocus={true}
              ref={search}
              className=" flex-1 pr-4 border-none outline-none bg-transparent"
              onInput={findDestinationHandle}
              placeholder="Nhập tên địa điểm..."
            />
            <FontAwesomeIcon
              className="text-black/50 text-xs hover:text-black hover:cursor-pointer duration-150"
              icon={faClose}
              onClick={clearSearchInputHandle}
            ></FontAwesomeIcon>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center mt-7 text-black/60">
            <FontAwesomeIcon icon={faSpinner} spin={true}></FontAwesomeIcon>
            <span className="ml-2">Đang tìm...</span>
          </div>
        ) : (
          <ul
            className={`mt-7 overflow-y-scroll flex-1 ${styled.custom_scrollbar}`}
          >
            {listDestination.length ? (
              <p className="mb-3 font-semibold text-black/50 text-sm italic pl-1">
                Tìm thấy {listDestination.length} địa điểm
              </p>
            ) : (
              ""
            )}
            {listDestination.length ? (
              listDestination.map((i) => (
                <li
                  key={i.id}
                  className="flex p-2 hover:cursor-pointer hover:bg-slate-200/50 duration-200"
                  onClick={() => onChooseDes(i)}
                >
                  <div className="w-16 h-16 rounded-3xl overflow-hidden mr-1">
                    <img
                      alt="destination thumb"
                      src={i.thumb}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-2 py-1 flex-1">
                    <h1 className="font-bold">{i.name}</h1>
                    <p className="text-black/40 text-sm font-semibold">
                      {i.address}
                    </p>
                  </div>
                </li>
              ))
            ) : search.current && search.current.value ? (
              <h1 className="text-black/50 font-semibold text-center">
                Không tìm thấy!
              </h1>
            ) : (
              <h1 className="text-black/50 font-semibold text-center">
                Vui lòng chọn nơi bạn muốn Riviu!
              </h1>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
export default DestinationModal;
