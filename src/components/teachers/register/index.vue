<template>
  <div class="main">
    <div class="head">注册</div>
    <div class="input-value">
      <el-input type="text" placeholder="请输入用户名" v-model="userName" />
    </div>
    <div class="input-value">
      <el-input type="text" placeholder="名字" v-model="name" />
    </div>

    <div class="input-value">
      <el-input type="password" placeholder="请输入密码" v-model="pwd" />
    </div>
    <div class="input-value">
      <el-input type="password" placeholder="请确认密码" v-model="repeatPwd" />
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
  import {requestMethod,dataMethod} from "../../../service/index"
    export default {
        name: "register",
        data() {
            return {
              pwd:123456,
              userName:"yang",
              repeatPwd:123456,
              name:null,
              address:"河北",
              email:"517725252@qq.com",
              age:15,
              idCard:130152133644452369,
              phoneNum:12366324568,
            }
        },
        created() {

        },
        mounted() {

        },
        computed: {},
        methods: {
          register(){
            const {pwd,userName,repeatPwd,name,address,email,age,idCard,phoneNum}=this;
            if(!pwd||!userName||!repeatPwd||!name){
              alert("数据不可为空");
              return false
            }
            if(pwd!=repeatPwd){
              this.$message.error("密码不一致")
            }
            const data={
              userName,
              pwd,
              name,
              address,
              email,
              age,
              idCard,
              phoneNum
            };
            requestMethod.register(data)
              .then(res=>{
                this.$message({
                  message:res.message,
                  type:"success"
                })
              })
              .catch(res=>{
                this.$message.error(res)
              })
          }
        },
        components: {},
        watch: {}
    }
</script>

<style lang="stylus" scoped>
@import "register.styl"
</style>
