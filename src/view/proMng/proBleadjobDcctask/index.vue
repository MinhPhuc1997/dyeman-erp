<template>
  <div id="pro-blead-job-dcc-task">
    <el-tabs v-model="tabName" type="border-card" @tab-click="tabClick">
      <el-tab-pane name="task" :label="$t('proBleadjobDcctask.tab1')">
        <Task ref="refTask"></Task>
      </el-tab-pane>
      <el-tab-pane name="untask" :label="$t('proBleadjobDcctask.tab2')" lazy>
        <UnTask ref="refUnTask"></UnTask>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Task from "./task.vue"
import UnTask from "./untask.vue"

export default {
  name: "",
  components: {
    Task,
    UnTask,
  },
  data() {
    return {
      tabName: 'task'
    };
  },
  methods:{
    tabClick(val){
      if(val.name==="task"){
        return this.$refs.refTask.getData();
      }
      this.$refs.refUnTask.getData();
    }
  },
  mounted() {
  },
};
</script>
