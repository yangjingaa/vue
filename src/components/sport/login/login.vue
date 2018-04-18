<template>
  <div class="main">
    <div class="head">登录</div>
    <div class="input-value">
      <input type="text" placeholder="请输入用户名" v-model="userName">
    </div>
    <div class="input-value">
      <input type="password" placeholder="请输入密码" v-model="pwd">
    </div>
    <div class="footer">
      <el-button type="primary" @click="homeLogin" style="width :100%">登录</el-button>
    </div>
    <div class="footer-span">
      <router-link tag="span" to="/register" class="register">注册</router-link>
      <!--<span class="forget-pwd">忘记密码</span>-->
    </div>
  </div>
</template>

<script>
  import {sportMethod, dataMethod} from "../../../service/index"

  export default {
    name: "login",
    data() {
      return {
        userName: "admin",
        pwd: 123456
      }
    },
    created() {
      this.automaticLogon();
    },
    mounted() {

    },
    computed: {},
    methods: {
      homeLogin() {
        if (!this.userName || !this.pwd) {
          alert("请检车输入");
          return false
        }
        const data = {
          userName: this.userName,
          pwd: this.pwd
        };
        sportMethod.login(data)
          .then((res) => {
            console.log(res)
            // dataMethod.setLocalData("user", res.data);
            // this.$router.push("/home")
          })
          .catch((error) => {
            this.$message.error(error)
          })
      },
      automaticLogon() {
        let user = dataMethod.getLocalData("user");
        if (user) {
          this.$router.push("/home")
        }
      },
    },
    components: {},
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "./login.styl";
</style>
