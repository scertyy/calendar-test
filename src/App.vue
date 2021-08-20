<template>
    <div id="app">
        <Calendar :events="$store.state.events">
        </Calendar>
    </div>
</template>

<script>
import Calendar from './components/Calendar.vue'

export default {
    name: 'App',
    components: {
        Calendar
    }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
</style>
