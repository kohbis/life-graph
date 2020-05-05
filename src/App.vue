<template lang="pug">
  div#app
    h1
      | {{ message }}
    life-chart
  </div>
</template>

<script>
import LifeChart from './components/LifeChart.vue';

export default {
  name: 'App',
  components: {
    LifeChart
  },
  data: () => {
    return {
      message: 'Life Graphs'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
