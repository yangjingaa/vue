<template>
  <div class="courseBox">
    <div class="list" >
      <span class="name">课程名字：</span>
      <span class="value">{{courseList.name}}</span>
    </div>
    <div class="list coachList" @click="coachSelect(courseList.coach._id)">
      <span class="name">教练：</span>
      <span class="value">{{courseList.coach.name}}</span>
    </div>
    <div class="list">
      <span class="name">上课地点：</span>
      <span class="value">{{courseList.adress}}</span>
    </div>
    <div class="list">
      <span class="name">最大预约人数：</span>
      <span class="value">{{courseList.maxNum}}</span>
    </div>
    <div class="list">
      <span class="name">开课时间:</span>
      
      <el-date-picker
      v-model="courseList.startTime"
      type="datetime"
      placeholder="选择开始时间"
      disabled
      value-format="timestamp">
      </el-date-picker>
      <el-date-picker
      v-model="courseList.endTime"
      type="datetime"
      disabled
      placeholder="选择结束时间"
      value-format="timestamp">
      </el-date-picker>
    </div>
    <div class="list">
      <span class="name">课程介绍:</span>
      <span class="value">{{courseList.message}}</span>
    </div>
    <div class="list">
      <el-button type="primary" :disabled="resDisable" @click="resCourse(courseList)">预约课程</el-button>
      <el-button type="primary" @click="editCourse(courseList)">编辑</el-button>
      <div class="peopleNum">
        {{peopleNum}}
      </div>
    </div>
  </div>
</template>

<script>
import { sportMethod, dataMethod } from "../../service/index";
import { mapMutations } from "vuex";

export default {
    name: "course-box",
    props: {
        courseList: {}
    },
    data() {
        return {
          a:10
        };
    },
    created() {
      // this.editDataTime();
    },
    mounted() {},
    computed: {
      //时间限制
      minTime() {
            return this.courseList.startTime || undefined;
        },
        peopleNum(){
          const num= this.courseList.userId.length;
          return `已预约${num}人`
        },
        resDisable(){
          const num= this.courseList.userId.length;
          return num>=this.courseList.maxNum
        }
    },
    methods: {
        //预约课程
        resCourse(list) {
          this.$emit("resCourse",list._id)
        },
        //编辑教练课程信息
        editCourse(list){
            this.$emit("edit",list)
        },
        //editData
        editDataTime(){
          // const startTime=this.courseList.startTime; 
          const endTime=this.courseList.endTime;
          this.courseList.startTime=new Date(startTime).toLocaleTimeString().slice(0,-3)
          this.courseList.endTime=new Date(endTime).toLocaleTimeString().slice(0,-3)
        },
        //跳转教练页面
        coachSelect(_id){
          console.log(_id)
        }
    },
    components: {},
    watch: {}
};
</script>

<style lang="stylus" scoped>
@import './course.styl';
</style>
