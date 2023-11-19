//Áp dụng observable pattern để giao tiếp giữa các component
export default class Publisher {
  subcriber = []; //Biến lưu trữ các sự kiện được các component đăng ký
  //Khi hàm emit được gọi ở component bất kỳ thì sẽ lặp qua mảng này để thông báo cho các component đã đăng ký với trùng tên sự kiện

  subcribe(eventName, handler) {
    //một component khi đăng ký nhận thông báo sẽ truyền tên sự kiện(bắt buộc) và một callback để nhận thông báo khi sự kiện được kích hoạt
    this.subcriber.push({
      eventName,
      handler,
    });
  }

  emit(eventName, data, handler) {
    //một compnent khi muốn thông báo một sự kiện nào đó sẽ truyền vào tên của sự kiện(Bắt buộc)
    //nếu không truyền data thì để trống hoặc truyền giá trị null
    //mặc định tất cả các component đăng ký nhận thông báo đều sẽ nhận được thông náo kể cả component phát sự kiện nếu component đó có
    //đăng ký theo dõi chính sự kiện mà nó phát, để loại bỏ việc thông báo đến component phát sự kiện thì truyền thêm cái handler mà nó đăng ký
    this.subcriber.map((sub) => {
      if (
        sub.eventName === eventName &&
        (handler ? handler !== sub.handler : true)
      ) {
        data ? sub.handler(data) : sub.handler();
      }
    });
  }

  unSubcribe(eventName, handler) {
    //đẻ hủy đăng ký nhận thông báo thì truyền tên sự kiện và handler đã đăng ký trước đó
    this.subcriber = this.subcriber.filter(
      (sub) => !(sub.eventName === eventName && sub.handler === handler)
    );
  }
}
