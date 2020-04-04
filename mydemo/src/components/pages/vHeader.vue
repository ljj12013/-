<template>
  <div>
    <h1>我是头部导航</h1>
    <button @click="logout">退出</button>
  </div>
</template>
<script>
export default {
  methods: {
    logout(){
      //清除你的本地存储 isAdmin name
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('name')
      this.$router.replace('/login')
    }
  },
};
</script>
<style lang="" scoped>

</style>
