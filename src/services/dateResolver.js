import dates from "./dates";
import moment from "moment";
import dateCompare from "./dateCompare";

class DateResolver {
  constructor(isSameDay) {
    this.isSameDay = isSameDay;
  }

  //get all month names
  getAllMonths() {
    return dates.months();
  }

  //get all weekday names
  getWeekdays() {
    let weekdays = moment.weekdays();
    weekdays.push(weekdays.shift());
    return weekdays;
  }

  //get all dates in month with events
  //params: year, month, events
  getDatesInMonthWithEvents(year, month, events) {
    this.events = events;
    //get number day of week, 0 - monday, 6 - sunday
    function getDayOfWeek(date) {
      let day = moment(date).day();
      //do sunday last day (6 instead 0)
      if (day === 0) day = 7;
      return day - 1;
    }
    //return formattedDate object
    let index = 0;
    let mon = month;
    let calendarDays = [[]];
    let date = moment([year, mon]);
    let prevDate = moment()
      .year(year)
      .month(mon - 1);
    prevDate.date(prevDate.daysInMonth());
    let nextDate = moment()
      .year(year)
      .month(mon + 1);
    nextDate.date(1);
    //add days from prev month before 1st day current month
    for (let i = getDayOfWeek(date); i > 0; i--) {
      calendarDays[index][i - 1] = this.getDateObject(prevDate);
      prevDate.date(prevDate.date() - 1);
    }
    while (date.month() === mon) {
      calendarDays[index].push(this.getDateObject(date));
      if (getDayOfWeek(date) % 7 === 6) {
        // if sunday then add new row
        index++;
        calendarDays[index] = [];
      }
      date.date(date.date() + 1);
    }
    // if last row of days is empty then remove this row
    if (!calendarDays[index].length) {
      calendarDays.pop();
    }
    //if last day isnt sunday then add days from next month
    if (getDayOfWeek(date) !== 0) {
      for (let i = getDayOfWeek(date); i < 7; i++) {
        calendarDays[index].push(this.getDateObject(nextDate));
        nextDate.date(nextDate.date() + 1);
      }
    }
    return calendarDays;
  }

  //get date object with format: day, month, year, events
  //params: date
  getDateObject(date) {
    const dateObject = {
      day: date.date(),
      month: date.month(),
      year: date.year(),
      events: [],
    };
    dateObject.events = this.events.filter((i) => this.isSameDay(i.date, date));
    return dateObject;
  }

  //get year from date
  //params: date
  getYear(date) {
    return date.year();
  }

  //get month from date
  //params: date
  getMonth(date) {
    return date.month();
  }

  //get today date
  getToday() {
    return dates();
  }
}

export default new DateResolver(dateCompare.isSameDay);
