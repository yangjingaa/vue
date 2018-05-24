<template>
  <div class="main">
    <div class="head">注册</div>
    <div class="input-value">
      <div class="name">*用户名:</div><el-input class="ad" type="text" placeholder="请输入用户名" v-model="userName"/>
    </div>
    <div class="input-value">
      <div class="name">*请输入密码:</div><el-input class="ad"  type="password" placeholder="请输入密码" v-model="pwd"/>
    </div>
    <div class="input-value">
      <div class="name">*请确认密码:</div><el-input class="ad"   type="password" placeholder="请确认密码" v-model="repeatPwd"/>
    </div>
    <div class="input-value">
      <div class="name">*名字:</div> <el-input class="ad"  type="text" placeholder="名字" v-model="name"/>
    </div>
    <div class="input-value">
      <div class="name">身份证号码:</div><el-input class="ad"  type="number" placeholder="身份证号码" v-model="idCard"/>
    </div>
    <div class="input-value">
      <div class="name">年龄:</div><el-input class="ad"  type="number" placeholder="年龄" v-model="age"/>
    </div>
    <div class="input-value">
      <div class="name">email:</div><el-input class="ad"  type="email" placeholder="email" v-model="email"/>
    </div>
    <div class="input-value">
      <div class="name">地址:</div><el-input class="ad"  type="text" placeholder="地址" v-model="address"/>
    </div>
    <div class="input-value">
      <div class="name">手机号码:</div><el-input class="ad"  type="number" placeholder="手机号码" v-model="phoneNum"/>
    </div>

    <div class="footer">
      <el-button type="primary" @click="register" style="width :100%">注册</el-button>
    </div>
    <div class="footer-span">
      <router-link class="register" to="/login" tag="span">登录</router-link>
      <!--<span class="forget-pwd">忘记密码</span>-->
    </div>
  </div>
</template>

<script>
  import {sportMethod, dataMethod} from "../../../service/index"

  export default {
    name: "register",
    data() {
      return {
        userName: "yang",
        pwd: 123456,
        repeatPwd: 123456,
        name: "杨",
        address: "河北",
        email: "517725252@qq.com",
        age: 15,
        idCard: 130152133644452369,
        phoneNum: 12366324568,
      }
    },
    created() {

    },
    mounted() {

    },
    computed: {},
    methods: {
      register() {
        const {pwd, userName, repeatPwd, name,address,email,age,idCard,phoneNum} = this;
        if (!pwd || !userName || !repeatPwd || !name) {
          this.$message.warning("数据不可为空");
          return false
        }
        if (pwd != repeatPwd) {
          this.$message.error("密码不一致")
          return false
        }
        const data = {
          userName,
          pwd,
          name,
          address,
          email,
          age,
          idCard,
          phoneNum,
        };
        sportMethod.register(data)
          .then(res => {
            this.$message({
              message: res.message,
              type: "success"
            })
          })
          .catch(mess => {
            this.$message.error(mess)
          })
      }
    },
    components: {},
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "./register.styl"
</style>
