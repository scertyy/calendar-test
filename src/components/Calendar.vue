<!--calendar component for visualise events-->
<template>
    <div class="calendar">
        <div class="calendar__table">
            <div class="calendar__row">
                <div class="calendar__button" @click="goToPrevMonth">
                    <left-arrow />
                </div>
                <span class="calendar__month">
                    {{ currentDate }}
                </span>
                <div class="calendar__button" @click="goToNextMonth">
                    <right-arrow />
                </div>
            </div>
            <div class="calendar__header-wrapper">
                <div class="calendar__header" v-for="item in weekdays" :key="item">
                    {{ item }}
                </div>
            </div>
            <div class="calendar__grid">
                <template v-for="(week, parentIndex) in calendarDays">
                    <slot name="day" :day="date" v-for="(date, index) in week">
                        <calendar-day
                            :disabled="isPrevDate(date.year, date.month, date.day)"
                            :day-off="isWeekend(date.year, date.month, date.day)"
                            :today="isToday(date.year, date.month, date.day)"
                            :key="parentIndex * 100 + index + 'day'"
                            :day="date.day"
                            :events="date.events"
                        >
                            {{ date.day }}
                        </calendar-day>
                    </slot>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import CalendarDay from './CalendarDay'
import LeftArrow from './svg/LeftArrow'
import RightArrow from './svg/RightArrow'
import dateComparer from '../services/dateComparer'
import dateResolver from '../services/dateResolver'
import dateCalculator from '../services/dateCalculator'
export default {
    name: 'Calendar',
    components: { RightArrow, LeftArrow, CalendarDay },
    props: {
        events: {
            type: Array
        }
    },
    data () {
        return {
            calendarDays: [[]],
            weekdays: [],
            months: [],
            currentYear: null,
            currentMonth: null
        }
    },
    methods: {
        fillCalendar (year, month) {
            this.currentMonth = month
            this.currentYear = year
            const calendarDaysWithoutEvents = dateResolver.getDatesInMonth(
                year,
                month
            )
            this.calendarDays = calendarDaysWithoutEvents.map(row => row.map(item => {
                const newItem = item
                newItem.events = this.getCurrentDayEvents(newItem)
                return newItem
            }))
        },
        getCurrentDayEvents (item) {
            const date = dateResolver.getDate(item.year, item.month, item.day)
            return this.events.filter((i) => dateResolver.isSameDay(i.date, date))
        },
        fillWeekDays () {
            this.weekdays = dateResolver.getWeekdays()
        },
        fillMonths () {
            this.months = dateResolver.getAllMonths()
        },
        goToNextMonth () {
            const nextM = dateCalculator.calculateNextMonth(
                this.currentYear,
                this.currentMonth
            )
            this.fillCalendar(
                dateResolver.getYear(nextM),
                dateResolver.getMonth(nextM)
            )
        },
        goToPrevMonth () {
            const nextM = dateCalculator.calculatePrevMonth(
                this.currentYear,
                this.currentMonth
            )
            this.fillCalendar(
                dateResolver.getYear(nextM),
                dateResolver.getMonth(nextM)
            )
        },
        isPrevDate (y, m, d) {
            return dateComparer.isPrevDate(y, m, d)
        },
        isWeekend (y, m, d) {
            return dateComparer.isWeekend(y, m, d)
        },
        isToday (y, m, d) {
            return dateComparer.isToday(y, m, d)
        }
    },
    created () {
        const today = dateResolver.getToday()
        this.fillWeekDays()
        this.fillMonths()
        this.fillCalendar(
            dateResolver.getYear(today),
            dateResolver.getMonth(today)
        )
    },
    computed: {
        currentDate () {
            let date = this.months[this.currentMonth]
            if (dateComparer.isCurrentYear(this.currentYear)) {
                date += ` ${this.currentYear}`
            }
            return date
        }
    }
}
</script>

<style lang="scss">
.calendar {
  width: 100%;
  height: 100%;
  padding: 15px;
  background: var(--grey);

  &__table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 15px;
    padding: 15px;
  }

  &__row {
    width: 100%;
    display: flex;
    align-items: center;
    height: 20px;
    margin-bottom: 15px;
  }

  &__header-wrapper {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: var(--calendar-gap);
    grid-auto-rows: 1fr;
    width: 100%;
  }

  &__header {
    flex: 1;
    flex-shrink: 0;
    font-size: 14px;
    text-align: right;
    font-weight: bold;
    text-transform: uppercase;
    border: 3px solid inherit;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__month {
    margin: 0 15px;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    height: 100%;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: var(--calendar-gap);
    grid-auto-rows: 1fr;
    height: 100%;
    width: 100%;
  }
}
</style>
