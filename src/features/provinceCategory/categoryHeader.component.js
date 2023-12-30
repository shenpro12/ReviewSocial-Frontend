import HttpClient from "../../util/httpClient";
import { useEffect, useState } from "react";

function CategoryHeader() {
  const [items, setItems] = useState([]); // chỗ này để lưu biến
  //const currProvince = useSelector(getCurrProvince); // không dùng vì ko có phụ thuocj province (HCM)
  const [currCategory, setCurrCategory] = useState("");
  // hàm thay đổi id currCategory
  const changecurrCategoryHandle = (id) => {
    setCurrCategory(id);
  };

  useEffect(() => {
    (async () => {
      const data = await HttpClient.get(`Category/getAll`, () => {});
      setItems(data);
      if (data.length) {
        setCurrCategory(data[0].id);
      }
    })();
  }, []);

  return (
    <div className="w-full mt-10">
      <div>
        <h1 className="font-semibold text-2xl ">Khám phá</h1>
      </div>
      <div>
        <ul className="flex mt-5 flex-wrap">
          {items.length
            ? items.map((i) => (
                <li
                  key={i.id}
                  className={`text-normal px-4 py-1 ${
                    i.id === currCategory
                      ? "bg-neutral-200/50 text-orange-500"
                      : "text-black/40 hover:text-black"
                  } rounded-2xl font-semibold hover:cursor-pointer`}
                  onClick={() => changecurrCategoryHandle(i.id)}
                >
                  {i.name}
                </li>
              ))
            : ""}{" "}
          {/* mảng rỗng là xuất ko làm gì hết */}
        </ul>
      </div>
    </div>
  );
}
export default CategoryHeader;
