<template>
  <div>
    <!-- 面包屑导航 -->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 底部卡片样式 -->
    <div>
      <el-card>
        <!-- 添加用户一栏 -->
        <div style="margin-top: 15px">
          <el-row :gutter="40">
            <el-col :span="8">
              <el-input
                placeholder="请输入内容"
                v-model="queryInfo.query"
                clearable
                @change="getUserList(queryInfo)"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="getUserList(queryInfo)"
                ></el-button>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="isShowAddVisible = true"
                >添加用户</el-button
              >
            </el-col>
          </el-row>
        </div>
        <!-- 下方表格栏 -->
        <div>
          <el-table :data="userList" border stripe>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column label="姓名" prop="username"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="电话" prop="mobile"></el-table-column>
            <el-table-column label="角色" prop="role_name"></el-table-column>
            <el-table-column label="状态" prop="mg_state">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.mg_state"
                  @change="userStatechanged(scope.row)"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-tooltip
                  effect="dark"
                  content="修改"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="showEditDialog(scope.row.id)"
                  ></el-button>
                </el-tooltip>

                <!-- 删除按钮 -->
                <el-tooltip
                  effect="dark"
                  content="删除"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="removeUserById(scope.row.id)"
                  ></el-button>
                </el-tooltip>

                <!-- 分配角色 -->
                <el-tooltip
                  effect="dark"
                  content="分配角色"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    type="warning"
                    icon="el-icon-setting"
                    circle
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页部分 -->
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
    <!-- 添加用户的对话框 -->
    <div>
      <el-dialog
        title="添加用户"
        :visible.sync="isShowAddVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <!-- 内容主体区域 -->
        <div>
          <el-form
            :model="addForm"
            :rules="addFormRules"
            ref="addFormRef"
            label-width="70px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSubmitFrom"> 确 定 </el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 修改用户的对话框 -->
    <div>
      <el-dialog
        title="修改用户"
        :visible.sync="isShowEditVisible"
        width="30%"
        @click="editDialogClosed"
      >
        <div>
          <el-form
            :model="editFrom"
            :rules="addFormRules"
            ref="editFromRef"
            label-width="60px"
          >
            <el-form-item label="用户名">
              <el-input v-model="editFrom.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="editFrom.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="editFrom.mobile"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getUserList,
  updateState,
  addAndmin,
  getIdData,
  updateUserData,
  deleteUsers,
} from "network/home";

export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确的手机号"));
    };
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      userList: [],
      total: 0,
      isShowAddVisible: false,
      isShowEditVisible: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      editFrom: {},
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", tigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名再3~10个字符之间",
            tigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", tigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码在6~16个字符之间",
            tigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", tigger: "blur" },
          { validator: checkEmail, tigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", tigger: "blur" },
          { validator: checkMobile, tigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getUserList(this.queryInfo);
  },
  methods: {
    // 监听 switch 开关状态的改变
    userStatechanged(userinfo) {
      console.log(userinfo);
      this.updateState(userinfo);
    },

    //监听 pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserList(this.queryInfo);
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getUserList(this.queryInfo);
    },
    // 监听添加用户的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮 添加新用户
    addSubmitFrom() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        // 发送添加用户的网络请求
        this.addAndmin(this.addForm).then((res) => {
          if (res.meta.status !== 201) {
            return this.$message.error(res.meta.msg);
          }
          this.$message.success("添加用户成功");
          this.isShowAddVisible = false;
          this.getUserList(this.queryInfo);
        });
      });
    },
    // 展示编辑用户的对话框
    showEditDialog(id) {
      this.isShowEditVisible = true;
      // 发送修改的请求
      this.getIdData(id).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("请求失败");
        }
        this.editFrom = res.data;
      });
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFromRef.resetFields();
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFromRef.validate((valid) => {
        if (!valid) return;
        // 发送修改数据的请求
        this.updateUserData(this.editFrom).then((res) => {
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg);
          }
          this.$message.success("修改用户信息成功");
          this.isShowEditVisible = false;
          this.getUserList(this.queryInfo);
        });
      });
    },
    // 根据id删除对应的用户信息
    async removeUserById(id) {
      // 弹框进行二次确认
      const result = await this.$confirm(
        "此操作将删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 确认删除 返回字符串 confirm
      // 取消删除 返回字符串 cancel
      if (result !== "confirm") return;
      this.deleteUsers(id).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("删除失败");
        }
        console.log(res);
        this.$message.success("删除成功");
        this.getUserList(this.queryInfo);
      });
    },

    /**
     * 网络请求相关代码
     */

    // 发送users的网络请求
    getUserList(userInfo) {
      getUserList(userInfo.query, userInfo.pagenum, userInfo.pagesize).then(
        (res) => {
          res.meta.status == 200
            ? ((this.userList = res.data.users), (this.total = res.data.total))
            : this.$message.console.error(res.meta.msg);
          console.log(res, this.total);
        }
      );
    },
    // 用户修改状态
    updateState(updateInfo) {
      updateState(updateInfo.id, updateInfo.mg_state);
    },
    // 添加新的用户
    addAndmin(addDate) {
      return addAndmin(addDate);
    },
    // 用户根据id修改数据
    getIdData(id) {
      return getIdData(id);
    },
    updateUserData(dataArray) {
      return updateUserData(dataArray);
    },
    deleteUsers(id) {
      return deleteUsers(id);
    },
  },
};
</script>

<style scoped>
</style>