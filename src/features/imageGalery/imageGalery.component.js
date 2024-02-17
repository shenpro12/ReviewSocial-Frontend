function ImageGalery({ imageList }) {
  if (imageList.length >= 5) {
    return (
      <div className="pt-top-100 md:pt-top-85 w-full mt-5 flex">
        <div className=" -mt-top-100 md:-mt-top-85 flex-1 flex">
          <div
            className=" w-3/5 h-full hover:cursor-pointer mr-1"
            style={{
              backgroundImage: `url(${imageList[0].url})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className=" w-2/5 h-full flex flex-col justify-around">
            <div
              className="flex-1 hover:cursor-pointer mb-1"
              style={{
                backgroundImage: `url(${imageList[1].url})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="flex-1 hover:cursor-pointer mb-1"
              style={{
                backgroundImage: `url(${imageList[2].url})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="flex-1 hover:cursor-pointer relative flex justify-center items-center"
              style={{
                backgroundImage: `url(${imageList[3].url})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className=" absolute top-0 bottom-0 left-0 right-0 bg-black/50"></div>
              <p className="absolute font-bold text-2xl md:text-4xl text-white">
                +{imageList.length - 4}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageGalery;
