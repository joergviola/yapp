<template>
  <div :class="clazz">
    <div class="card">
      <div class="card-header">
        <h4 class="clearfix">
          <i v-if="icon" :class="icon"></i>
          {{label}}
        </h4>
      </div>
        <div class="card-block">
          <chart :data="data" :height="height"></chart>
        </div>
      </div>
  </div>
</template>

<script>
    import api from '@/api.js'
    import Vue from 'vue'
    import { Bar } from 'vue-chartjs'
    import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

    const chart = {
      extends: Bar,
      props: ['data'],
      watch: {
        data () {
          // Overwriting base render method with actual data.
          this.renderChart(
            {
              labels: Object.keys(this.data),
              datasets: [
                {
                  backgroundColor: '#f87979',
                  data: Object.values(this.data)
                }
              ]
            },
            {
              responsive: true,
              maintainAspectRatio: true,
              legend: {
                display: false
              },
              tooltips: {
                enabled: false,
                custom: CustomTooltips,
                intersect: true,
                mode: 'index',
                position: 'nearest',
                callbacks: {
                  labelColor: function (tooltipItem, chart) {
                    return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].backgroundColor }
                  }
                }
              }
            }
          )
        }
      },
    }

    export default {
        name: 'Barchart',
        props: ['icon', 'label', 'cols', 'query', 'type', 'x', 'xaxis', 'height'],
        components: {chart},
        computed: {
            clazz() { return 'col-sm-' + this.cols },
            withFixed() { return this.with }
        },
        data() {
            return {
                data: {},
            }
        },
        mounted() {
            this.load()
        },
        methods : {
            load() {
                api.list(this.type, this.query)
                    .then(items => {
                      const data = Object.assign({}, this.xaxis)
                      items.forEach(item => {
                        data[this.x(item)]++
                      })
                      this.data = data
                      console.log("NEW DATA", JSON.stringify(data))
                    });
            },
        }
    }
</script>
