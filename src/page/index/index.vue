<!--
 * @Author: Lyl
 * @Date: 2021-03-10 14:20:44
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-10 09:04:55
 * @Description: 
-->
<template>
  <div id="top">
    <el-container>
      <div class="page">
        <!-- <el-header>
          <top />
        </el-header> -->
        <!-- <div style="height: 50px; background: #000"></div> -->
        <el-main class="mainBox">
          <div class="sidebar">
            <!-- 左侧导航栏 -->
            <sidebar-menu />
          </div>
          <div
            :style="{ marginLeft: isActive ? '50px' : '190px' }"
            style="margin-top: -1px; overflow: hidden"
          >
            <tags></tags>
            <keep-alive v-if="$route.meta.keepAlive">
              <router-view ></router-view>
            </keep-alive>
            <router-view v-else > </router-view>
          </div>
        </el-main>
        <el-header></el-header>
      </div>
    </el-container>
    <float-menu></float-menu>
  </div>
</template>

<script>
import top from "./top/index";
import sidebarMenu from "./sidebar/index.vue";
import tags from "./tags/index";
import floatMenu from "@/components/float-menu/index"
export default {
  name: "index",
  components: {
    top,
    sidebarMenu,
    tags,
    "float-menu": floatMenu
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    isActive() {
      return this.$store.state.isActive;
    },
  },
};
</script>

<style lang="stylus">
#top {
  html {
    overflow: hidden;
  }

  .sidebar {
    position: absolute;
    bottom: 0;
    top: 0;
    background: #fff;
    z-index: 1000;
  }

  .page {
    // background: url('../../assets/bg.jpg');
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
  }

  .avue-group__item {
    margin: 0 5px;
    padding-bottom: 20px;
  }

  .avue-form__menu--center {
    margin-top: 10px;
  }

  .mainBox {
    min-height: 500px;
    // max-height: 800px;
  }

  .page .el-header {
    padding: 5px;
  }

  .page .el-main {
    padding: 0;
  }
}
</style>