class Dates {
  #moment
  constructor(moment) {
    this.#moment = moment;
    this.#moment.locale("ru");
  }
  getAllMonths() {
    return this.#moment.months();
  }
  getAllWeekdays() {
    return this.#moment.weekdays();
  }
}

import moment from "moment";
export default new Dates(moment);