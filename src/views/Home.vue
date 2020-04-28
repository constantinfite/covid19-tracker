<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="6">
        <v-select
          :value="listStates"
          return-object
          multiple
          v-model="listSelected"
          @change="changeValue"
          :items="listStates"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="10">
        <Chart
          v-if="loaded"
          :chartData="dataCollection"
          :options="chartOptions"
          label="Positive"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Chart from "@/components/Chart.vue";
//import Card from "@/components/Chart.vue";
import { fetchCountry, fetchData } from "../api";
import moment from "moment";
//import axios from "axios";

export default {
  name: "Home",
  components: {
    Chart
  },
  data() {
    return {
      colorList: [],
      time: [],
      dataset: [],
      data: [],
      loaded: false,
      allData: [],
      listSelected: [],
      listStates: [],
      datacollection: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  methods: {
    changeValue() {
      this.data = [];
      if (this.listSelected.length !== 0) {
        for (var i = 0; i < this.listSelected.length; i++) {
          var tab = [];
          this.allData.data.forEach(d => {
            if (d.state == this.listSelected[i].value) {
              //add the value to the array tab if the name of the state
              // is equal at the value of the v-select value
              const { positive } = d;

              tab.push(positive);
            }
          });
          const length = tab.length;
          const diff = this.time.length - length;

          for (var j = 0; j < diff; j++) {
            tab.push(0);
          }
          tab = tab.reverse();
          this.data.push(tab);
        }
      }
      this.createColor();
      this.createDataSet();
      this.fillData();

      this.loaded = true;
    },
    fillData() {
      this.dataCollection = {
        labels: this.time,
        datasets: this.dataset
      };
    },
    createDataSet() {
      this.dataset = [];
      for (var i = 0; i < this.listSelected.length; i++) {
        this.dataset.push({
          label: this.listSelected[i].text, // legend of the plot
          data: this.data[i],
          backgroundColor: this.colorList[i]
        });
      }
    },
    // create the abscisse
    createTime() {
      var previousDate;
      this.allData.data.forEach(d => {
        const date = moment(d.date, "YYYYMMDD").format("MM/DD");
        if (date !== previousDate) {
          this.time.push(date);
          previousDate = date;
        }
      });

      this.time = this.time.reverse(); // reverse because the dates are in the wrong way
      this.time = this.time.slice(40); // slice the number of day
    },
    //create the color for each state
    createColor() {
      for (var i = 0; i < this.listSelected.length; i++) {
        const red = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const color = "rgb(" + red + "," + green + "," + blue + "," + "0.2)";
        this.colorList.push(color);
      }
    }
  },
  async created() {
    const country = await fetchCountry(); // fill the array of all the countries
    country.data.map(state => {
      this.listStates.push({ text: state.name, value: state.state });
    });

    this.allData = await fetchData(); //retrieve all the data of the json file
    this.createTime(); //create the array of Date
  },

  async mounted() {}
};
</script>
