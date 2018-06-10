<template>
  <div class="box">
    <div class="top" v-if="power">
      <p class="font">课程添加：</p>
      <div class="input">
        <span>课程名字：</span>
         <el-input v-model="courseName" placeholder="课程名字"></el-input>
      </div>
      <div class="input">
        <span>老师：</span>
         <el-autocomplete 
              v-model="search.addTeacher.value" 
              :fetch-suggestions="findTeacherSelect"
              placeholder="请输入内容"
              @select="handleAddTeacher" 
              >
          </el-autocomplete>
      </div>
      <div class="input">
        <span>学生：</span>
        <el-autocomplete 
              v-model="search.addStudent.value" 
              :fetch-suggestions="findStudentSelect"
              placeholder="请选择学生"
              @select="handleAddStudent" 
              >
          </el-autocomplete>
      </div>
      <div class="input">
        <span>时间：</span>
        <el-date-picker v-model="date" type="datetime" placeholder="请选择时间" value-format="timestamp">
        </el-date-picker>
      </div>
      <br>
      <el-button type="primary" @click="addList">添加</el-button>
    </div>
    <!-- 查询 -->
    <div class="search">
      <div class="top" v-if="power">
        <p class="font">课程添加：</p>
        <div class="input">
          <span>老师：</span>
          <el-autocomplete 
              v-model="search.shaiTeacher.value" 
              :fetch-suggestions="findTeacherSelect"
              placeholder="请输入内容"
              @select="handleShaiTeacher" 
              >
          </el-autocomplete>
        </div>
        <div class="input">
          <span>学生：</span>
          <el-autocomplete 
              v-model="search.shaiStudent.value" 
              :fetch-suggestions="findStudentSelect"
              placeholder="请选择学生"
              @select="handleShaiStudent" 
              >
          </el-autocomplete>
        </div>
        <div class="input">
          <span>评价：</span>
          <el-select v-model="searchData.evaluate" clearable placeholder="请选择评价">
            <el-option v-for="item in evaluate" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="input" style="width:450px;marginTop:10px;">
          <span>时间：</span>
          <el-date-picker v-model="searchData.date" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp">
          </el-date-picker>
        </div>
        <el-button type="primary" @click="screenTable" style="height:40px;margin-top: 10px;">筛选</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="时间" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.date|dateFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="课程名字" prop="name" width="180"></el-table-column>
        <el-table-column label="老师" width="180">
          <template slot-scope="scope">
            <span class="courseName" @click="JumpPersonalInfo(scope.row.teacherId)">{{scope.row.teacherId.name}}&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column label="学生">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.studentsId" :key="index">{{item.name}}&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column prop="timeLong" label="时长" width="180"></el-table-column>
        <el-table-column label="评价">
          <template slot-scope="scope">
            <span>{{scope.row.evaluate|scoreStatus}}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination 
      class="pagination" 
      background 
      @current-change="tableChanePage" 
      @size-change="tableChangeSize"
      :page-sizes="[5, 10, 15, 20, 25, 30]" 
      :page-size="tablePagination.pageSize" 
      layout="sizes, prev, pager, next" 
      :total="tablePagination.count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { requestMethod } from "../../../service/index";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: "course",
    data() {
        return {
            teacherId: "",
            teacherData: [],
            studentsId: [],
            studentData: [],
            search:{
              addTeacher:{},
              addStudent:{},
              shaiTeacher:{},
              shaiStudent:{}
            },
            teacher:{},
            student:{},
            teacherName:"",
            date: "",
            tableData: null,
            searchData: {
                pageSize: 5 //默认每页显示5条数据
            },
            evaluate: [
                {
                    id: 15,
                    name: "好"
                },
                {
                    id: 10,
                    name: "良"
                },
                {
                    id: 5,
                    name: "差"
                }
            ],
            tablePagination: {
                pageSize: 5
            },
            courseName:null,
        };
    },
    created() {
        this.userPower();
        // this.getTeacherList();
        // this.getStudentList();
        this.screenTable();
    },
    mounted() {
        
    },
    computed: {},
    methods: {
        userPower() {
            const power = this.loginPower();
            if (!power) {
                this.$router.push({ name: "personal" });
            }
        },
        getTeacherList(findQuery={}) {
          return new Promise((resolve, reject) => {
            requestMethod.getTeacherList(findQuery).then(res => {
                if(res.data){
                    const detail = this.coachDetail(res.data);
                    resolve(detail);  
                  }
                
            });
          })
            
        },
        coachDetail(valueCoach) {
            let coachDetail = [];
            if (Array.isArray(valueCoach) && valueCoach.length > 0) {
                valueCoach.forEach(value => {
                    const list = {
                        value: value.name,
                        _id: value._id
                    };
                    coachDetail.push(list);
                });
            }
            return coachDetail;
        },
        getStudentList(findQuery={}) {
          return new Promise((resolve, reject) => {
            requestMethod.getStudentList(findQuery).then(res => {
                if(res.data){
                    const detail = this.coachDetail(res.data);
                    resolve(detail);  
                  }
                
            });
          })
        },
        // getCourseList() {
        //     requestMethod.getCourseList().then(res => {
        //         const count = res.count;
        //         this.tablePagination.count = count;
        //         this.tableData = res.data;
        //     });
        // },
        addList() {
            const { search, date,courseName } = this;
            const stuId=search.addStudent._id
            const data = {
                teacherId:search.addTeacher._id._id||"",
                date: new Date(date).getTime(),
                studentsId:[stuId],
                name:courseName,
                admin:true,
            };
            
            requestMethod.addCourse(data).then(res => {
                this.searchData = {};
                this.screenTable();
            });
        },
        //跳转到老师信息页面
        JumpPersonalInfo(teacher) {
            this.set_teacher_info(teacher);
            this.timeChange();
            const teacherId = teacher._id;
            this.$router.push({
                name: "teacherInfo",
                params: { id: teacherId }
            });
        },
        //筛选
        screenTable() {
            const { searchData } = this;
            if(this.search.shaiTeacher._id){
              searchData.teacherId=this.search.shaiTeacher._id._id
            }
            if(this.search.shaiStudent._id){
              searchData.studentsId=[this.search.shaiStudent._id]
            }
            console.log(this.search);
            requestMethod
                .screenTable(searchData)
                .then(res => {
                    const count = res.count;
                    this.tablePagination.count = count;
                    this.tableData = res.data;
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        //table 分页
        tableChanePage(value) {
            this.searchData.pageNumer = value;
            this.screenTable();
        },
        //table 改变当前显示数量
        tableChangeSize(value){
          this.searchData.pageSize=value;
          this.screenTable();
        },
        //动态查找老师
        findTeacherSelect(query, cb) {
            let findqQuery = {};
            if (query) {
                findqQuery = {
                    name: query
                };
            }
            this.getTeacherList(findqQuery)
                .then(result => {
                    cb(result);
                })
                .catch(err => {
                  this.$message.error("err")
                });
        },
        //动态查找学生
        findStudentSelect(query, cb) {
            let findqQuery = {};
            if (query) {
                findqQuery = {
                    name: query
                };
            }
            this.getStudentList(findqQuery)
                .then(result => {
                    cb(result);
                })
                .catch(err => {
                  this.$message.error("err")
                });
        },
        handleAddTeacher(value){
              this.search.addTeacher=value
        },
        handleAddStudent(value){
              this.search.addStudent=value
        },
        handleShaiTeacher(value){
              this.search.shaiTeacher=value
        },
        handleShaiStudent(value){
              this.search.shaiStudent=value
        },
        ...mapMutations(["set_teacher_info"]),
        ...mapActions(["timeChange"])
    },
    components: {},
    watch: {}
};
</script>

<style lang="stylus" scoped>
@import './course.styl';
</style>
