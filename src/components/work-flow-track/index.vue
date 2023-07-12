<template>
    <div id='work-flow-track' v-loading="loading" :element-loading-text="$t('public.loading')">
        <el-dialog  :visible.sync="dialogVisible" top="5vh"  width="60%" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
            <view-container :title="title + '流程跟踪'"  style="position: relative;">
                <div id="trackImg" v-if="dialogVisible" >
                    <img  :src="url" />
                </div>
            </view-container>
        </el-dialog>
    </div>
</template>

<script>
import { fetchFlowDetail } from "./api"
export default {
    props: {
        title: '',
        
    },
    data() {
      return {
        dialogVisible: false,
        url: '',
        loading: false
      }
    },
    watch: {
    },
    methods: {
        async initData(id) {
            this.loading = true;
            this.url = `${process.env.API_HOST}/api/workflow/proc/image?busKey=${id}`;
            this.dialogVisible = true;
            await this.$nextTick();
            this.getFlowDetail({busKey: id});
            
        },
        getFlowDetail(params) {
            fetchFlowDetail(params).then(res => {
                let data = res.data.data;
                data.forEach(item => {
                    let { graphicInfo, hisTaskInsTan, commentList } = item;
                    let div = document.createElement("div");
                    let dom = document.getElementById("trackImg")
                    div.innerHTML =  `<div class="flow-tip-content">
                        <h3>${hisTaskInsTan.name}</h3>
                        <p>执行人: ${commentList[0].userId}</p>
                        <p>执行时间: ${commentList[0].time}</p>
                        <p>执行意见: ${commentList[0].message}</p>
                    </div>`
                    div.style.height = graphicInfo.height + 'px';
                    div.style.width = graphicInfo.width + 'px';
                    div.style.left = graphicInfo.x + 'px';
                    div.style.top = graphicInfo.y  + 'px'; // 27为tab高度
                    div.className = 'flow-tip'
                    dom.appendChild(div)
                });
            }).finally(_ => {
                this.loading = false;
            })
        }
    },
    created() {
    },
    mounted() {
    },
}
</script>

<style lang="stylus">
#trackImg {
    height: calc(100vh - 120px);
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
.flow-tip {
    position: absolute;
    .flow-tip-content {
        display: none;
        margin-left: 90px;
        width: 250px;
        overflow: auto;
        background-color: greenyellow;
        border-radius: 10px;
        padding: 2px 10px;
        color: #000;
        font-size: 16px;
    }
}
.flow-tip:hover{
    .flow-tip-content {
        
        display: block
        
    }
}
</style>