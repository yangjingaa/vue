<template>
  <div class="box">
    <div class="top" v-if="power">
      <p class="font">课程添加：</p>
      <div class="input">
        <span>老师：</span>
        <el-select v-model="teacherId" placeholder="请选择老师">
          <el-option v-for="item in teacherData" :key="item._id._id" :label="item.name" :value="item._id._id">
          </el-option>
        </el-select>
      </div>
      <div class="input">
        <span>学生：</span>
        <el-select v-model="studentsId" multiple placeholder="请选择老师">
          <el-option v-for="item in studentData" :key="item._id" :label="item.name" :value="item._id">
          </el-option>
        </el-select>
      </div>
      <div class="input">
        <span>时间：</span>
        <el-date-picker v-model="date" type="datetime" placeholder="请选择时间" value-format="timestamp">
        </el-date-picker>
      </div>
      <el-button type="primary" @click="addList">添加</el-button>
    </div>
    <!-- 查询 -->
    <div class="search">
      <div class="top" v-if="power">
        <p class="font">课程添加：</p>
        <div class="input">
          <span>老师：</span>
          <el-select v-model="searchData.teacherId" clearable placeholder="请选择老师">
            <el-option v-for="item in teacherData" :key="item._id._id" :label="item.name" :value="item._id._id">
            </el-option>
          </el-select>
        </div>
        <div class="input">
          <span>学生：</span>
          <el-select v-model="searchData.studentsId" multiple placeholder="请选择学生">
            <el-option v-for="item in studentData" :key="item._id" :label="item.name" :value="item._id">
            </el-option>
          </el-select>
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
            }
        };
    },
    created() {
        this.userPower();
        this.getTeacherList();
        this.getStudentList();
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
        getTeacherList() {
            requestMethod.getTeacherList().then(res => {
                this.teacherData = res.data;
            });
        },
        getStudentList() {
            requestMethod.getStudentList().then(res => {
                const data = res.data.data;

                this.studentData = data;
            });
        },
        // getCourseList() {
        //     requestMethod.getCourseList().then(res => {
        //         const count = res.count;
        //         this.tablePagination.count = count;
        //         this.tableData = res.data;
        //     });
        // },
        addList() {
            const { teacherId, studentsId, date } = this;
            const data = {
                teacherId,
                date: new Date(date).getTime(),
                studentsId
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
