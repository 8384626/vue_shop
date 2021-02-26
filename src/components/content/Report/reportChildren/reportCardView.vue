<template>
  <div>
    <el-card>
      <div id="main" style="width: 750px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
// 导入echarts
import * as echarts from "echarts";

export default {
  props: {
    echarDate: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      options: {
        title: { text: "用户来源" },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: { backgroundColor: "#E9EEF3" },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [{ boundaryGap: false }],
        yAxis: [{ type: "value" }],
      },
    };
  },
  methods: {
    getReports() {
      this.$emit("getReports");
    },
    renderEchar() {
      var myChart = echarts.init(document.getElementById("main"));
      const result = Object.assign(this.options, this.echarDate);
      result.xAxis[0].boundaryGap = false;
      myChart.setOption(this.options);
    },
  },
  watch:{
    echarDate(newValue){
      if(this.echarDate.xAxis.length){
        this.renderEchar()
      }
    }
  },
  created() {
    this.getReports();
  },
  mounted() {},
};
</script>

<style scoped>
</style>