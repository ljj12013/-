<template>
  <div class="myLeft">
    <router-link to="/index/manger" v-if="isAdmin==0" active-class="select">管理员管理</router-link>
    <router-link v-if="isAdmin!=2" to="/index/user" active-class="select">用户管理</router-link>
    <router-link to="/index/notice" active-class="select">通知</router-link>
    <router-link to="/index/device" active-class="select">设备管理</router-link>
  </div>
</template>
<script>
//权限问题一般工作中有两种，一种左边的功能栏不确定，是数据库获取的，那么权限，渲染相对麻烦。另一种就左边的侧边栏写死，只有这些功能点几乎不会变，这时候做权限相对简单，根据后端返回的权限做判断
//举例：超管-拥有所有权限 普管-没有管理员管理的权限 普通用户-只有查看几个功能点的权限
export default {
  data(){
    return {
      isAdmin:localStorage.getItem('isAdmin')
    }
  }
};
</script>
<style lang="" scoped>
.myLeft {
  padding-top: 30px;
}
a {
  display: block;
  height: 35px;
  line-height: 35px;
  color: green;
}
a:hover {
  background: goldenrod;
  color: #666;
}
.select {
  background: goldenrod;
  color: #666;
}
</style>
