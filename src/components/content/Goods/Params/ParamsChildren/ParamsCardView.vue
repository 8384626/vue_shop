<template>
  <div>
    <el-card>
      <!-- 头部的警告区域 -->
      <div>
        <el-alert
          title="注意:只允许为第三级分类设置相关的参数"
          type="warning"
          :closable="false"
          show-icon
        >
        </el-alert>
      </div>
      <!-- 选择商品分类的区域 -->
      <div class="Params-classify">
        <el-row>
          <el-col>
            <span>选择商品分类: </span>
            <!-- 选择商品分类的级联选择框 -->
            <el-cascader
              v-model="selectedCateKeys"
              :options="cateList"
              :props="cateProps"
              @change="handleChange"
            ></el-cascader>
          </el-col>
        </el-row>
      </div>
      <!-- tab页签区域 -->
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 添加动态参数面板 -->
          <el-tab-pane label="动态参数" name="many">
            <el-button
              type="primary"
              size="mini"
              :disabled="isBtnDisabled"
              @click="isShowAddVisible = true"
              >添加参数</el-button
            >
            <el-table :data="manyTableData" border stripe>
              <!-- 展开行 -->
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-tag
                    v-for="(item, i) in scope.row.attr_vals"
                    :key="i"
                    closable
                    @close="handleClose(i,scope.row)"
                    >{{ item }}</el-tag
                  >
                  <!-- 输入文本框 -->
                  <el-input
                    class="input-new-tag"
                    v-if="scope.row.inputVisible"
                    v-model="scope.row.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(scope.row)"
                    @blur="handleInputConfirm(scope.row)"
                  >
                  </el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput(scope.row)"
                    >+ New Tag</el-button
                  >
                </template>
              </el-table-column>
              <!-- 索引列 -->
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column
                label="参数名称"
                prop="attr_name"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="showEditDialog(scope.row.attr_id)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="removeParams(scope.row.attr_id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- 添加静态属性面板 -->
          <el-tab-pane label="静态属性" name="only">
            <el-button
              type="primary"
              size="mini"
              :disabled="isBtnDisabled"
              @click="isShowAddVisible = true"
              >添加属性</el-button
            >
            <el-table :data="onlyTableData" border stripe>
              <!-- 展开行 -->
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-tag
                    v-for="(item, i) in scope.row.attr_vals"
                    :key="i"
                    closable
                    @close="handleClose(i,scope.row)"
                    >{{ item }}</el-tag
                  >
                  <!-- 输入文本框 -->
                  <el-input
                    class="input-new-tag"
                    v-if="scope.row.inputVisible"
                    v-model="scope.row.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(scope.row)"
                    @blur="handleInputConfirm(scope.row)"
                  >
                  </el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput(scope.row)"
                    >+ New Tag</el-button
                  >
                </template>
              </el-table-column>
              <!-- 索引列 -->
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column
                label="参数名称"
                prop="attr_name"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="showEditDialog(scope.row.attr_id)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="removeParams(scope.row.attr_id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tabs></el-tabs>
        </el-tabs>
      </div>
    </el-card>
    <!-- 添加参数的对话框 -->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="isShowAddVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <div>
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item :label="titleText" prop="attr_name">
            <el-input v-model="addForm.attr_name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改参数的对话框 -->
    <el-dialog
      :title="'修改' + titleText"
      :visible.sync="isShowEditVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <div>
        <el-form
          :model="editForm"
          :rules="addFormRules"
          ref="editFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item :label="titleText" prop="attr_name">
            <el-input v-model="editForm.attr_name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    cateList: {
      type: Array,
      default() {
        return [];
      },
    },
    manyTableData: {
      type: Array,
      default() {
        return [];
      },
    },
    onlyTableData: {
      type: Array,
      default() {
        return [];
      },
    },
    cateAttr: {
      type: String,
      default: "",
    },
    editCateAttr: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 级联选择框的配置对象
      cateProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 级联选择框的双向绑定到的数组
      selectedCateKeys: [],
      // 被激活的页签名称
      activeName: "many",
      // 控制添加对话框的显示和隐藏
      isShowAddVisible: false,
      // 添加参数的表单数据对象
      addForm: {
        attr_name: "",
      },
      // 添加表单验证
      addFormRules: {
        attr_name: [
          { required: true, message: "请输入参数名称", tigger: "blur" },
        ],
      },
      // 控制修改参数的对话框的显示和隐藏
      isShowEditVisible: false,
      // 修改参数的表单数据对象
      editForm: {
        attr_id: "",
        attr_name: "",
      },
    };
  },
  methods: {
    getCateList() {
      this.$emit("getCateList");
    },
    // 级联选择框选中项 变化触发
    handleChange() {
      this.getParamsData();
    },
    // 这是tab页签点击事件的处理函数
    handleClick() {
      this.getParamsData();
    },
    // 获取参数的列表数据
    getParamsData() {
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = [];
        this.manyTableData=[]
        this.onlyTableData=[]
        this.$message.warning("请选择正确的商品分类");
        return;
      }
      let param = {
        id: this.cateId,
        sel: this.activeName,
      };
      // 根据所选分类的id 和当前所处的面板获取对应的参数
      this.$emit("getCateListById", param);
    },
    // 监听对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮添加参数
    addParams() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        const param = {
          id: this.cateId,
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeName,
        };
        console.log(param);
        this.$emit("addParamsDate", param);
        this.isShowAddVisible = false;
      });
    },
    // 点击按钮显示修改的对话框
    showEditDialog(attr_id) {
      const param = {
        id: this.cateId,
        attrId: attr_id,
        attr_sel: this.activeName,
      };
      this.editForm.attr_id = attr_id;
      this.$emit("getCateAttrById", param);
      this.isShowEditVisible = true;
    },
    // 监听修改对话框的关闭事件
    editDialogClosed() {
      this.editForm.attr_name = this.cateAttr;
    },
    // 点击按钮修改操作
    editParams() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        const param = {
          id: this.cateId,
          attrId: this.editForm.attr_id,
          attr_name: this.editForm.attr_name,
          attr_sel: this.activeName,
        };
        this.$emit("editParamsDate", param);
        this.isShowEditVisible = false;
      });
    },
    // 根据id删除对应的参数对应项
    async removeParams(attr_id) {
      const result = await this.$confirm(
        "此操作将删除当前参数, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (result !== "confirm") return;
      //删除的业务逻辑
      const param = {
        id: this.cateId,
        attrid: attr_id,
        attr_sel: this.activeName,
      };
      this.$emit("removeParamsDate", param);
    },
    // 文本框失去了焦点或者回车键都会触发
    handleInputConfirm(row) {
      if (row.inputValue.trim().length === 0) {
        row.inputValue = "";
        row.inputVisible = false;
        return;
      }
      row.attr_vals.push(row.inputValue.trim());
      row.inputValue = "";
      row.inputVisible = false;
      const param = {
        id: this.cateId,
        attrId: row.attr_id,
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(","),
      };
      this.$emit("editParamsDate", param);
    },
    // 点击按钮展示文本输入框
    showInput(row) {
      row.inputVisible = true;
      // nextTick 当页面上 元素被重新渲染之后 才会执行回调函数中的代码
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //删除对应参数的可选项
    handleClose(index,row){
      row.attr_vals.splice(index,1)
      const param = {
        id: this.cateId,
        attrId: row.attr_id,
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(","),
      }; 
      this.$emit("editParamsDate", param);
    }
  },
  computed: {
    // 判断按钮是否需要被禁用
    isBtnDisabled() {
      if (this.selectedCateKeys.length) {
        return false;
      }
      return true;
    },
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2];
      }
      return null;
    },
    // 动态计算标题文本
    titleText() {
      return this.activeName === "many" ? "动态参数" : "静态属性";
    },
  },
  watch: {
    cateAttr(newValue) {
      this.editForm.attr_name = newValue;
    },
    editCateAttr(newValue) {
      this.editForm.attr_name = newValue;
    },
  },
  created() {
    this.getCateList();
  },
};
</script>

<style scoped>
.Params-classify {
  margin: 20px 0;
}
.el-tag {
  margin: 10px;
}
.input-new-tag {
  width: 120px;
}
</style>