<template>
  <div class="mask">
    <div class="con">
      <h1 class="title">欢迎登录</h1>
      <el-select v-model="userInfo.type" placeholder="请选择">
        <el-option v-for="item in options" :key="item.type" :label="item.label" :value="item.type"></el-option>
      </el-select>
      <el-input v-model="userInfo.name" placeholder="请输入内容" clearable></el-input>
      <el-input v-model="userInfo.pass" placeholder="请输入密码" show-password clearable></el-input>
      <el-button @click="login" type="primary">登录</el-button>
    </div>
  </div>
</template>
<script>
import url from "../../util/api";
import comAlert from "../../util/alert";
export default {
  data() {
    return {
      options: [
        {
          type: "0",
          label: "超级管理员"
        },
        {
          type: "1",
          label: "普通管理员"
        },
        {
          type: "2",
          label: "用户"
        }
      ],
      userInfo: {
        type: "",
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    //登录事件
    login() {
      console.log(this.userInfo, "登录");
      url
        .login(this.userInfo)
        .then(res => {
          console.log(res, "响应");
          if (res.data.isok) {
            comAlert.successAlert(this, res.data.info);
            //成功之后把isAdmin存储到本地存储中
            localStorage.setItem('isAdmin',res.data.isAdmin)
            //成功之后把账号name存储到本地存储中
            localStorage.setItem('name',this.userInfo.name)
            //如果登录成，直接跳转页面
            this.$router.push("/index");
          } else {
            comAlert.warningAlert(this, res.data.info);
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="" scoped>
.mask {
  width: 100vw;
  height: 100vh;
  background: #ccc;
  position: fixed;
  left: 0;
  top: 0;
}
.con {
  width: 400px;
  height: 280px;
  position: absolute;
  border-radius: 10px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
}
.title {
  text-align: center;
}
.el-select,
.el-input {
  margin: 5px auto;
  width: 85%;
  display: block;
}
.el-button {
  margin-left: 45%;
}
</style>
