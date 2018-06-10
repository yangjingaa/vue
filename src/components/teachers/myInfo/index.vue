<template>
  <div class="personal">
    <el-tabs type="border-card" class="box">
      <el-tab-pane label="我的信息"><myInfo/></el-tab-pane>
      <el-tab-pane label="我的推荐"><tuijian/></el-tab-pane>
      <!-- <el-tab-pane label="我的课程"><myCourse/></el-tab-pane> -->
    </el-tabs>
  </div>

</template>

<script>
  import myInfo from "../personal/index.vue"
  import tuijian from "./tuijian"
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
        },
        watch: {}
    }
</script>

<style lang="stylus" scoped>
@import "./index.styl"
</style>
