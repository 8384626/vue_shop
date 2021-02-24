<template>
  <div>
    <params-bread-crumb-nav />
    <params-card-view
      @getCateList="getCateList"
      :cateList="cateList"
      @getCateListById="getCateListById"
      :manyTableData="manyTableData"
      :onlyTableData="onlyTableData"
      @addParamsDate="addParamsDate"
      @getCateAttrById="getCateAttrById"
      :cateAttr="cateAttr"
      @editParamsDate="editParamsDate"
      :editCateAttr="editCateAttr"
      @removeParamsDate="removeParamsDate"
    ></params-card-view>
  </div>
</template>

<script>
import ParamsBreadCrumbNav from "./ParamsChildren/ParamsBreadCrumbNav.vue";
import ParamsCardView from "./ParamsChildren/ParamsCardView.vue";

// 所有网络模块
import {
  getCateList,
  getCateListById,
  addParamsDate,
  getCateAttrById,
  editParamsDate,
  removeParamsDate,
} from "network/params";
export default {
  data() {
    return {
      cateList: [],
      manyTableData: [],
      onlyTableData: [],
      cateAttr: "",
      editCateAttr: "",
    };
  },
  methods: {
    // 获取所有商品列表
    getCateList() {
      this.getCateList();
    },
    // 根据id和面板动态获取数据
    getCateListById(value) {
      this.getCateListById(value);
    },
    addParamsDate(value) {
      this.addParamsDate(value);
    },
    getCateAttrById(value) {
      this.getCateAttrById(value);
    },
    editParamsDate(value) {
      this.editParamsDate(value);
    },
    removeParamsDate(value) {
      this.removeParamsDate(value);
    },
    /**
     * 网络请求
     */
    getCateList() {
      getCateList().then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取数据失败");
        }
        this.cateList = res.data;
      });
    },
    getCateListById(data) {
      getCateListById(data).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取数据失败");
        }
        res.data.forEach(item =>{
            item.attr_vals = item.attr_vals? item.attr_vals.split(',') : []
            item.inputVisible = false
            item.inputValue = ''
          })
        data.sel === "many"
          ? (this.manyTableData = res.data)
          : (this.onlyTableData = res.data);
      });
    },
    addParamsDate(data) {
      addParamsDate(data).then((res) => {
        if (res.meta.status !== 201) {
          return this.$message.error("添加数据失败");
        }
        this.getCateListById({ id: data.id, sel: data.attr_sel });
      });
    },
    getCateAttrById(data) {
      getCateAttrById(data).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("添加数据失败");
        }
        this.cateAttr = res.data.attr_name;
      });
    },
    editParamsDate(data) {
      editParamsDate(data).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("修改数据失败");
        }
        this.editCateAttr = res.data.attr_name;
        if(!data.attr_vals){
          this.$message.success("更新数据成功");
          this.getCateListById({ id: data.id, sel: data.attr_sel });
        }
      });
    },
    removeParamsDate(data) {
      removeParamsDate(data).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("删除数据失败");
        }
        this.$message.success("删除数据成功");
        this.getCateListById({ id: data.id, sel: data.attr_sel });
      });
    },
  },
  components: {
    ParamsBreadCrumbNav,
    ParamsCardView,
  },
};
</script>

<style>
</style>