<template>
  <div>
    <!-- 封装一个全局的删除组件 -->
    <el-button type="danger" size="small" @click="del(id)">删除</el-button>
  </div>
</template>
<script>
import comAlert from '../util/alert'
export default {
  props: ["id"],
  methods: {
    //删除事件
    del(id) {
      this.$confirm("你确定要删除这个账号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
            //不同的父组件件传递不同的数据
            this.$emit('del',id)
        })
        .catch(() => {
          comAlert.infoAlert(this, "已取消删除");
        });
    }
  }
};
</script>
<style lang="">
</style>
