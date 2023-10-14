import ProvinCategory from "../provinceCategory/provinceCategory";

function Home() {
  return (
    <div className="w-full flex">
      <div className=" w-9/12 pr-5">
        <div className="w-full h-72 rounded-2xl overflow-hidden ">
          <img
            src="https://res.cloudinary.com/dbey8svpl/image/upload/v1696060296/0b8e06bde3e3f608290fe321039e9f64_lmzcvd.png"
            className="object-cover w-full h-full"
            alt="banner"
          />
        </div>
        <ProvinCategory></ProvinCategory>
      </div>
      <div className="w-3/12 bg-indigo-500"></div>
    </div>
  );
}
export default Home;
