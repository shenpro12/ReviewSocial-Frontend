import { useEffect, useState } from "react";
import HttpClient from "../../util/httpClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import RequestLoading from "../app-loading/requestLoading.component";
import { useSelector } from "react-redux";
import { getCurrProvince } from "../../app/reducer/provinceSlice";

function Category() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const currProvince = useSelector(getCurrProvince);
  const params = useParams();
  const navigate = useNavigate();

  // thay doi url
  useEffect(() => {
    navigate(`/danh-muc/${currProvince.id}`);
  }, [currProvince]);

  // de goi API
  useEffect(() => {
    (async () => {
      const res = await HttpClient.get(
        `ProvinceCategory/getByProvince/${params.provinceID}`,
        setLoading,
        () => {}
      );
      setData([...res, ...res, ...res]);
    })();
  }, [params]);

  return (
    <>
      {loading && <RequestLoading></RequestLoading>}
      <div className="w-full lg:px-36">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
          {data.map((i) => (
            <Link
              key={i.id}
              className="rounded-md block h-72 sm:h-52 md:h-64 lg:h-72 border border-black/10 overflow-hidden"
            >
              <div className="w-full h-5/6 mb-1 overflow-hidden">
                <img
                  className="w-full h-full object-cover hover:scale-150 duration-1000"
                  src={`https://res.cloudinary.com/dbey8svpl/image/upload/v1696060296/${i.thumb}.jpg`}
                />
              </div>
              <h1 className="px-3 py-2 font-bold h-1/6 truncate">{i.name}</h1>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Category;
