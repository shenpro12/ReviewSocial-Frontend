import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HttpClient from "../../util/httpClient";
import { useSelector } from "react-redux";
import { getCurrProvince } from "../../app/reducer/provinceSlice";

function ProvinCategory() {
  const [items, setItems] = useState();
  const currProvince = useSelector(getCurrProvince);

  useEffect(() => {
    (async () => {
      const data = await HttpClient.get(
        `ProvinceCategory/getByProvince/${currProvince.id}`,
        () => {}
      );
      setItems(data);
    })();
  }, [currProvince]);

  return items && items.items && items.items.length ? (
    <div className="w-full mt-10 z-0">
      <header className="w-full flex justify-between items-center">
        <h1 className=" text-2xl font-semibold">Dành cho bạn</h1>
        <Link
          to={`/danh-muc`}
          className=" text-neutral-500 hover:text-black duration-150"
        >
          Xem thêm
        </Link>
      </header>
      <div className="w-full relative h-40 flex items-center mt-5">
        <div className="w-full h-full absolute">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="h-full mySlider"
          >
            {items && items.items
              ? items.items.map((i) => (
                  <SwiperSlide
                    key={i.id}
                    className=" bg-red-400 h-full rounded-xl overflow-hidden"
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url(${i.thumb})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <Link to={"/"}>
                        <div className="bg-black/50 w-full h-full relative">
                          <div className="text-white font-semibold absolute bottom-0 p-3">
                            <p>{i.name}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))
              : ""}
          </Swiper>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
export default ProvinCategory;
