<template>
    <div class='float-menu' ref="floatMenuBtn" tabindex="0" hidefocus="true" @blur="showMenuBtn = false">
        <transition name="slide-fade">
            <div class="float-menu__content" v-show="showMenuBtn">
                <div class="float-menu__item" v-for="item in menuList" :key="item.index" :title="item.label"
                    @click="handleOpenDlg(item.ref)">
                    <i :class="item.icon"></i>
                    <br>
                    <span>{{ item.label }}</span>
                </div>
            </div>
        </transition>
        <div class="float-menu__btn" @click="handleClickBtn">
            <i :class="showMenuBtn ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
        </div>
        <toolkit ref="toolkit" :menuType="toolkitType" />
    </div>
</template>

<script>
import toolkit from './toolkit.vue';
import { Loading } from 'element-ui';
export default {
    inject: ['reload'],
    components: {
        toolkit
    },
    data() {
        return {
            menuList: [
                 
                {
                    index: 1,
                    label: "工具包",
                    icon: "el-icon-s-cooperation",
                    ref: "toolkit"
                },
                {
                    index: 2,
                    label: "操作手册",
                    icon: "el-icon-edit",
                    ref: "operate"
                },
                {
                    index: 0,
                    label: "刷新",
                    icon: "el-icon-refresh",
                    ref: "clearData"
                },
               
                // {
                //     index: 2,
                //     label: "问题反馈",
                //     icon: "el-icon-service",
                //     click: () => {
                //         alert("问题反馈")
                //     }
                // }
            ],
            showMenuBtn: false,
            toolkitType: 1
        }
    },
    methods: {
        handleClickBtn() {
            this.showMenuBtn = !this.showMenuBtn;
            if (this.showMenuBtn) {
                this.$refs.floatMenuBtn.focus();
            }
        },
        handleOpenDlg(ref) {
            if (ref == 'clearData') {
                // 清理浏览器缓存
                let loadingInstance = Loading.service({ // 声明一个loading对象
                    lock: true, // 是否锁屏
                    text: '加载中', // 加载动画的文字
                    spinner: 'el-icon-loading', // 引入的loading图标
                    fullscreen: true,
                })
                this.reload(loadingInstance)
            }else if(ref == 'toolkit' || ref == 'operate'){
                this.toolkitType = ref == 'toolkit' ? 1 : 2
                // 弹出对应窗口
                this.$refs['toolkit'].dialogVisible = true;
            }
        }
    },
    created() {
    },
    mounted() {
    },
}
</script>

<style lang="stylus">
.slide-fade-enter-active {
    transition: all .3s ease;
}
.slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to { /* .slide-fade-leave-active for below version 2.1.8 */ 
    transform: translateX(10px);
    opacity: 0;
}
.float-menu {
    position: fixed;
    right: 0;
    bottom: 50%;
    display: flex;
    border-radius: 3px 0 0 3px;
    background-color: rgb(24, 144, 255);
    color: #fff;
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    
}

.float-menu__btn {
    width: 1.2rem;
    height: 3.5rem;
    text-align: left;
    line-height: 3.5rem;
    font-size: 22px;
}

.float-menu__content {
    display: flex;
    flex-wrap: nowrap;
    line-height: 1;
    margin: 0.5rem;
    .float-menu__item {
        width: 4rem;
    }
    i {
        font-size: 22px;
    }
    span {
        font-size: 10px
    }
}
</style>