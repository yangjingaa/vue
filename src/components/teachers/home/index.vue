<template>
   <div class="main">
     <div class="left">
       <div class="ulList">
         <ul class="list">
           <router-link :to="{name:'courseList'}" tag="li">老师开课记录</router-link>
           <router-link :to="{name:'course'}" tag="li">课程列表</router-link>
           <!--<router-link :to="{name:''}" tag="li">工资单</router-link>-->
           <!--<router-link :to="{name:''}" tag="li">评价列表</router-link>-->
           <router-link :to="{name:'teacher'}" tag="li">老师管理</router-link>
           <router-link :to="{name:'personal'}" tag="li">个人信息</router-link>
           <router-link :to="{name:'applicationTeacher'}" tag="li">老师申请</router-link>
           <router-link :to="{name:'userList'}" tag="li">用户列表</router-link>
         </ul>
        </div>

     </div>
     <div class="right">
       <div class="rightHead">
         <router-link to="home" tag="span" class="name">{{user.name}}</router-link>
         <el-button type="warning" @click="signOut">退出</el-button>
       </div>
       <div class="contentBox">
        <router-view></router-view>
       </div>
     </div>
   </div>
</template>

<script>
  import {requestMethod, dataMethod} from "../../../service/index"
    export default {
        name: "home",
        data() {
            return {
              user:null
            }
        },
        created() {
          this.automaticLogon()
        },
        mounted() {
        },
        computed: {},
        methods: {
          signOut(){
            dataMethod.removeLocalData("user");
            this.$router.push("/login")
          },
          automaticLogon() {
            let user = dataMethod.getLocalData("user")[0];
            this.user=user;
            if (!user) {
              this.$router.push("/login")
            }
          }
        },
        components: {},
        watch: {}
    }
</script>

<style lang="stylus" scoped>
@import "home.styl"
</style>
