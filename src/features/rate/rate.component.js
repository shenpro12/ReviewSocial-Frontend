import { useEffect, useState } from "react";
import HttpClient from "../../util/httpClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Rate({ onChangeRate }) {
  const [rate, setRate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await HttpClient.get("ratingtype/getall", setIsLoading);
      const r = res.map((i) => ({
        id: i.id,
        name: i.name,
        point: 0,
      }));
      setRate(r);
      onChangeRate(r);
    })();
  }, []);

  const changePointHandle = (currRate, point) => {
    let newRate = rate.map((i) => {
      if (i.id == currRate.id) {
        return { ...i, point };
      } else {
        return i;
      }
    });
    setRate(newRate);
    onChangeRate(newRate);
  };

  return (
    <div>
      {rate.length
        ? rate.map((i) => (
            <div key={i.id} className="flex justify-between items-center py-2">
              <p className=" font-bold text-black/70">{i.name}</p>
              <div className="text-2xl text-black/10">
                <FontAwesomeIcon
                  className={`hover:cursor-pointer duration-150 ${
                    i.point >= 1 ? " text-orange-500" : ""
                  }`}
                  icon={faStar}
                  onClick={() => changePointHandle(i, 1)}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className={`hover:cursor-pointer duration-150 ${
                    i.point >= 2 ? " text-orange-500" : ""
                  }`}
                  icon={faStar}
                  onClick={() => changePointHandle(i, 2)}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className={`hover:cursor-pointer duration-150 ${
                    i.point >= 3 ? " text-orange-500" : ""
                  }`}
                  icon={faStar}
                  onClick={() => changePointHandle(i, 3)}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className={`hover:cursor-pointer duration-150 ${
                    i.point >= 4 ? " text-orange-500" : ""
                  }`}
                  icon={faStar}
                  onClick={() => changePointHandle(i, 4)}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className={`hover:cursor-pointer duration-150 ${
                    i.point >= 5 ? " text-orange-500" : ""
                  }`}
                  icon={faStar}
                  onClick={() => changePointHandle(i, 5)}
                ></FontAwesomeIcon>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
}
export default Rate;
