<template>
  <div>
    <el-card>
      <el-row>
        <el-col>
          <el-button class="addCate" type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <tree-table
        class="TreeTable"
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        stripe
        border
        :show-row-hover="false"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: #096"
          ></i>
          <i class="el-icon-error" v-else style="color: #096"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEditCateDialog(scope.row.cat_id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deletCateDate(scope.row.cat_id)"
            >删除</el-button
          >
        </template>
      </tree-table>
      <!-- 分页 -->
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[3, 5, 8]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="isShowAddVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <!-- 添加分类的表单 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称 " prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类 ">
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑的对话框 -->
    <el-dialog title="修改分类" :visible.sync="isShowEditVisible" width="50%">
      <el-form
        :model="editCateForm"
        :rules="addCateFormRules"
        ref="editCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称 " prop="cat_name">
          <el-input v-model="editCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TreeTable from 'vue-table-with-tree-grid'

export default {
  props: {
    queryInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    cateList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    parentCateList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    editCateForm: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      // 定义每一列的信息
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok",
        },
        {
          label: "排序",
          type: "template",
          template: "order",
        },
        {
          label: "操作",
          type: "template",
          template: "opt",
        },
      ],
      // 控制添加分类的显示和隐藏
      isShowAddVisible: false,
      // 控制修改分类的显示和隐藏
      isShowEditVisible: false,
      // 添加分类的表单数据对象
      addCateForm: {
        cat_name: "",
        // 父级分类的Id
        cat_pid: 0,
        // 分类的等级默认添加的是一级分类
        cat_level: 0,
      },
      // 添加表单验证
      addCateFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", tigger: "blur" },
          { min: 2, max: 15, message: "请输入2 ~ 15个字符", tigger: "blur" },
        ],
      },
      // 指定级联选择器的配置对象
      cascaderProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
        checkStrictly: true,
      },
      // 选中的父级分类的Id数组
      selectedKeys: [],
    };
  },
  methods: {
    getCateList(param) {
      this.$emit("getCateList", param);
    },
    // 监听 pagesize的改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.queryInfo.pagenum = 1
      this.getCateList(this.queryInfo);
    },
    // 监听 pagenum的改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getCateList(this.queryInfo);
    },
    // 点击弹出添加分类
    showAddCateDialog() {
      this.$emit("getParentCateList", { type: 2 });
      this.isShowAddVisible = true;
    },
    // 选择性 发生变化触发这个函数
    parentCateChange() {
      console.log(this.selectedKeys);
      // 如果selectedKeys 数组中的 length 大于0 证明选中了父级分类
      // 反之 就说明没有选中任何父级分类
      if (this.selectedKeys.length > 0) {
        let addCateFormLength = this.selectedKeys.length;
        // 父级分类的id
        this.addCateForm.cat_pid = this.selectedKeys[addCateFormLength - 1];
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = addCateFormLength;
        return;
      } else {
        this.addCateForm.cat_pid = 0;
        this.addCateForm.cat_level = 0;
      }
    },
    // 添加新的分类
    addCate() {
      this.$refs.addCateFormRef.validate((valid) => {
        if (!valid) return;
        this.$emit("addCateList", this.addCateForm);
      });
      this.isShowAddVisible = false;
    },
    // 监听对话框的关闭事件 重置表单
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields();
      this.addCateForm.cat_pid = 0;
      this.addCateForm.cat_level = 0;
      this.selectedKeys = [];
    },
    // 监听弹出 修改分类
    showEditCateDialog(param) {
      this.$emit("getCateById", param);
      this.isShowEditVisible = true;
    },
    // 监听修改提交的代码
    addEdit() {
      this.$refs.editCateFormRef.validate((valid) => {
        if (!valid) return;
        const param = {
          id: this.editCateForm.cat_id,
          cat_name: this.editCateForm.cat_name,
        };
        this.$emit("updateCateDate", param);
        this.getCateList(this.queryInfo);
        this.isShowEditVisible = false;
      });
    },
    // 删除当前分类
    async deletCateDate(id) {
        const result = await this.$confirm(
        "此操作将删除该分类, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (result !== "confirm") return;
      this.$emit("deletCateDate", id);
      this.getCateList(this.queryInfo);
    },
  },
  created() {
    this.getCateList(this.queryInfo);
  },
  components:{
    TreeTable
  }
};
</script>

<style scoped>
.TreeTable {
  max-height: calc(100vh - 490px);
  overflow-y: scroll;
}
.addCate {
  margin-bottom: 20px;
}
.el-cascader {
  width: 100%;
}
</style>