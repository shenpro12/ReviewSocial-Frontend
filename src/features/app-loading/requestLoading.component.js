import { LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";

function RequestLoading() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/70 text-white flex justify-center items-center z-50">
      <div className=" absolute top-0 left-0 right-0 text-orange-500">
        <Box sx={{ width: "100%" }}>
          <LinearProgress className="" color="inherit" />
        </Box>
      </div>
      <img
        src="https://res.cloudinary.com/dbey8svpl/image/upload/v1696747124/menhera_chan__9__by_menherachangif_devylnk_bpcnt7_ccil6s.gif"
        className=" w-52 h-40"
        alt="loadingGif"
      />
    </div>
  );
}
export default RequestLoading;
