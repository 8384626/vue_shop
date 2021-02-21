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
  deleteRoles
} from "network/power";

export default {
  data() {
    return {
      roleList: [],
      roleEdit: {},
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
      console.log(value);
      this.updateRoles(value);
    },
    removeRolesDate(value){
      console.log(value);
      this.deleteRoles(value)
    },
    /**
     * 网络请求相关的数据
     */
    getRolesList() {
      getRolesList().then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取数据失败");
        }
        console.log(res);
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
        this.$message.success("修改数据成功")
        this.getRolesList();
      });
    },
    deleteRoles(id) {
      deleteRoles(id).then(res=>{
        if (res.meta.status !== 200) {
          return this.$message.error("删除数据失败");
        }
        this.$message.success("删除数据成功")
        this.getRolesList();
      })
    }
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