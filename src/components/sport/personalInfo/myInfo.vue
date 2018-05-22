<template>
  <div class="userInfoBox">
    <div class="input-value">
      <div class="name">名字:</div> <el-input type="text" placeholder="名字" v-model="userInfo.name"/>
    </div>
    <div class="input-value">
      <div class="name">身份证号码:</div><el-input type="number" placeholder="身份证号码" v-model="userInfo.idCard"/>
    </div>
    <div class="input-value">
      <div class="name">年龄:</div><el-input type="number" placeholder="年龄" v-model="userInfo.age"/>
    </div>
    <div class="input-value">
      <div class="name">email:</div><el-input type="email" placeholder="email" v-model="userInfo.email"/>
    </div>
    <div class="input-value">
      <div class="name">地址:</div><el-input type="text" placeholder="地址" v-model="userInfo.address"/>
    </div>
    <div class="input-value">
      <div class="name">手机号码:</div><el-input type="number" placeholder="手机号码" v-model="userInfo.phoneNum"/>
    </div>
    <div class="footer">
      <el-button type="primary" @click="changeInfo" style="width :100%">修改</el-button>
    </div>
  </div>

</template>

<script>
  import {sportMethod, dataMethod} from "../../../service/index"
    export default {
        name: "my-info",
        data() {
            return {
              userInfo:{}
            }
        },
        created() {

          this.getUserInfo()
        },
        mounted() {

        },
        computed: {},
        methods: {
          changeInfo(){
            const {userInfo}=this;
            sportMethod.changeInfo(userInfo)
              .then(res=>{
                this.getUserInfo();
                this.$message.success(res.message);
              }).catch(err=>{
                this.$message.error(err)
            })
          },
          getUserInfo(){
            const {_id}=dataMethod.getLocalData("user")[0];
            sportMethod.getUserInfo({_id})
              .then(res=>{
                this.userInfo=res.data[0]
              }).catch(err=>{
              this.$message.error(err)
            })
          }
        },
        components: {},
        watch: {}
    }
</script>

<style lang="stylus" scoped>
@import "./personalInfo.styl"
</style>
