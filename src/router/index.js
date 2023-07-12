/*
 * @Author: Phan Minh Phuc
 * @Date: 2023-01-01 23:59:59
*/
import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import proMng from "./view/proMng";

NProgress.configure({
  showSpinner: false
})

Vue.use(Router);
const originalPush = Router.prototype.push;

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new Router({
  mode: "hash",
  routes: [
   
    {
      path: "/",
      name: "index",
      component: resolve => require(["@/page/index/index"], resolve),
      children: [
        ...proMng

      ]
    },
    {
      path: "/404",
      name: "404",
      component: resolve => require(["@/page/index/404"], resolve)
    },
    {
      path: "/*",
      redirect: "/404"
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start()
  handleTagViewAndKeeplive(to);
  next();
  NProgress.done()
});

router.afterEach(() => {
  NProgress.done()
})
export default router;

/**
 * 处理面包屑
 * @params to 路由变化
 */
export function handleTagViewAndKeeplive(to) {
  if (to != null && to.meta.keepAlive) {
    let tagViewOnSS = [];
    if (store.getters.getTagView.length === 0 && tagViewOnSS.length !== 0) {
      store.commit("SET_TAG_VIEW", tagViewOnSS);
    } else {
      const t = {
        fullPath: to.fullPath,
        name: to.name,
        title: to.meta.name,
        icon: to.meta.icon,
        keepAlive: to.meta.keepAlive || false
      };
      if (t.name) {
        store.commit("ADD_TAG_VIEW", t);
      }
    }
  }
}
