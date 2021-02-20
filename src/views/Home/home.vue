<template>
  <div class="home">
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div class="home-header-wrap">
          <img src="~assets/img/home/home.png" alt="" class="home-header-img" />
          <span>LastCode后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '65px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">
            <i class="el-icon-s-operation"></i>
          </div>
          <!-- 侧边栏菜单 -->
          <el-menu
            background-color="#323744"
            text-color="#fff"
            active-text-color="#379aff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath"
          >
            <!-- 一级菜单 -->
            <el-submenu
              :index="item.id + ''"
              v-for="item in menuList.list"
              :key="item.id"
            >
              <template slot="title">
                <i :class="menuList.icons[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                :index="'/' + subitem.path"
                v-for="subitem in item.children"
                :key="subitem.id"
                @click="getMenuPath(subitem.path)"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ subitem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 内容栏 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getHomeMenuList } from "network/home";

export default {
  data() {
    return {
      menuList: {
        list: [],
        icons: {
          125: "iconfont icon-users",
          103: "iconfont icon-tijikongjian",
          101: "iconfont icon-shangpin",
          102: "iconfont icon-danju",
          145: "iconfont icon-baobiao",
        },
      },
      isCollapse: false,
      activePath:''
    };
  },
  created() {
    this.getHomeMenuList();
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 点击退出
    logout() {
      window.sessionStorage.clear();
      this.$router.replace("/login");
    },
    // 点击按钮切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },

    // 路由操作
    getMenuPath(path){
      window.sessionStorage.setItem('activePath','/'+path)
    },
    // 数据请求
    getHomeMenuList() {
      getHomeMenuList().then((res) => {
        res.meta.status == 200
          ? (this.menuList.list = res.data)
          : this.$message.console.error(res.meta.msg);
        console.log(this.menuList);
      });
    },
  },
};
</script>

<style scoped>
.home {
  height: 100%;
}

.home-container {
  height: 100%;
}

.toggle-button {
  background-color: #485165;
  font-size: 18px;
  line-height: 24px;
  color: #fff;
  text-align: center;
}
.toggle-button:hover {
  background-color: #3b455c;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #373c41;
  padding-left: 5px;
  color: #e2e2e2;
  font-size: 20px;
}

.home-header-wrap {
  display: flex;
  align-items: center;
}

.home-header-img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-right: 5px;
}

.el-aside {
  background-color: #323744;
}
.el-menu {
  border-right: none;
}
.el-main {
  background-color: #eaedf2;
}
.iconfont {
  margin-right: 10px;
  font-size: 16px;
}
</style>