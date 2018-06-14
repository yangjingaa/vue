<template>
  <div class="personal">
    <el-tabs type="border-card" class="box">
      <el-tab-pane label="我的信息"><myInfo/></el-tab-pane>
      <el-tab-pane label="我的推荐" v-if="userIsTeacher()"><tuijian/></el-tab-pane>
       <el-tab-pane label="我的工资单" v-if="userIsTeacher()"><gongzi/></el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import myInfo from "../personal/index.vue"
  import tuijian from "./tuijian"
  import gongzi from "./gongzi"
//   import myCourse from "./myCourse"

    export default {
        name: "personal-info",
        data() {
            return {}
        },
        created() {

        },
        mounted() {

        },
        computed: {},
        methods: {},
        components: {
          myInfo,
          tuijian,
          gongzi,
        },
        watch: {}
    }
</script>

<style lang="stylus" scoped>
@import "./index.styl"
</style>
