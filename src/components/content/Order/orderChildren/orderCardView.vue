<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input
            v-model="queryInfo.query"
            placeholder="请输入内容"
            clearable
            @input="getOrderList(queryInfo)"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getOrderList(queryInfo)"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单列表数据 -->
      <div>
        <el-table :data="orderList" border stripe>
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column
            label="订单编号"
            prop="order_number"
          ></el-table-column>
          <el-table-column
            label="订单价格"
            prop="order_price"
            width="120"
          ></el-table-column>
          <el-table-column label="是否付款" prop="pay_status" width="140">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.pay_status === '1'"
                >已付款</el-tag
              >
              <el-tag type="danger" v-else>未付款</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="是否发货"
            prop="is_send"
            width="140"
          ></el-table-column>
          <el-table-column label="下单时间" prop="create_time" width="220">
            <template slot-scope="scope">
              {{ scope.row.create_time | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showBox"
                >修改地址</el-button
              >
              <el-button
                type="success"
                icon="el-icon-location"
                size="mini"
                @click="showProgressBox"
                >查询物流</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页功能 -->
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[3, 5, 8, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- 修改地址对话框 -->
      <div>
        <el-dialog
          title="修改地址"
          :visible.sync="isShowAddressVisible"
          width="50%"
          @close="addressDialogClosed"
        >
          <el-form
            :model="addressForm"
            :rules="addressFormRules"
            ref="addressFormRef"
            label-width="100px"
          >
            <el-form-item label="省市区/县" prop="address1">
              <el-cascader
                :options="cityData"
                v-model="addressForm.address1"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="address2">
              <el-input
                v-model="addressForm.address2"
                placeholder="请输入详细地址"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isShowAddressVisible = false">取 消</el-button>
            <el-button type="primary" @click="isShowAddressVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
      <!-- 展示物流进度 -->
      <el-dialog
        title="物流进度"
        :visible.sync="isShowProgressVisible"
        width="50%"
      >
        <span>程序猿小哥哥正在加急中....</span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import cityData from "assets/js/citydata.js";

export default {
  props: {
    queryInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    orderList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isShowAddressVisible: false,
      addressForm: {
        address1: [],
        address2: "",
      },
      addressFormRules: {
        address1: [
          { required: true, message: "请选择省市区/县", trigger: "blur" },
        ],
        address2: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
      },
      cityData,
      isShowProgressVisible: false,
    };
  },
  methods: {
    // 获取订单列表
    getOrderList(param) {
      this.$emit("getOrderList", param);
    },
    handleSizeChange(newSzie) {
      this.queryInfo.pagesize = newSzie;
      this.queryInfo.pagenum = 1;
      this.getOrderList(this.queryInfo);
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getOrderList(this.queryInfo);
    },
    // 展示修改地址的对话框
    showBox() {
      this.isShowAddressVisible = true;
    },
    addressDialogClosed() {
      this.$refs.addressFormRef.resetFields();
    },
    showProgressBox() {
      this.isShowProgressVisible = true;
    },
    searchDate() {
      this.getOrderList(this.queryInfo);
    },
  },
  filters: {
    dateFormat(originVal) {
      const dt = new Date(originVal * 1000);
      const y = dt.getFullYear();
      const m = (dt.getMonth() + 1 + "").padStart(2, "0");
      const d = (dt.getDate() + "").padStart(2, "0");

      const hh = (dt.getHours() + "").padStart(2, "0");
      const mm = (dt.getMinutes() + "").padStart(2, "0");
      const ss = (dt.getSeconds() + "").padStart(2, "0");
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    },
  },
  created() {
    this.getOrderList(this.queryInfo);
  },
};
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>