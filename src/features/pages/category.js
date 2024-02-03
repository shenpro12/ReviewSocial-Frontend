import { useEffect, useState } from "react";
import HttpClient from "../../util/httpClient";
import { Link } from "react-router-dom";
import RequestLoading from "../app-loading/requestLoading.component";
import { useSelector } from "react-redux";
import { getCurrProvince } from "../../app/reducer/provinceSlice";
import BreadCrumd from "../breadCrumb/breadCrumb.component";

function Category() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const currProvince = useSelector(getCurrProvince);

  //goi API
  useEffect(() => {
    (async () => {
      const res = await HttpClient.get(
        `ProvinceCategory/getByProvince/${currProvince.id}`,
        setLoading,
        () => {}
      );
      setData(res);
    })();
  }, [currProvince]);

  useEffect(() => {
    document.title = `Danh mục | ${currProvince.name}`;
  }, [currProvince]);

  return (
    <>
      {loading && <RequestLoading></RequestLoading>}
      {data ? (
        <div className="w-full lg:px-36">
          <BreadCrumd
            Items={[{ text: data && data.categorySlug }]}
          ></BreadCrumd>
          {data && data.items && (
            <div className="mb-7 bg-white shadow-sm rounded-xl overflow-hidden">
              <img
                src={data && data.categoryThumb}
                alt="categoryThumb"
                className="w-full h-96 object-cover"
              />
              <h1 className="text-center py-2 font-semibold text-black/60 text-xl">
                {data && data.categorySlug}
              </h1>
            </div>
          )}
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
            {data &&
              data.items &&
              data.items.map((i) => (
                <Link
                  key={i.id}
                  className="rounded-md block h-72 sm:h-52 md:h-64 lg:h-72 border border-black/10 overflow-hidden"
                >
                  <div className="w-full h-5/6 mb-1 overflow-hidden">
                    <img
                      className="w-full h-full object-cover hover:scale-150 duration-1000"
                      src={`${i.thumb}`}
                      alt="category thumb"
                    />
                  </div>
                  <h1 className="px-3 py-2 font-bold h-1/6 truncate">
                    {i.name}
                  </h1>
                </Link>
              ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Category;
