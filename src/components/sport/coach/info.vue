<template>
  <div class="">
    <div class="coach-info">
      <div class="image-people">
        <img src="../../../../static/image/card/chaoji.png"/>
      </div>
      <div class="personalList">
        <div class="list">
          姓名：{{coachInfo.name}}
        </div>
        <div class="list">
          教练等级：<span style="color: red;">{{coachInfo.gender|grade}}</span>
        </div>
        <div class="list">
          年龄：{{coachInfo.age}}
        </div>
        <div class="list">
          手机号：{{coachInfo.phoneNum}}
        </div>
        <div class="list">
          评价：<span style="color: red;">{{coachInfo.evaluate|evaluate}}</span>
        </div>
        <div class="list">
          介绍：{{coachInfo.message}}
        </div>

      </div>
    </div>
    <div class="button">
      <el-button type="primary">预约教练</el-button>
      <el-button type="primary">删除教练</el-button>
      <el-button type="primary" @click="changeCoachInfo">修改信息</el-button>
    </div>
  </div>


</template>

<script>
  import Elements from "../elements/elements";

  export default {
    name: "info",
    props: {
      coachInfo: {}
    },

    data() {
      return {}
    },
    created() {

    },
    mounted() {

    },
    computed: {},
    methods: {
      changeCoachInfo(){
        this.$emit("change",this.coachInfo)
      }
    },
    components: {Elements},
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "./coach.styl"
</style>
