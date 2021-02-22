<template>
  <div>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="isShowVisible">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="roleList" border stripe height="calc(100vh - 230px)">
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item1, index1) in scope.row.children"
              :key="item1.id"
              :class="['bdbottom', index1 === 0 ? 'bdtop' : '']"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="
                    removeRolesById({
                      roleId: scope.row,
                      rightId: item1.id,
                    })
                  "
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="(item2, index2) in item1.children"
                  :key="item2.id"
                  :class="[index2 === 0 ? '' : 'bdtop']"
                >
                  <!-- 渲染二级权限 -->
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="
                        removeRolesById({
                          roleId: scope.row,
                          rightId: item2.id,
                        })
                      "
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 渲染三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="
                        removeRolesById({
                          roleId: scope.row,
                          rightId: item3.id,
                        })
                      "
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
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
            <el-button
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
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
    <!-- 分配权限的对话框 -->
    <div>
      <el-dialog title="分配权限" :visible.sync="isShowSetVisible" width="50%">
        <!-- 树形控件 -->
        <el-tree
          :data="getRoleslist"
          :props="treeProps"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="defKeys"
          ref="treeRef"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowSetVisible = false">取 消</el-button>
          <el-button type="primary" @click="allotRights"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import RolesVue from '../Roles.vue';
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
    roleChildrenList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    getRoleslist: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      isShowAddVisible: false,
      isShowEditVisible: false,
      // 控制分配权限对话框的显示和隐藏
      isShowSetVisible: false,
      editDate: {},
      param: {},
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
      treeProps: {
        label: "authName",
        children: "children",
      },
      // 默认选中节点的id值数组
      defKeys:[],
      // 当前即将分配权限的角色id
      roleId:''
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
    // 提交修改的表单
    editSubmitFrom(param) {
      this.$emit("submitUpdate", param);
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        this.$emit("submitUpdate", param);
        this.isShowEditVisible = false;
      });
    },
    removeUserById(param) {
      this.$emit("removeRolesDate", param);
    },
    // 根据id删除对应的权限
    async removeRolesById(param) {
      // 弹框提示用户是否要删除
      const result = await this.$confirm(
        "是否确认删除该权限, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (result !== "confirm") return;
      this.param = param;
      this.$emit("removeRolesById", param);
    },
    // 展示分配权限
    showSetRightDialog(role) {
      this.roleId=role.id
      this.$emit("getRolseList");
      // 递归获取三级节点的Id
      this.defKeys=[]
      this.getLeafKeys(role,this.defKeys)
      this.isShowSetVisible = true;
    },
    // 通过 递归 获取角色下所有权限的id 并保存到数组中
    getLeafKeys(node, arr){
      if(!node.children){
        return arr.push(node.id)
      }
      node.children.forEach(item => this.getLeafKeys(item, arr));
    },
    // 为角色分配权限
    allotRights(){
      const keys=[
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ]
      const keyStrs=keys.join(',')
      let params={roleId:this.roleId,rids:keyStrs}
      this.$emit("setRolseList", params);
      this.isShowSetVisible= false
    },
  },
  watch: {
    roleChildrenList(newValue) {
      this.param.roleId.children = newValue;
    },
  },
};
</script>

<style scoped>
.el-tag {
  margin: 10px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.el-row {
  display: flex;
  align-items: center;
}
</style>