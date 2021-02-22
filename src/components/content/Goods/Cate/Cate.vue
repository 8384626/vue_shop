<template>
  <div>
    <cate-bread-crumb-nav />
    <cate-card-view
      :queryInfo="queryInfo"
      @getCateList="getCateList"
      :cateList="cateList"
      :total="total"
      @getParentCateList="getParentCateList"
      :parentCateList="parentCateList"
      @addCateList="addCateList"
      @getCateById="getCateById"
      :editCateForm="editCateForm"
      @updateCateDate="updateCateDate"
      @deletCateDate="deletCateDate"
    ></cate-card-view>
  </div>
</template>

<script>
import CateBreadCrumbNav from "./CateChildren/CateBreadCrumbNav.vue";
import CateCardView from "./CateChildren/CateCardView.vue";

// 所有网络请求
import {
  getCateList,
  getParentCateList,
  addCateList,
  getCateById,
  updateCateDate,
  deletCateDate,
} from "network/goods.js";
export default {
  data() {
    return {
      cateList: [],
      // 总数据条数
      total: 0,
      // 父级分类的列表
      parentCateList: [],
      editCateForm: {},
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 8,
      },
    };
  },
  methods: {
    getCateList(value) {
      this.getCateList(value);
    },
    getParentCateList(value) {
      this.getParentCateList(value);
    },
    addCateList(value) {
      this.addCateList(value);
    },
    getCateById(value) {
      this.getCateById(value);
    },
    updateCateDate(value) {
      return this.updateCateDate(value);
    },
    deletCateDate(id) {
      this.deletCateDate(id);
    },
    /**
     * 所有的网络请求
     */
    getCateList(data) {
      getCateList(data).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("商品获取分类失败");
        }
        this.cateList = res.data.result;
        this.total = res.data.total;
      });
    },
    // 发送父级分类数据列表
    getParentCateList(data) {
      getParentCateList(data).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取父级分类数据失败");
        }
        this.parentCateList = res.data;
      });
    },
    addCateList(data) {
      addCateList(data).then((res) => {
        if (res.meta.status !== 201) {
          return this.$message.error("添加分类信息失败了");
        }
        this.getCateList(this.queryInfo);
        this.$message.success("已成功添加了分类信息");
      });
    },
    getCateById(id) {
      getCateById(id).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("查询分类失败");
        }
        this.editCateForm = res.data;
        console.log(this.editCateForm);
      });
    },
    // 修改分类信息
    updateCateDate(data) {
      updateCateDate(data).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("修改分类信息失败了");
        }
        this.getCateList(this.queryInfo);
          return this.$message.success("修改分类信息成功");
      });
    },
    // 删除当前分类名称
    deletCateDate(id) {
      deletCateDate(id).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("删除分类信息失败了");
        }
        this.getCateList(this.queryInfo);
        this.$message.success("已成功删除信息");

      });
    },
  },
  components: {
    CateBreadCrumbNav,
    CateCardView,
    getCateList,
  },
  created() {},
};
</script>

<style scope>
</style>