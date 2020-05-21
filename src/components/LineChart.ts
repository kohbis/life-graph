import { Component, Mixins, Prop } from "vue-property-decorator";
import Chart from "chart.js";
import { Line, mixins } from 'vue-chartjs';

@Component
export default class LineChart extends Mixins(Line, mixins.reactiveProp) {
  @Prop() public chartData!: Chart.ChartData;
  @Prop() public chartOptions!: Chart.ChartOptions;

  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(
      this.chartData,
      this.chartOptions
    );
  }
}
