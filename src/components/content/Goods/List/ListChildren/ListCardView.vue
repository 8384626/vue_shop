<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @input="getListDate(queryInfo)"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getListDate(queryInfo)"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- table表格区域 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
          width="110"
        ></el-table-column>
        <el-table-column
          label="商品重量"
          prop="goods_weight"
          width="110"
        ></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="165">
          <template slot-scope="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.goods_id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    queryInfo: {
      type: Object,
      defalut() {
        return {};
      },
    },
    goodsList: {
      type: Array,
      defalut() {
        return [];
      },
    },
    total: {
      type: Number,
      defalut: 0,
    },
  },
  data() {
    return {};
  },
  filters: {
    dateFormat(originVal) {
      const dt = new Date(originVal * 1000);
      const y = dt.getFullYear();
      const m =
        dt.getMonth().length === 1 ? "0" + dt.getMonth() : dt.getMonth();
      const d = (dt.getDate() + "").padStart(2, "0");

      const hh = (dt.getHours() + "").padStart(2, "0");
      const mm = (dt.getMinutes() + "").padStart(2, "0");
      const ss = (dt.getSeconds() + "").padStart(2, "0");
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    },
  },
  methods: {
    // 根据分页获取对应商品
    getListDate(param) {
      this.$emit("getListDate", param);
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getListDate(this.queryInfo);
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getListDate(this.queryInfo);
    },
    async removeById(id) {
      const result = await this.$confirm(
        "此操作将删除当前商品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (result !== "confirm") return;
      this.$emit('removeById', id);
    },
    goAddpage(){
      this.$router.push('/goods/add')
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getListDate(this.queryInfo);
  },
};
</script>

<style scoped>
</style>