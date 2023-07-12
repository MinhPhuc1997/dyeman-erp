<template>
  <div id="sidebar">
    <el-menu :default-active="this.$route.path" class="eldemo" unique-opened collapse-transition router
      :collapse="isActive" v-loading.fullscreen.lock="loading" :element-loading-text="$t('public.loading')">
      <menus :menuData="list" :level="0"></menus>
    </el-menu>
    <div @click="IsActive" class="menu-icon">
      <el-divider>
        <i class="el-icon-d-arrow-right" v-if="isActive"></i><i class="el-icon-d-arrow-left" v-else></i>
      </el-divider>
    </div>
  </div>
</template>
<script>
import { menuData } from "./index.js";
import { getAuthority } from "@/api/index";
import menus from "./menu.vue";
import {axiosGet} from "../../../view/im/Wk/cc/actionCloth/api";
export default {
  components: {
    menus: menus,
  },
  name: "sidebar",
  data() {
    return {
      menuData: menuData(this).menu,
      list: [],
      isActive: false,
      loading: true,
    };
  },
  methods: {
    init() {
      axiosGet("/api/userRights", {userName: parent.userID || "dev"}).then((res) => {
        let checkPermisson = function (item,list) {
          const all_permission = "*:*:*";
          const permissions = list
          let result = false
          permissions.some(permission => {
            let screen = permission.split(":")[1]
            if (permission === all_permission || item==screen){
              result = true;
            }
          })
          return result;
        }
        let func = function (list) {
          list.forEach((item) => {
            if (checkPermisson(item.index, res.data.split(","))) {
              item.hide = false;
            } else {
              item.hide = true;
            }

            item.index = "/" + item.index;
            if (item.children) {
              func(item.children);
            }
          });
        };
        func(this.menuData);
        this.list = this.menuData;
        this.$nextTick(() => {
          var path = "";
          const menuindex = this.menuData.findIndex(e => e.hide == false);
          if (menuindex != -1) {
            if (this.menuData[menuindex].children != null) {
              const indexChildren = this.menuData[menuindex].children.findIndex(e => e.hide == false);
              if (indexChildren != -1) {
                path = this.menuData[menuindex].children[indexChildren].index;
              } else {
                path = this.menuData[menuindex].index;
              }
            } else {
              path = this.menuData[menuindex].index;
            }
          } else {
            path = "/404"
          }
          setTimeout(() => {
            this.$router.push({path: path});
            this.loading = false;
          }, 200);
        });
      });
    },
    IsActive() {
      this.isActive = !this.isActive;
      this.$store.dispatch("isActive", this.isActive);
    },
  },
  created() {
    this.init();
  },
  computed: {},
};
</script>

<style lang="stylus">
.el-divider--horizontal
  margin: 2px 0 !important
.el-menu--vertical
  .oneMenu, .el-menu-item, .el-submenu__title
    height 39px !important
    line-height 39px !important
  .el-menu > span
    line-height 39px
    margin-left 10px
#sidebar
  position relative
  height calc(100vh - 47px)
  .el-menu--collapse
    width 50px // 宽度自己掌握
    // transition: 1s;
  .el-menu-item.is-active:after
    content ''
    position absolute
    width 3px
    height 100%
    background #1976d2 !important
    top -0.5px
    right 0
  .el-menu-vertical-demo:not(.el-menu--collapse), .eldemo:not(.el-menu--collapse)
    width 190px
  // /* 隐藏 > */
  // .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
  // display: none;
  // }
  .menu-icon
    position absolute
    left 0
    bottom 20px
    width 100%
    .el-divider__text, .el-link
      font-size 20px !important
      padding 0 10px
      color #ccc
    .el-icon-d-arrow-right, .el-icon-d-arrow-left
      padding 2px
      border-radius 15px
      border 1px solid #ccc
  .oneMenu
    height 39px !important
    line-height 39px
    .el-menu-item
      padding-left 0 !important
      // text-indent: 0em !important;
      height 39px
      line-height 39px
      span
        margin-left -3px
    .el-menu-item [class^=el-icon-]
      font-size 24px !important
  .el-menu-item .el-tooltip
    padding 0 5px !important
  .eldemo:not(.el-menu--collapse)
    height calc(100% - 40px)
    overflow-y auto
    background-color rgba(0, 0, 0, 0)
  .el-card__body
    padding 0 !important
  .el-menu
    border-right none
  .el-card
    border-radius 0 !important
  .sidebar
    margin-left 5px
  .el-submenu [class^=el-icon-]
    font-size 24px
  .el-submenu__title, .el-icon-arrow-down
    font-size 15px
    // font-weight: 600;
    -webkit-user-select none
    -moz-user-select none
    -ms-user-select none
    user-select none
    /* margin-right: 15px; */
    text-align left
    padding-left 0 !important
  .el-menu-item
    -webkit-user-select none
    -moz-user-select none
    -ms-user-select none
    user-select none
    font-size 15px
    padding-left 30px !important
  .el-menu-item.is-active
    background-color rgba(236, 236, 236, 1)
    color #555
  /* .sidebar .el-card__body {
    border-bottom: 1px solid rgba(64, 160, 255, 0.5);
  } */
  .sidebar .el-submenu .el-menu-item
    text-align left
    // text-indent: 0.5em;
  .sidebar .card
    margin-left 5px
  .sidebar .el-menu-item.is-active
    background rgba(64, 160, 255, 0.1)
  .emps-title
    height 40px
    background-color white
    margin 0 5px
    max-width 205px
    min-width 50px
    border-bottom none
    line-height 40px
  .card .title
    margin-right 50px
  .card .el-submenu__icon-arrow
    right 10px
  .card .el-submenu .el-menu-item
    min-width 100%
  .el-submenu [class^='el-icon-']
    line-height 39px
    float left
    // margin-left: 15%;
  .el-menu-item
    text-align left
    // text-indent: 0.5em;
    margin-top 1px
</style>
