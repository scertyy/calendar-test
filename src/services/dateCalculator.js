import dates from "./dates";

class DateCalculator {
  constructor() {}

  //return date of next month
  //params: year, month
  calculateNextMonth(y, m) {
    let incMonth = m + 1;
    let year = y;
    if (incMonth > 11) {
      incMonth = 0;
      year++;
    }
    return dates([year, incMonth]);
  }

  //return date of prev month
  //params: year, month
  calculatePrevMonth(y, m) {
    let decMonth = m - 1;
    let year = y;
    if (decMonth < 0) {
      decMonth = 11;
      year--;
    }
    return dates([year, decMonth]);
  }
}

export default new DateCalculator();
