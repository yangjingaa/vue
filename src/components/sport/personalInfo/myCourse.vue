<template>
  <div class="courseTable">
    <course-table :user-id="userId" />
  </div>

</template>

<script>
  import {sportMethod, dataMethod} from "../../../service/index"
  import CourseTable from "../../../common/courseTable/courseTable.vue"
    export default {
        name: "my-course",
        data() {
            return {
            userId:null,
            }
        },
        created() {
            this.getUserInfo()
        },
        mounted() {

        },
        computed: {},
        methods: {
            getUserInfo(){
            const {_id}=dataMethod.getLocalData("user")[0];
            console.log(_id)
            this.userId=_id
          }
        },
        components: {
            CourseTable,
        },
        watch: {}
    }
</script>

<style lang="stylus" scoped>
@import "./personalInfo.styl"
</style>
