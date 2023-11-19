function Contact() {
  return (
    <div className="w-full bg-white rounded-2xl px-5 py-8">
      <h1 className="text-center text-3xl font-semibold font-mono mb-10">
        Thực hiện bởi
      </h1>
      <div className="w-full lg:flex">
        <div className="flex-1 flex lg:flex-col my-10">
          <div>
            <div className="w-32 h-40 lg:w-40 lg:h-48 overflow-hidden lg:mx-auto">
              <img
                src="https://res.cloudinary.com/dbey8svpl/image/upload/v1700397585/e7225e69b0f266ac3fe3_xm7xtu.jpg"
                className="w-full h-full object-cover"
                alt="Ảnh đại diện"
              />
            </div>
            <h1 className="text-center mt-7 font-semibold font-mono text-xl uppercase">
              lê văn đạt
            </h1>
          </div>

          <div className="w-full mt-5 px-5 ml-10 lg:ml-0">
            <p className="font-medium text-lg mb-2">Trách nhiệm:</p>
            <ul>
              <li className="list-disc list-inside">
                Tìm hiểu và áp dụng các công nghệ vào ứng dụng
              </li>
              <li className="list-disc list-inside">
                Phân công các công việc cần thực hiện cho các thành viên
              </li>
              <li className="list-disc list-inside">
                Xây dựng Database và lập trình UI, Api cho ứng dụng
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1 flex lg:flex-col my-10">
          <div>
            <div className="w-32 h-40 lg:w-40 lg:h-48 overflow-hidden lg:mx-auto">
              <img
                src="https://res.cloudinary.com/dbey8svpl/image/upload/v1700399272/ccf4e6af8135576b0e24_ho0lj2.jpg"
                className="w-full h-full object-cover"
                alt="Ảnh đại diện"
              />
            </div>
            <h1 className="text-center mt-7 font-semibold font-mono text-xl uppercase">
              phan minh khải
            </h1>
          </div>

          <div className="w-full mt-5 px-5 ml-10 lg:ml-0">
            <p className="font-medium text-lg mb-2">Trách nhiệm:</p>
            <ul>
              <li className="list-disc list-inside">
                Xây dựng Database và lập trình UI, Api cho ứng dụng
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;
