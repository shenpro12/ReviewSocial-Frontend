import { Interweave } from "interweave";
import moment from "moment";
import ImageGalery from "../imageGalery/imageGalery.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import PostInterract from "./postInteract.component";

function PostContainer({ post }) {
  const getTime = (timeString) => {
    let date = new Date(timeString);
    let now = new Date();
    var timeDiff = now.getTime() - date.getTime();

    // Chuyển đổi thành giờ
    let hour = timeDiff / (1000 * 3600);
    if (hour < 24) {
      if (hour >= 1) {
        return `${hour.toFixed()} giờ`;
      } else {
        let differenceInMilliseconds = now - date;

        // Chuyển đổi từ miligiây sang phút
        return (
          (differenceInMilliseconds / (1000 * 60)).toFixed() + " phút trước"
        );
      }
    } else {
      return moment(timeString).format("dd-MM-yyyy hh:mm");
    }
  };
  return (
    <div className=" rounded-xl pt-3 shadow md:mx-5 mb-6">
      <header className="px-5 flex justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 overflow-hidden rounded-full mr-2">
            <img
              className="w-full h-full object-cover"
              alt="avartar"
              src={
                post.profile.avatar ||
                "https://res.cloudinary.com/dbey8svpl/image/upload/v1694912519/user_tidw2g.png"
              }
            />
          </div>
          <div>
            <h1 className=" font-semibold text-lg">{post.profile.name}</h1>
            <p className="text-xs">{getTime(post.modify)}</p>
          </div>
        </div>
        <div className=" text-xl text-black/50 flex items-center">
          <FontAwesomeIcon
            icon={faEllipsis}
            className="mr-5 hover:cursor-pointer hover:text-black duration-150"
            title="Thêm"
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            icon={faClose}
            className=" hover:cursor-pointer hover:text-black duration-150"
            title="Ẩn bài viết"
          ></FontAwesomeIcon>
        </div>
      </header>
      <section className=" text-justify mt-4">
        <div className="px-5">
          <Interweave content={post.content}></Interweave>
        </div>
        <ImageGalery imageList={post.postMedias}></ImageGalery>
        <PostInterract></PostInterract>
      </section>
    </div>
  );
}

export default PostContainer;
