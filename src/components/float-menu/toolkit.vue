<template>
    <div class='floatMenu-toolkit'>
        <el-dialog :visible.sync="dialogVisible" width="40%" append-to-body :close-on-click-modal="false">
            <view-container :title="menuType == 1 ? '工具包' : '操作手册'">
                <div class="toolkit-content">
                    <div class="toolkit-item" v-for="item in menuType == 1 ? list : operate" :key="item.index">
                        <el-card shadow="hover">
                            <div slot="header">
                                <span>{{ item.name }}</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click="handleDown(item)">下载</el-button>
                            </div>
                        </el-card>
                    </div>
                </div>
            </view-container>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        menuType: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            dialogVisible: false,
            list: [
                // {
                //     index: 0,
                //     name: '生产排期',
                //     filename: 'iot_setup.exe'
                // },
                {
                    index: 1,
                    name: 'IOT.SP',
                    filename: 'setup.exe'
                },
            ],
            operate: [
                {
                    index: 0,
                    name: '打印程序安装教程',
                    filename: '打印程序安装教程.pdf'
                },
                {
                    index: 1,
                    name: '物料信息卡打印教程',
                    filename: '物料信息卡打印教程.pdf'
                },
            ]
        }
    },
    methods: {
        handleDown( row ) {
            window.open(`../../vuePackage/${this.menuType == 1 ? 'application' : 'operation'}/${row.filename}`);
        }
    },
    created() {
    },
    mounted() {
    },
}
</script>

<style>
.toolkit-content {
    padding: 5px;
    max-height: 500px;
    overflow: auto;
}
.toolkit-item span{
    color: #66b1ff;
    font-size: 16px;
    
}
</style>