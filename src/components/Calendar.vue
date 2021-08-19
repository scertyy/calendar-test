<!--calendar component for visualise events-->
<template>
  <div class="calendar">
    <div class="calendar__table">
      <div class="calendar__row calendar__row_h-20 calendar__row_mb-15">
        <div class="calendar__button" @click="goToPrevMonth">
          <left-svg/>
        </div>
        <span class="calendar__month">
          {{ currentDate }}
        </span>
        <div class="calendar__button" @click="goToNextMonth">
          <right-svg />
        </div>
      </div>
      <div class="calendar__row">
        <div class="calendar__header" v-for="item in weekdays" :key="item">
          {{ item }}
        </div>
      </div>
      <div class="calendar__grid">
        <template v-for="week in calendarDays">
          <calendar-day
            v-for="(date, index) in week"
            :disabled="isPrevDate(date.year, date.month, date.day)"
            :day-off="isWeekends(date.year, date.month, date.day)"
            :today="isToday(date.year, date.month, date.day)"
            :key="date.day + index * 1000 + 'day'"
            :day="date.day"
            :events="date.events"
          >
            {{ date.day }}
          </calendar-day>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import CalendarDay from "./CalendarDay";
import LeftSvg from "./svg/LeftSvg";
import RightSvg from "./svg/RightSvg";
moment.locale("ru");
export default {
  name: "Calendar",
  components: { RightSvg, LeftSvg, CalendarDay },
  props: {
    events: {
      type: Array,
    },
  },
  data() {
    return {
      calendarDays: [[]],
      weekdays: [],
      months: [],
      currentYear: null,
      currentMonth: null,
    };
  },
  methods: {
    fillCalendarDays(year, month) {
      //привязать события к дням

      //get number day of week, 0 - monday, 6 - sunday
      function getDayOfWeek(date) {
        let day = moment(date).day();
        //do sunday last day (6 instead 0)
        if (day == 0) day = 7;
        return day - 1;
      }
      //return formattedDate object
      let index = 0;
      let mon = month;
      this.calendarDays = [[]];
      this.currentMonth = mon;
      this.currentYear = year;
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
        this.calendarDays[index][i - 1] = this.getDateObject(prevDate);
        prevDate.date(prevDate.date() - 1);
      }
      while (date.month() === mon) {
        this.calendarDays[index].push(this.getDateObject(date));
        if (getDayOfWeek(date) % 7 === 6) {
          // if sunday then add new row
          index++;
          this.calendarDays[index] = [];
        }
        date.date(date.date() + 1);
      }
      // if last row of days is empty then remove this row
      if (!this.calendarDays[index].length) {
        this.calendarDays.pop();
      }
      //if last day isnt sunday then add days from next month
      if (getDayOfWeek(date) !== 0) {
        for (let i = getDayOfWeek(date); i < 7; i++) {
          this.calendarDays[index].push(this.getDateObject(nextDate));
          nextDate.date(nextDate.date() + 1);
        }
      }
    },
    //fill weekday names
    fillWeekDays() {
      let weekdays = moment.weekdays();
      weekdays.push(weekdays.shift());
      this.weekdays = weekdays;
    },
    //fill months names
    fillMonths() {
      this.months = moment.months();
    },
    //goto next month
    goToNextMonth() {
      let incMonth = this.currentMonth + 1;
      let year = this.currentYear;
      if (incMonth > 11) {
        incMonth = 0;
        year++;
      }
      let k = moment([year, incMonth]);
      this.fillCalendarDays(k.year(), k.month());
    },
    //goto prev month
    goToPrevMonth() {
      let decMonth = this.currentMonth - 1;
      let year = this.currentYear;
      if (decMonth < 0) {
        decMonth = 11;
        year--;
      }
      let k = moment([year, decMonth]);
      this.fillCalendarDays(k.year(), k.month());
    },
    //is the past date (return true/false)
    //params: year, month, date
    isPrevDate(y, m, d) {
      const currentDate = moment();

      if (currentDate.year() > y) return true;
      if (currentDate.year() < y) return false;

      if (currentDate.month() > m) return true;
      if (currentDate.month() < m) return false;

      if (currentDate.date() > d) return true;

      return false;
    },
    //is the past date (return true/false)
    //params: moment, moment
    getDateObject(date) {
      const dateObject = {
        day: date.date(),
        month: date.month(),
        year: date.year(),
        events: [],
      };
      dateObject.events = this.events.filter((i) =>
        this.isSameDay(i.date, date)
      );
      return dateObject;
    },
    isSameDay(fDate, sDate) {
      return (
        fDate.year() === sDate.year() &&
        fDate.month() === sDate.month() &&
        fDate.date() === sDate.date()
      );
    },
    isWeekends(y, m, d) {
      let day = moment().year(y).month(m).date(d).day();
      return day === 0 || day === 6;
    },
    isToday(y, m, d) {
      const today = moment();
      return y === today.year() && m === today.month() && d === today.date();
    },
  },
  created() {
    const today = moment();
    this.fillWeekDays();
    this.fillMonths();
    this.fillCalendarDays(today.year(), today.month());
  },
  computed: {
    currentDate() {
      let date = this.months[this.currentMonth];
      if (+moment().year() !== +this.currentYear) {
        date += ` ${this.currentYear}`;
      }
      return date;
    },

    // currentMonth() {
    //   return "Апрель";
    // },
  },
};
</script>

<style lang="scss">
.calendar {
  width: 100%;
  height: 100%;
  padding: 15px;
  background: var(--grey);
}
.calendar__table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 15px;
  padding: 15px;
}
.calendar__row {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 3px;
  &.calendar__row_h-20 {
    height: 20px;
  }
  &.calendar__row_mb-15 {
    margin-bottom: 15px;
  }
}
.calendar__header {
  flex: 1;
  flex-shrink: 0;

  font-size: 14px;
  text-align: right;
  font-weight: bold;
  text-transform: uppercase;
  border: 3px solid inherit;
  margin-right: var(--calendar-gap);
  &:last-of-type {
    margin-right: 0;
  }
}
.calendar__month {
  margin: 0 15px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  height: 100%;
}
.calendar__button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
}

.calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: var(--calendar-gap);
  grid-auto-rows: 1fr;
  height: 100%;
  width: 100%;
}
</style>
