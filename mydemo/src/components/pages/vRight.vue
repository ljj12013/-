<template>
  <div>
    <!-- 二级路由出口 -->
    <h1 class="title">{{$route.name}}</h1>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
 
};
</script>
<style lang="" scoped>
.title {
  font-size: 24px;
  margin-left: 20px;
}
.el-table {
  width: 80%;
  color: #666;
}
</style>
