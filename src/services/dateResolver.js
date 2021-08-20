/**
 * class with resolve methods
 */

import dates from "./dates";

class DateResolver {
    constructor() { }

    /**
   *
   * @returns {string[]}
   */
    getAllMonths() {
        return dates.months();
    }

    /**
   *
   * @returns {string[]}
   */
    getWeekdays() {
        let weekdays = dates.weekdays();
        weekdays.push(weekdays.shift());
        return weekdays;
    }

    /**
     *
     * @param year
     * @param month
     * @returns {*[][]}
     */
    getDatesInMonth(year, month) {
        let index = 0;
        let mon = month;
        let calendarDays = [[]];
        let date = dates([year, mon]);
        let prevDate = this.getDecMonthDate(year, mon);
        prevDate.date(prevDate.daysInMonth());
        let nextDate = this.getIncMonthDate(year, mon);
        nextDate.date(1);
        /**
     * add days from prev month before 1st day current month
     */
        for (let i = this.getDayOfWeek(date); i > 0; i--) {
            calendarDays[index][i - 1] = this.mapDate(prevDate);
            prevDate.date(prevDate.date() - 1);
        }
        while (date.month() === mon) {
            calendarDays[index].push(this.mapDate(date));
            if (this.getDayOfWeek(date) % 7 === 6) {
                /**
         * if sunday then add new row
         */
                index++;
                calendarDays[index] = [];
            }
            date.date(date.date() + 1);
        }
        /**
     * if last row of days is empty then remove this row
     */
        if (!calendarDays[index].length) {
            calendarDays.pop();
        }
        /**
     * if last day isn't sunday then add days from next month
     */
        if (this.getDayOfWeek(date) !== 0) {
            for (let i = this.getDayOfWeek(date); i < 7; i++) {
                calendarDays[index].push(this.mapDate(nextDate));
                nextDate.date(nextDate.date() + 1);
            }
        }
        return calendarDays;
    }

    /**
   *
   * @param date
   * @returns {number}
   */
    getDayOfWeek(date) {
        let day = dates(date).day();
        /**
     * do sunday last day (6 instead 0)
     */
        if (day === 0) day = 7;
        return day - 1;
    }

    /**
   *
   * @param y - year
   * @param m - month
   * @returns {moment.Moment}
   */
    getDecMonthDate(y, m) {
        return dates()
            .year(y)
            .month(m - 1)
    }

    /**
   *
   * @param y - year
   * @param m - month
   * @returns {moment.Moment}
   */
    getIncMonthDate(y, m) {
        return dates()
            .year(y)
            .month(m + 1)
    }

    /**
   *
   * @param date
   * @returns {{month: *, year: *, day: *, events: *[]}}
   */
    mapDate(date) {
        return {
            day: date.date(),
            month: date.month(),
            year: date.year(),
            events: [],
        };
    }

    /**
   *
   * @param date
   * @returns {*}
   */
    getYear(date) {
        return date.year();
    }

    /**
   *
   * @param date
   * @returns {*}
   */
    getMonth(date) {
        return date.month();
    }


    /**
   *
   * @returns {*|moment.Moment}
   */
    getToday() {
        return dates();
    }

    /**
   *
   * @param fDate - date
   * @param sDate - date
   * @returns {boolean}
   */
    isSameDay(fDate, sDate) {
        return (
            fDate.year() === sDate.year() &&
      fDate.month() === sDate.month() &&
      fDate.date() === sDate.date()
        );
    }

    getDate(y, m, d) {
        return dates([y, m, d]);
    }
}

export default new DateResolver();
