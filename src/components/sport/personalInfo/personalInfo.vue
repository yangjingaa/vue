<template>
  <div class="personal">
    <el-tabs type="border-card" class="box">
      <el-tab-pane label="个人信息"><myInfo/></el-tab-pane>
      <el-tab-pane label="设备预约"><reservation/></el-tab-pane>
      <el-tab-pane label="课程预约"><myCourse/></el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import myInfo from "./myInfo"
  import reservation from "./reservation"
  import myCourse from "./myCourse"
  
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
          reservation,
          myCourse,
        },
        watch: {}
    }
</script>

<style lang="stylus" scoped>
@import "./personalInfo.styl"
</style>
