<template>
  <div>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="isShowVisible">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="roleList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand"></el-table-column>
        <!-- 索引列 -->
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="updateUserById(scope.row.id)"
              >修改</el-button
            >

            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="removeUserById(scope.row.id)"
              >删除</el-button
            >

            <!-- 分配角色 -->
            <el-button type="warning" icon="el-icon-setting"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色 -->
    <div>
      <el-dialog
        title="提示"
        :visible.sync="isShowAddVisible"
        @close="addDialogClosed"
      >
        <el-form
          :model="ruleForm"
          :rules="ruleFormRules"
          ref="ruleFormRef"
          label-width="100px"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="ruleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="ruleForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="rolesSubmitFrom(ruleForm)"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <!-- 修改角色 -->
    <div>
      <el-dialog title="提示" :visible.sync="isShowEditVisible">
        <el-form
          :model="roleEdit"
          :rules="ruleFormRules"
          ref="editFormRef"
          label-width="100px"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="roleEdit.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="roleEdit.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSubmitFrom(roleEdit)"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    roleList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    roleEdit: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      isShowAddVisible: false,
      isShowEditVisible: false,
      editDate: {},
      ruleForm: {
        roleName: "",
        roleDesc: "",
      },
      ruleFormRules: {
        roleName: [
          { required: true, message: "请输入角色名称", tigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "角色名称再2 ~ 10个字符之间",
            tigger: "blur",
          },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", tigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "角色名称再2 ~ 15个字符之间",
            tigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    isShowVisible() {
      this.isShowAddVisible = true;
    },
    addDialogClosed() {
      this.$refs.ruleFormRef.resetFields();
    },
    rolesSubmitFrom(param) {
      this.$refs.ruleFormRef.validate((valid) => {
        if (!valid) return;
        this.$emit("roleFromDate", param);
        this.isShowAddVisible = false;
      });
    },
    updateUserById(param) {
      this.$emit("roleUpdateDate", param);
      this.isShowEditVisible = true;
    },
    editSubmitFrom(param) {
      this.$emit("submitUpdate", param);
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        this.$emit("submitUpdate", param);
        this.isShowEditVisible = false;
      });
    },
    removeUserById(param){
      this.$emit("removeRolesDate", param);
    }
  },
};
</script>

<style scoped>
</style>