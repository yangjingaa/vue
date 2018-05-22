<template>
  <div class="personal">
    <el-tabs type="border-card" class="box">
      <el-tab-pane label="个人信息"><myInfo/></el-tab-pane>
      <el-tab-pane label="我的预约"><reservation/></el-tab-pane>
      <el-tab-pane label="我的课程">我的课程</el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import myInfo from "./myInfo"
  import reservation from "./reservation"
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
        },
        watch: {}
    }
</script>

<style lang="stylus" scoped>
@import "./personalInfo.styl"
</style>
