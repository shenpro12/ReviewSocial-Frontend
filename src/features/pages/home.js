import SideAuth from "../auth/sideAuth.component";
import CategoryHeader from "../provinceCategory/categoryHeader.component";
import ProvinCategory from "../provinceCategory/provinceCategory.component";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);
  return (
    <div className="w-full lg:flex">
      <div className="lg:w-9/12 lg:pr-5">
        <div className="w-full h-72 rounded-2xl overflow-hidden ">
          <img
            src="https://res.cloudinary.com/dbey8svpl/image/upload/v1696060296/0b8e06bde3e3f608290fe321039e9f64_lmzcvd.png"
            className="object-cover w-full h-full"
            alt="banner"
          />
        </div>
        <ProvinCategory></ProvinCategory>
        <CategoryHeader></CategoryHeader>
      </div>
      <div className="lg:w-3/12 lg:block hidden ">
        <SideAuth></SideAuth>
        <img
          className="mt-8 rounded-xl"
          src="https://res.cloudinary.com/dbey8svpl/image/upload/v1700293554/701c4f418e5d1bb0b278aea50296c568_fijyf7.gif"
          alt="gif"
        />
      </div>
    </div>
  );
}
export default Home;
