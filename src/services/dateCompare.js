import dates from "./dates";

class DateCompare {
  constructor() {}

  //is same day (return true/false)
  //params: firstDate, secondDate
  isSameDay(fDate, sDate) {
    return (
      fDate.year() === sDate.year() &&
      fDate.month() === sDate.month() &&
      fDate.date() === sDate.date()
    );
  }

  //is weekend day (return true/false)
  //params: moment, moment
  isWeekend(y, m, d) {
    let day = dates().year(y).month(m).date(d).day();
    return day === 0 || day === 6;
  }

  //is date is today (return true/false)
  //params: year, month, date
  isToday(y, m, d) {
    const today = dates();
    return y === today.year() && m === today.month() && d === today.date();
  }

  //is the past date (return true/false)
  //params: year, month, date
  isPrevDate(y, m, d) {
    const currentDate = dates();

    if (currentDate.year() > y) return true;
    if (currentDate.year() < y) return false;

    if (currentDate.month() > m) return true;
    if (currentDate.month() < m) return false;

    if (currentDate.date() > d) return true;

    return false;
  }

  //is present year
  //return true/false
  //params: year
  isPresentYear(year) {
    return +dates().year() !== +year;
  }
}
export default new DateCompare();
