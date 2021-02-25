<template>
  <div>
    <edit-bread-crumb-nav />
    <edit-card-view
      @getCateList="getCateList"
      :cateList="cateList"
      @getCateParamList="getCateParamList"
      :manyTableDate="manyTableDate"
      :onlyTableDate="onlyTableDate"
      @updateCateData="updateCateData"
      :editForm="editForm"
    ></edit-card-view>
  </div>
</template>

<script>
import EditBreadCrumbNav from './editChildren/editBreadCrumbNav.vue';
import EditCardView from './editChildren/editCardView.vue';

import { getCateList, getCateParamList, updateByIdData, updateCateData } from "network/list.js";

export default {
  data() {
    return {
      cateList: [],
      manyTableDate: [],
      onlyTableDate:[],
      editForm:{}
    };
  },
  methods: {
    editCateList(id) {
      this.updateByIdData(id)
    },
    getCateList() {
      this.getCateList();
    },
    getCateParamList(value) {
      this.getCateParamList(value);
    },
    updateCateData(value){
      
      this.updateCateData(value)
    },
    /**
     * 所有数据请求
     */
    updateByIdData(id){
      updateByIdData(id).then(res =>{
        if (res.meta.status !== 200) {
          return this.$message.error("数据请求有误");
        }
        res.data.goods_cat=res.data.goods_cat.split(",").map(Number)
        this.editForm= res.data
        console.log(res);
      })
    },
    getCateList() {
      getCateList().then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("数据请求有误");
        }
        this.cateList = res.data;
      });
    },
    getCateParamList(data) {
      getCateParamList(data).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("数据请求有误");
        }
        console.log(res);
        if (data.sel === "many") {
          res.data.forEach((item) => {
            item.attr_vals =
              item.attr_vals.length === 0 ? [] : item.attr_vals.split(",");
          });
          this.manyTableDate = res.data;
        } else {
          this.onlyTableDate = res.data;
        }
      });
    },
    updateCateData(data) {
      updateCateData(data).then(res =>{
        if (res.meta.status !== 200) {
          console.log(res);
          return this.$message.error(res.meta.msg);
        }
        this.$message.success('修改商品成功')
        this.$router.replace('/goods')
      })
    }
  },
  components: { EditBreadCrumbNav,EditCardView},
  created(){
    this.editCateList(this.$route.query.id)
  }
};
</script>

<style scoped>
</style>