export default class Publisher {
  subcriber = [];

  subcribe(eventName, handler) {
    this.subcriber.push({
      eventName,
      handler,
    });
  }

  emit(eventName, data, handler) {
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
    this.subcriber = this.subcriber.filter(
      (sub) => !(sub.eventName === eventName && sub.handler === handler)
    );
  }
}
