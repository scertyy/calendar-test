<!--component for single date in calendar-->
<template>
    <div class="calendar-day" :class="classes">
        <div class="calendar-day__name">
            {{ day }}
        </div>
        <calendar-event
            v-for="event in sortedEvents"
            :key="event.id"
            :event="event"
        />
    </div>
</template>

<script>
import CalendarEvent from "./CalendarEvent";
export default {
    components: { CalendarEvent },
    props: {
        day: [Number, String],
        events: Array,
        disabled: Boolean,
        dayOff: Boolean,
        today: Boolean,
    },
    computed: {
        sortedEvents() {
            let events = this.events;
            return events.sort((a, b) => a.date.millisecond() - b.date.millisecond());
        },
        classes() {
            return {
                "calendar-day_disabled": this.disabled,
                "calendar-day_day-off": this.dayOff,
                "calendar-day_today": this.today,
            };
        },
    },
};
</script>

<style lang="scss">
.calendar-day {
  display: flex;
  flex-direction: column;

  font-weight: normal;
  font-style: normal;
  font-size: 16px;
  line-height: 21px;
  background: #ffffff;
  padding: 5px;
  height: 100%;
  border-radius: 3px;
  border: 3px solid var(--grey);
  &.calendar-day_disabled {
    background: var(--grey);
    color: var(--dark-grey);
  }
  &.calendar-day_day-off {
    color: var(--lilac);
  }
  &.calendar-day_today {
    color: var(--green);
  }
}
.calendar-day__name {
  font-weight: bold;
  text-align: right;
}
</style>
