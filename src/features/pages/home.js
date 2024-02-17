import SideAuth from "../auth/sideAuth.component";
import CategoryHeader from "../provinceCategory/categoryHeader.component";
import ProvinCategory from "../provinceCategory/provinceCategory.component";
import { useEffect, useState } from "react";
import HttpClient from "../../util/httpClient";
import { useSelector } from "react-redux";
import { getCurrProvince } from "../../app/reducer/provinceSlice";
import PostContainer from "../postContainer/postContainer.component";

function Home() {
  const currProvince = useSelector(getCurrProvince);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  useEffect(() => {
    (async () => {
      const res = await HttpClient.get(
        `post/getallpost?provinceID=${currProvince.id}&provinCategoryID=2d496d93-e49c-4d99-9b19-c9bacfce7dde&categoryID=3e22be04-7e04-4bb9-b512-7217bde6ac19`,
        () => {}
      );

      setPostList(res || []);
    })();
  }, [currProvince]);
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
        <div className="mb-5">
          <CategoryHeader></CategoryHeader>
        </div>
        {postList.map((post) => (
          <PostContainer key={post.id} post={post}></PostContainer>
        ))}
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
