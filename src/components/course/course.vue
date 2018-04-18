<template>
  <div class="box">
    <div class="top">
        <span class="input">老师：
          <el-select v-model="teacherId" placeholder="请选择老师">
            <el-option
              v-for="item in teacherData"
              :key="item._id._id"
              :label="item.name"
              :value="item._id._id">
            </el-option>
          </el-select>
        </span>
      <span class="input">学生：
        <el-select v-model="studentsId" multiple placeholder="请选择老师">
          <el-option
            v-for="item in studentData"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>

      </span>
      <span class="input">时间：
          <el-date-picker
            v-model="date"
            type="datetime"
            placeholder="请选择时间"
            value-format="timestamp">
        </el-date-picker>
      </span>
      <el-button type="primary" @click="addList">添加</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="时间" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.date|dateFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="老师" width="180">
          <template slot-scope="scope">
            <span class="courseName" @click="JumpPersonalInfo(scope.row.teacherId)">{{scope.row.teacherId.name}}&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column label="学生">
          <template slot-scope="scope">
            <span v-for="item in scope.row.studentsId">{{item.name}}&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column prop="timeLong" label="时长" width="180"></el-table-column>
        <el-table-column label="评价">
          <template slot-scope="scope">
            <span>{{scope.row.evaluate|scoreStatus}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {requestMethod} from "../../service/index"
  import {mapState, mapMutations,mapActions} from 'vuex'

  export default {
    name: "course",
    data() {
      return {
        teacherId: "",
        teacherData: [],
        studentsId: [],
        studentData: [],
        date: "",
        tableData: null,
      }
    },
    created() {

    },
    mounted() {
      this.getTeacherList();
      this.getStudentList();
      this.getCourseList();
    },
    computed: {
    },
    methods: {
      getTeacherList() {
        requestMethod.getTeacherList()
          .then((res) => {
            this.teacherData = res.data;
          })
      },
      getStudentList() {
        requestMethod.getStudentList()
          .then((res) => {
            const data = res.data.data;

            this.studentData = data;
          })
      },
      getCourseList() {
        requestMethod.getCourseList()
          .then(res => {
            this.tableData = res.data;
            console.log(this.tableData);
          })
      },
      addList() {
        const {teacherId, studentsId, date} = this;
        const data = {
          teacherId,
          date: new Date(date).getTime(),
          studentsId
        };
        requestMethod.addCourse(data).then(res => {
          this.getCourseList();
        })
      },
      //跳转到老师信息页面
      JumpPersonalInfo(teacher) {
        this.set_teacher_info(teacher);
        this.timeChange();
        const teacherId=teacher._id;
        this.$router.push({name:"teacherInfo",params:{id:teacherId}})
      },
      ...mapMutations([
        "set_teacher_info",
      ]),
      ...mapActions([
        "timeChange"
      ])
    },
    components: {},
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "./course.styl"
</style>
