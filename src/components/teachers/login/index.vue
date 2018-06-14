<template>
  <div class="main">
    <div class="head">{{$t("message.title")}}</div>
    <!-- <div class="head">外教老师管理系统</div> -->

    <!--<div class="head">登录</div>-->
    <div class="input-value">
      <el-input type="text" placeholder="请输入用户名" v-model="userName"/>
    </div>
    <div class="input-value">
      <el-input type="password" placeholder="请输入密码" v-model="pwd"/>
    </div>
    <div class="footer">
      <el-button type="primary" @click="homeLogin" style="width :100%">{{$t("message.login")}}</el-button>

    </div>
    <div class="footer-span">
      <router-link tag="span" to="/register" class="register">{{$t("message.register")}}</router-link>
    </div>
  </div>
</template>

<script>
  import {requestMethod, dataMethod} from "../../../service/index";
  export default {
    name: "login",
    data() {
      return {
        userName: "admin",
        pwd: "123456"
      };
    },
    created() {
      this.automaticLogon();

      this.getValue();
    },
    mounted() {
    },
    computed: {},
    methods: {
      homeLogin() {
        if (!this.userName || !this.pwd) {
          this.$message.warning("请检查输入");
          return false;
        }
        const data = {
          userName: this.userName,
          pwd: this.pwd
        };
        requestMethod
          .login(data)
          .then(res => {
            dataMethod.setLocalData("user", res.data);
            this.getTeacherInfo(res.data[0]._id);
          })
          .catch(error => {
            this.$message.error(error);
          });
      },
      automaticLogon() {
        let user = dataMethod.getLocalData("user");
        if (user) {
          this.$router.push("/home");
        }
      },
      //获得老师信息
      getTeacherInfo(id) {
        const data = {
          _id: id
        };
        requestMethod
          .getTeacherInfo(data)
          .then(res => {
            let teacher = [];
            if (res.data.length > 0) {
              const data = res.data;
              teacher = data[0];
            }
            dataMethod.setLocalData("teacher", teacher);
            this.$router.push("/home");
          })
          .catch(err => {
            this.$message.error(err);
          });
      },
      langeChange() {
        this.$i18n.locale = "cn";
        window.localStorage.setItem("language", "en");
      },
      async getMenu() {
        let menuData = [];
        menuData = await this.geta();
        return menuData
      },
      geta() {
        return requestMethod.getUserList().then(res => {
          return res.data
        });
      },
      getValue() {
        const value = this.getMenu();
        value.then(res=>{
          console.log(res);
        })
      }
    },
    components: {},
    watch: {}
  };
</script>

<style lang="stylus" scoped>
  @import 'login.styl';
</style>
