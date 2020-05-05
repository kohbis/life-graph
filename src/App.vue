<template lang="pug">
  div#app
    h1
      | {{ message }}
    loading(v-if="loading")
    life-chart(v-else)
  </div>
</template>

<script>
import Loading from './components/Loading.vue';
import LifeChart from './components/LifeChart.vue';

export default {
  name: 'App',
  components: {
    Loading,
    LifeChart
  },
  data() {
    return {
      loading: true,
      message: 'Life Graphs'
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
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
