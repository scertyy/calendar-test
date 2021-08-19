<template>
  <div class="calendar-event" :class="classes">
    <div class="calendar-event__text">
      {{ validTime }} {{ event.name }} {{ event.name }} {{ event.name }}
      {{ event.name }} {{ event.name }} {{ event.name }}
    </div>
  </div>
</template>

<script>
import calendarEventModel from "../models/calendarEventModel";

export default {
  props: {
    event: calendarEventModel,
  },
  computed: {
    validTime() {
      return this.event.date.format("HH:mm");
    },
    classes() {
      return {
        "calendar-event_red": this.event.eventType === "red",
        "calendar-event_orange": this.event.eventType === "orange",
        "calendar-event_green": this.event.eventType === "green",
      };
    },
  },
};
</script>

<style lang="scss">
.calendar-event {
  width: 100%;
  height: 25px;
  margin: 3px 0;
  border-radius: 6px;
  text-align: left;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  display: flex;
  align-items: center;
  cursor: pointer;

  &.calendar-event_red {
    background: var(--red);
    color: var(--dark-red);
    .calendar-event__text {
      background: var(--red);
    }
  }
  &.calendar-event_orange {
    background: var(--orange);
    color: var(--dark-orange);
    .calendar-event__text {
      background: var(--orange);
    }
  }
  &.calendar-event_green {
    background: var(--green);
    color: var(--dark-green);
    .calendar-event__text {
      background: var(--green);
    }
  }
  &__text {
    width: 100%;
    text-overflow: ellipsis;
    position: absolute;
    overflow: hidden;
    font-weight: bold;
    height: 100%;
    left: 0;
    padding: 3px;
    border-radius: 6px;
  }
  &:hover {
    overflow: visible;
    .calendar-event__text {
      width: auto;
    }
  }
}
</style>
