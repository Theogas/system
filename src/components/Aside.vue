<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden"
           background-color="rgb(48, 65, 86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; right: 5px">
      <b style="color: white" v-show="logoTextShow">后台管理系统</b>
    </div>
    <el-menu-item index="/home">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">主页</span>
      </template>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item index="/user">
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>

    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">日志相关管理</span>
      </template>
      <el-menu-item index="/log">
        <i class="el-icon-s-custom"></i>
        <span slot="title">日志管理</span>
      </el-menu-item>
      <el-menu-item index="/analysis">
        <i class="el-icon-s-custom"></i>
        <span slot="title">日志分析记录</span>
      </el-menu-item>
      <el-menu-item index="/error">
        <i class="el-icon-s-custom"></i>
        <span slot="title">日志错误记录</span>
      </el-menu-item>
    </el-submenu>

      <el-submenu>
          <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">规则相关管理</span>
          </template>
          <el-menu-item index="/rule">
              <i class="el-icon-s-custom"></i>
              <span slot="title">规则管理</span>
          </el-menu-item>
      </el-submenu>
      <el-submenu>
          <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">服务器相关管理</span>
          </template>
          <el-menu-item index="/server">
              <i class="el-icon-s-custom"></i>
              <span slot="title">服务器管理</span>
          </el-menu-item>
      </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  }
}
</script>

<style scoped>

</style>
