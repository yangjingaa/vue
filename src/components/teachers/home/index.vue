<template>
  <div class="main">
    <div class="left">
      <div class="ulList">
        <ul class="list">
          <!--<router-link :to="{name:'courseList'}" tag="li">老师开课记录</router-link>-->
          <router-link v-if="power" :to="{name:'course'}" tag="li">课程列表</router-link>
          <!--<router-link :to="{name:''}" tag="li">工资单</router-link>-->
          <router-link v-if="isTeacher" :to="{name:'openCourse'}" tag="li">{{$t("message.left.StartClass")}}</router-link>
          <router-link v-if="power" :to="{name:'teacher'}" tag="li">老师管理</router-link>
          <router-link v-if="!power" :to="{name:'personal'}" tag="li">{{$t("message.left.personalInfo")}}</router-link>
          <router-link v-if="power" :to="{name:'applicationTeacher'}" tag="li">老师申请</router-link>
          <router-link v-if="power" :to="{name:'userList'}" tag="li">用户列表</router-link>
        </ul>
      </div>

    </div>
    <div class="right">
      <div class="rightHead">
        <span class="name">{{user.name}}</span>
        <el-button v-if="!power" type="primary" @click="langeChange('cn')">中文</el-button>
        <el-button v-if="!power" type="primary" @click="langeChange('en')">Englist</el-button>
        <el-button type="warning" @click="signOut">退出</el-button>
      </div>
      <div class="contentBox">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { requestMethod, dataMethod } from "../../../service/index";
import { mapGetters,mapMutations } from "vuex";
export default {
    name: "home",
    data() {
        return {
            user: null
        };
    },
    created() {
        this.automaticLogon();
    },
    mounted() {},
    computed: {
      isTeacher(){
        return this.userIsTeacher()
      }
    },
    methods: {
        signOut() {
            dataMethod.clearLocalData();
            this.$router.push("/login");
        },
        automaticLogon() {
            let user = dataMethod.getLocalData("user")[0];
            this.user = user;
            if (!user) {
                this.$router.push("/login");
            }
        },
        langeChange(data) {
          if(data==="cn"){
            this.set_lange(false);
          }else{
            this.set_lange(true);
          }
            this.$i18n.locale = data;
            window.localStorage.setItem("language", data);
        },
        ...mapMutations(["set_lange"])
    },
    components: {},
    watch: {}
};
</script>

<style lang="stylus" scoped>
@import './home.styl';
</style>
