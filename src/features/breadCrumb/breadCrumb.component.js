import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function BreadCrumd({ Items }) {
  return (
    <div className="text-sm text-black/60 flex items-center mb-3 font-medium">
      <Link to="/">
        <FontAwesomeIcon
          icon={faHouse}
          className="text-xs mr-1 text-orange-500/50"
        ></FontAwesomeIcon>
        <span className=" text-blue-400 hover:text-orange-500 pr-1">
          Trang chủ
        </span>
      </Link>
      {Items
        ? Items.map((i) =>
            i.url ? (
              <Link key={i.text} to={i.url}>
                {" "}
                / {i.text}
              </Link>
            ) : (
              <span key={i.text}> / {i.text}</span>
            )
          )
        : ""}
    </div>
  );
}
export default BreadCrumd;
