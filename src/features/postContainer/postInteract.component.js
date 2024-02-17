import {
  faBookmark,
  faComment,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PostInterract() {
  return (
    <div className="flex justify-around items-center py-1 px-2">
      <button className="flex items-center justify-center hover:bg-black/10 w-full h-full py-2 rounded-md duration-150 text-orange-500/60 hover:text-orange-500 font-medium">
        <FontAwesomeIcon
          className="mr-2 text-orange-500"
          icon={faThumbsUp}
        ></FontAwesomeIcon>
        <p>Thích</p>
      </button>
      <button className="flex items-center justify-center hover:bg-black/10 w-full h-full py-2 rounded-md duration-150 text-orange-500/60 hover:text-orange-500 font-medium">
        <FontAwesomeIcon
          className="mr-2 text-orange-500"
          icon={faComment}
        ></FontAwesomeIcon>
        <p>Bình luận</p>
      </button>
      <button className="flex items-center justify-center hover:bg-black/10 w-full h-full py-2 rounded-md duration-150 text-orange-500/60 hover:text-orange-500 font-medium">
        <FontAwesomeIcon
          className="mr-2 text-orange-500"
          icon={faBookmark}
        ></FontAwesomeIcon>
        <p>Lưu</p>
      </button>
    </div>
  );
}

export default PostInterract;
