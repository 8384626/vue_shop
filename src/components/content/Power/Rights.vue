<template>
  <div>
    <!-- 面包屑导航 -->
    <bread-crumb-nav />
    <!-- 卡片视图 -->
    <card-view :rightsList="rightsList"></card-view>
  </div>
</template>

<script>
import BreadCrumbNav from "./RightsChildren/BreadCrumbNav";
import CardView from "./RightsChildren/CardView";

// 网络请求的导入
import { getRightsList } from "network/power";

export default {
  data() {
    return {
      rightsList: [],
    };
  },
  methods: {
    getRightsList() {
      getRightsList().then(res =>{
        if(res.meta.status !== 200){
          return this.$message.error('获取数据失败')
        }
        this.rightsList = res.data
      })
    },
  },
  components: { BreadCrumbNav, CardView },

  // hook
  created() {
    // 获取所有权限
    this.getRightsList();
    console.log(this.rightsList);
  },
};
</script>

<style scoped>
</style>