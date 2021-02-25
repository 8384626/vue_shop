<template>
  <div>
    <add-bread-crumb-nav />
    <add-card-view
      @getCateList="getCateList"
      :cateList="cateList"
      @getCateParamList="getCateParamList"
      :manyTableDate="manyTableDate"
      :onlyTableDate="onlyTableDate"
      @setCateDate="setCateDate"
    ></add-card-view>
  </div>
</template>

<script>
import AddBreadCrumbNav from "./AddChildren/AddBreadCrumbNav.vue";
import AddCardView from "./AddChildren/AddCardView.vue";

import { getCateList, getCateParamList, setCateDate } from "network/list.js";
export default {
  data() {
    return {
      cateList: [],
      manyTableDate: [],
      onlyTableDate:[]
    };
  },
  methods: {
    getCateList() {
      this.getCateList();
    },
    getCateParamList(value) {
      this.getCateParamList(value);
    },
    setCateDate(value){
      this.setCateDate(value)
    },
    /**
     * 所有数据请求
     */
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
    setCateDate(data) {
      setCateDate(data).then(res =>{
        if (res.meta.status !== 201) {
          return this.$message.error("添加数据有误");
        }
        this.$message.success('添加商品成功')
        this.$router.replace('/goods')
      })
    }
  },
  components: { AddBreadCrumbNav, AddCardView },
};
</script>

<style scoped>
</style>