<!--
 * @Author: Lyl
 * @Date: 2021-04-17 16:09:33
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-24 11:24:16
 * @Description:
-->
<template>
  <div id="viewTags">
    <div class="tag-content" v-for="(t, i) in tagView" :key="i" :class="$route.path === t.fullPath ? 'is-open' : ''"
      @click="to(t)">
      <div class="tag-label" :title="t.name">
        <span>{{ t.name }}</span>
        <i class="el-icon-circle-close" @click.stop="closeTag(i)" v-if="t.fullPath != '/' && i != 0"></i>
      </div>
    </div>
    <div style="position: absolute;right:200px;top: 7px; cursor: pointer;" @click="goToGuide()">
      <div style="margin-top: -3px;margin-left: -100px">
        <img src="http://192.168.5.1:91/api/generalPicture/previewImg?id=64367f40db56043ef06ca97f" style="height: 30px;width: 30px">
      </div>
      <div style="margin-top: -30px">
        <a style="color:#2f8cec;font-size: 17px">{{$t("guide")}}</a>
      </div>
    </div>
    <div style="position: absolute;right: 10px;top: 10px">
      前端版本： {{version}}_{{buildTime}}
    </div>
  </div>
</template>
<script>
const databases = require('../../../../package.json');
export default {
  name: "viewTags",
  components: {},
  data() {
    return {
      version:databases.version,
      buildTime:databases.buildTime,
      tagView: this.$store.getters.getTagView,
    };
  },
  computed: {
    getTagView() {
      return this.$store.getters.getTagView;
    },
  },
  watch: {
    getTagView(n, o) {
      this.tagView = n;
      // this.$store.commit('SET_KEEPALIVE_LIST', this.tagView)
      // window.sessionStorage.setItem("tagView", JSON.stringify(this.tagView));
    },
  },
  methods: {
    goToGuide(){
      window.open("http://192.168.5.9:8071/");
    },
    to(val) {
      if (val.fullPath == this.$route.path) {
        return;
      }
      this.$router.push({ path: val.fullPath });
    },
    closeTag(i) {
      this.removeATagView(this.$store.state, i);
    },
    // 只移除一个 tagView
    removeATagView(state, payload) {
      // 记录被移除的路由
      if (payload == 0) {
        return;
      }
      const removedTagView = state.tagView[payload].fullPath;
      state.tagView.splice(payload, 1);
      // 如果移除后， tagView 为空
      // 如果移除的是最后一个 tagView 则路由跳转移除后的最后一个 tagView
      if (
        payload === state.tagView.length &&
        this.$route.path === removedTagView
      ) {
        this.$router.push(state.tagView[payload - 1].fullPath);
        return;
      }
      // 如果移除的是第一个 tagView 则路由跳转移除后的第一个 tagView
      if (payload === 0 && this.$route.path === removedTagView) {
        this.router.push(state.tagView[0].fullPath);
        return;
      }
      if (this.$route.path === removedTagView) {
        this.router.push(state.tagView[payload - 1].fullPath);
      }
    },
  },
  created() { },
  mounted() { },
  beforeDestroy() { },
};
</script>
<style lang='stylus'>
#viewTags {
  width: 100%;
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-wrap: nowrap;
  overflow: auto;
  color: #757575;
  font-size: 14px;
  border-left: 1px solid #E4E7ED;
  border-right: 1px solid #E4E7ED;

  .is-open {
    color: #1976d2;
    background-color: #f1f6fc !important;
  }

  i {
    font-size: 20px;
    display: none
  }

  .tag-content {
    background: #fff;
    padding: 5px 8px;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    margin: 3px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    line-height: 1.3;
    border: 1px solid #eee;
    .tag-label {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
    }

    i {
      margin-left: 5px;
      font-size: 14px;
      font-weight: bold;
      color: #757575;
    }

    i:hover {
      color: #e6a23c;
    }
  }

  .tag-content:hover {
    background-color: #eee;
    i {
      display: block;
    }
  }
}
</style>
