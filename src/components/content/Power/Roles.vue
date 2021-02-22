<template>
  <div>
    <bread-crumb-nav></bread-crumb-nav>
    <roles-card-view
      :roleList="roleList"
      @roleFromDate="roleFromDate"
      @roleUpdateDate="roleUpdateDate"
      :roleEdit="roleEdit"
      @submitUpdate="submitUpdate"
      @removeRolesDate="removeRolesDate"
      @removeRolesById="removeRolesById"
      :roleChildrenList="roleChildrenList"
      @getRolseList="getRolseList"
      :getRoleslist="getRoleslist"
      @setRolseList="setRolseList"
    ></roles-card-view>
  </div>
</template>

<script>
import BreadCrumbNav from "./RolesChildren/BreadCrumbNav.vue";
import RolesCardView from "./RolesChildren/RolesCardView.vue";

// 数据请求
import {
  getRolesList,
  addRoles,
  getRolesById,
  updateRoles,
  deleteRoles,
  removeRoles,
  getRolseList,
  setRolseList,
} from "network/power";

export default {
  data() {
    return {
      roleList: [],
      roleEdit: {},
      roleChildrenList: [],
      getRoleslist: [],
    };
  },
  methods: {
    roleFromDate(value) {
      this.addRoles(value);
    },
    roleUpdateDate(id) {
      console.log(id);
      this.getRolesById(id);
    },
    submitUpdate(value) {
      this.updateRoles(value);
    },
    removeRolesDate(value) {
      this.deleteRoles(value);
    },
    // 根据 ID 删除对应的权限
    removeRolesById(value) {
      this.removeRoles(value);
    },
    // 获取权限列表
    getRolseList() {
      this.getRolseList();
    },
    // 配置角色权限
    setRolseList(value) {
      this.setRolseList(value);
    },
    /**
     * 网络请求相关的数据
     */
    getRolesList() {
      getRolesList().then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取数据失败");
        }
        this.roleList = res.data;
      });
    },
    addRoles(data) {
      addRoles(data).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取数据失败");
        }
        console.log(res);
        this.getRolesList();
      });
    },
    getRolesById(id) {
      getRolesById(id).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取数据失败");
        }
        this.roleEdit = res.data;
      });
    },
    updateRoles(data) {
      updateRoles(data).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取修改数据失败");
        }
        this.$message.success("修改数据成功");
        this.getRolesList();
      });
    },
    deleteRoles(id) {
      deleteRoles(id).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("删除数据失败");
        }
        this.$message.success("删除数据成功");
        this.getRolesList();
      });
    },
    removeRoles(data) {
      removeRoles(data).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("删除对应权限失败");
        }
        this.roleChildrenList = res.data;
        this.$message.success("删除权限成功");
      });
    },
    // 权限列表的访问请求
    getRolseList() {
      getRolseList().then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取权限失败");
        }
        this.getRoleslist = res.data;
      });
    },
    // 为角色分配权限
    setRolseList(data) {
      setRolseList(data).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("更新权限失败");
        }
        this.$message.success("更新权限成功");
        this.getRolesList();
      });
    },
  },

  components: { BreadCrumbNav, RolesCardView },

  // 所有hook
  created() {
    this.getRolesList();
  },
};
</script>

<style scoped>
</style>