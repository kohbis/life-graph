<template lang="pug">
  #app
    h1
      | {{ message }}
    loading(v-if="loading")
    life-chart(v-else)
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Loading from './components/Loading.vue';
import LifeChart from './components/LifeChart.vue';

@Component({
  components: {
    Loading,
    LifeChart,
  },
})
export default class App extends Vue {
  private loading: boolean = true;
  private message: string = 'Life Graphs';

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
