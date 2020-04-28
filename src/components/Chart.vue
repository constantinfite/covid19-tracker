<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    label: {
      type: String
    },
    chartData: {
      type: Object,
      required: true,
      default: () => {}
    },
    options: {
      type: Object
    }
  },
  mounted() {
    /*const dates = this.chartData.map(d => d.date).reverse();
    const totals = this.chartData.map(d => d.total).reverse();
    console.log(dates);
    this.renderChart(
      {
        labels: dates,
        datasets: [
          {
            label: this.label,
            data: totals
          }
        ]
      },
      this.options
    );*/
    this.renderChart(this.chartData, this.options);
  }
};
</script>
