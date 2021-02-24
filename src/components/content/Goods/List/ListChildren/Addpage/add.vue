<template>
  <div>
    <add-bread-crumb-nav />
    <add-card-view @getCateList="getCateList" :cateList="cateList"></add-card-view>
  </div>
</template>

<script>
import AddBreadCrumbNav from './AddChildren/AddBreadCrumbNav.vue'
import AddCardView from './AddChildren/AddCardView.vue'

import {getCateList} from 'network/list.js'
export default {
  data(){
    return{
      cateList:[]
    }
  },
  methods:{
    getCateList(){
      this.getCateList()
    },

    /**
     * 所有数据请求
     */
    getCateList(){
      getCateList().then(res =>{
        if(res.meta.status !==200){
          return this.$message.error('数据请求有误')
        }
        this.cateList = res.data
        console.log(this.cateList);
      })
    }
  },
  components: { AddBreadCrumbNav, AddCardView },

}
</script>

<style scoped>

</style>