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
              <el-button type="primary">添加用户</el-button>
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
              <template slot-scope="">
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
  </div>
</template>

<script>
import { getUserList, updateState } from "network/home";

export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userList: [],
      total: 0,
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
      updateState(updateInfo.id, !updateInfo.mg_state).then((res) => {
        if (res.meta.status !== 200) {
          updateInfo.mg_state = !updateInfo.mg_state;
          return this.$message.error("更新用户状态失败");
        }
        this.$message.success("更新用户状态成功");
      });
    },
  },
};
</script>

<style scoped>
</style>