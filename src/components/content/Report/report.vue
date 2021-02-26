<template>
  <div>
    <report-bread-crumb-nav />
    <report-card-view @getReports="getReports" :echarDate="echarDate"></report-card-view>
  </div>
</template>

<script>
import reportBreadCrumbNav from "./reportChildren/reportBreadCrumbNav.vue";
import ReportCardView from "./reportChildren/reportCardView.vue";
//  网络请求
import { getReports } from "network/report";
export default {
  data() {
    return {
      echarDate:{}
    }
  },
  methods:{
    getReports(){
      this.getReports()
    },
    /**
     * 所有网络请求
     */
    getReports(){
      getReports().then(res =>{
        if(res.meta.status !== 200){
          return this.$message.error('获取折线图数据失败')
        }
        this.echarDate=res.data
      })
    }
  },
  components: {
    reportBreadCrumbNav,
    ReportCardView,
  },
};
</script>

<style>
</style>