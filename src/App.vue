<!--
 * @Author: Lyl
 * @Date: 2021-02-24 08:12:20
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-09-17 09:54:04
 * @Description:
-->
<template>
  <div id="app">
    <router-view v-if="isRouterAlive"> </router-view>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { webSocket } from "@/config/index.js";
import axios from "axios";
import { getLoginOrg } from "@/api/index";
import {axiosGet} from "./view/im/Wk/cc/actionCloth/api";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      spowerClient: null,
      isRouterAlive: true
    };
  },
  created() {
    this.getPermission()
  },
  mounted() {
    // parent.userID
    webSocket.setClient(this);
    this.setSpowerClient(this.spowerClient);

    // 存储当前用户登录名
    this.setLoginUser(parent.userID);
    this.getOrgData();
    axios({
      url: "/api/ucmlUser",
      method: "get",
      params: { usrLogin: parent.userID }, // ||
    }).then((Res) => {

      // 登錄用戶oid
      // this.$store.dispatch("setUsers", Res.data.ucmlUseroid);
      this.setUsers(Res.data[0].ucmlUseroid);
      // this.$store.getters.getUser  --- this.$store.state.userOid
      this.validHasOutFactory()
      this.validHasSk();
      this.reConnectIOT();

    });
    // 獲取多語言
    let lang = "1";
    document.cookie.split(";").forEach((item, index) => {
      if (item.includes("ucml_Language")) {
        lang = item.split("=")[1];
      }
      if (index === document.cookie.split(";").length - 1) {
        this.setLangs(lang);
      }
    });
    // window.sessionStorage.setItem("tagView", "[]");
  },
  methods: {
    ...mapActions(["setUsers", "setLangs", "setSpowerClient", "setLoginUser"]),
    // 获取当前账号是否为外发厂账号
    validHasOutFactory() {
      axios({
        url: "/api/ucmlUser/valid/outFactory",
        method: "get",
      }).then((res) => {
        this.$store.commit("SET_IS_OUT_FACTORY", res.data.data)
      })
    },
    // 判断是否为生控部门
    validHasSk() {
      axios({
        url: "/api/ucmlUser/valid/include/dpt",
        method: "get",
        params: { dptCode: "sk" }
      }).then((res) => {
        this.$store.commit("SET_IS_SK", res.data.data != 0 )
      })
    },
    async getPermission() {
      let res = await axiosGet("/api/userRights", {userName: parent.userID || 'dev'});
      await this.$store.dispatch("SET_PERMI", res.data.split(","))
      axiosGet("/api/getcodeValue").then((res) => {
        this.$store.dispatch("SET_CODES", res.data)
      })
    },
    reConnectIOT() {
      const spowerClient = this.$store.state.spowerClient;
      if (!spowerClient.readyState || spowerClient.readyState == 3 || spowerClient.readyState == 0) {
        webSocket.setClient(this);
        this.setSpowerClient(this.spowerClient);
      } else return
      setTimeout(() => {
        this.reConnectIOT();
      }, 5000);
    },
    clearCookie() {
      document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    },
    reload(loadingInstance) {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
        loadingInstance.close();
      })
    },
    getOrgData() {
      let params = {
        account:  parent.userID
      }
      getLoginOrg(params).then( res => {
          this.$store.commit("SET_USER_ORG", res.data)
      })
    }
  },
};
</script>

<style lang="stylus">
.big
  .el-table__fixed-header-wrapper
    top 37px !important
.mid
  .el-table__fixed-header-wrapper
    top 35px !important
body, html, *
  font-family 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif
.lizi
  background-image url('./assets/bg.jpg')
  /* background-size: cover; */
  position absolute
  top 0
  left 0
  width 100%
  height 100%
#app
  font-family 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  width 100%
  height 100%
.el-card__body
  padding 0 !important
</style>
