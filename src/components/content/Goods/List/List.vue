<template>
  <div>
    <list-bread-crumb-nav />
    <list-card-view
      :queryInfo="queryInfo"
      @getListDate="getListDate"
      :goodsList="goodsList"
      :total="total"
      @removeById="removeById"
      @updateData="updateData"
    ></list-card-view>
  </div>
</template>

<script>
import ListBreadCrumbNav from "./ListChildren/ListBreadCrumbNav.vue";
import ListCardView from "./ListChildren/ListCardView.vue";

// 网络相关请求
import { getListDate, removeById, updateByIdData } from "network/list";
export default {
  components: { ListBreadCrumbNav, ListCardView },
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 8,
      },
      goodsList: [],
      total: 0,
    };
  },
  methods: {
    getListDate(value) {
      this.getListDate(value);
    },
    removeById(id) {
      this.removeById(id);
    },
    updateData(id){
      this.updateByIdData(id)
    },
    /**
     * 所有的网络请求
     */
    getListDate(data) {
      getListDate(data).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取数据失败");
        }
        this.goodsList = res.data.goods;
        this.total = res.data.total;
      });
    }
  },
};
</script>

<style scoped>
</style>