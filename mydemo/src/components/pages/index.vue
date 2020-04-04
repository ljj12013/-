<template>
  <div class='index'>
    <!-- <h1>我是首页</h1> -->
    <v-header class="header"></v-header>
    <div class="main">
      <v-left class="left"></v-left>
      <v-right class="right"></v-right>
    </div>
  </div>
</template>
<script>
// 引入子组件内容
import vHeader from './vHeader'
import vLeft from './vLeft'
import vRight from './vRight'
export default {
  components:{
    vHeader,
    vLeft,
    vRight
  }
};
</script>
<style lang="" scoped>
.index{
  width:100vw;
  height:100vh;
  display: flex;
  flex-direction: column;
}
.header{
  height:80px;
  background: #ddd;
}
.main{
  flex: 1;
  display: flex;
}
.left{
  width:180px;
  background: pink;
}
.right{
  flex: 1;
}
</style>
