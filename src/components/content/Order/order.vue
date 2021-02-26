<template>
  <div>
    <order-bread-crumb-nav />
    <order-card-view
      @getOrderList="getOrderList"
      :queryInfo="queryInfo"
      :orderList="orderList"
      :total="total"
    ></order-card-view>
  </div>
</template>

<script>
import orderBreadCrumbNav from "./orderChildren/orderBreadCrumbNav.vue";
import OrderCardView from "./orderChildren/orderCardView.vue";

// 网络请求的封装
import { getOrderList } from "network/order";

export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      orderList: [],
      total: 0,
    };
  },
  methods: {
    getOrderList(data) {
      this.getOrderList(data);
    },
    /**
     * 网络请求
     */
    getOrderList(data) {
      getOrderList(data).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("请求数据出错");
        }
        this.orderList = res.data.goods;
        this.total = res.data.total;
        console.log(res);
      });
    }
  },
  components: {
    orderBreadCrumbNav,
    OrderCardView,
  },
  created() {},
};
</script>

<style scoped>
</style>