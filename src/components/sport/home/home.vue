<template>
  <div class="main">
    <div class="left">
      <div class="head-left"><i class="el-icon-upload"> </i> 健身房管理系统</div>
      <div class="ulList">
        <ul class="list">
          <router-link :to="{name:'personalInfo'}" tag="li"><i class="el-icon-edit-outline"> </i> 个人信息</router-link>
          <router-link :to="{name:'elements'}" tag="li"><i class="el-icon-menu"> </i> 器材</router-link>
          <router-link :to="{name:'reservation'}" tag="li"><i class="el-icon-time"> </i> 我的预约</router-link>
          <router-link :to="{name:'vipCard'}" tag="li"><i class="el-icon-picture"> </i> 会员卡</router-link>
          <router-link :to="{name:'coach'}" tag="li"><i class="el-icon-edit-outline"> </i> 教练管理</router-link>
          <router-link :to="{name:'userManage'}" tag="li"><i class="el-icon-setting"> </i> 客户管理</router-link>
          <!--<router-link :to="{name:'applicationTeacher'}" tag="li">老师申请</router-link>-->
          <!--<router-link :to="{name:'userList'}" tag="li">用户列表</router-link>-->
        </ul>
      </div>

    </div>
    <div class="right">
      <div class="rightHead">
        <router-link to="home" tag="span" class="name"><i class="el-icon-service"> </i> {{user.name}}</router-link>
        <el-button type="warning" @click="signOut">退出</el-button>
      </div>
      <div class="contentBox">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import {sportMethod, dataMethod} from "../../../service/index"
  import {mapGetters,mapMutations,mapState} from "vuex"
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
    computed: {
      ...mapState(["userInfo"])
    },
    methods: {
      signOut(){
        dataMethod.clearLocalData("user");
        this.$router.push("/login")
      },
      automaticLogon() {
        let user = dataMethod.getLocalData("user")[0];
        this.user=user;
        if (!user) {
          this.$router.push("/login")
        }
      },
      ...mapGetters(["get_user_info"]),
      ...mapMutations(["set_user_info"])
    },
    components: {},
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "./home.styl"
  .contentBox
    padding 32px
    min-height 566px
</style>
