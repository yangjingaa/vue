<template>
  <div>
    <el-button type="info" class="back" @click="back"> 返回</el-button>
    <div class="topss">
      <!--个人信息-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
        </div>
        <div class="text item">
          <div class="personal-main">
            <div class="top">
              <h1>个人信息</h1>
            </div>
            <div class="writeInfo">
              <span class="input">
                <div class="font">名字：</div>
                <el-input :value="teacherInfo.name" placeholder="名字"/>
              </span>
              <span class="input">
                <div class="font">授课级别：</div>
                <el-input :value="teacherInfo.grade|grade" placeholder="授课级别"/>
              </span>
              <span class="input">
                <div class="font">年龄：</div>
                <el-input :value="teacherInfo.age" placeholder=""/>
              </span>
              <span class="input">
                <div class="font">email：</div>
                <el-input type="text" :value="teacherInfo.email" placeholder="年龄"/>
              </span>
              <span class="input">
                <div class="font">地址：</div>
                <el-input type="text" :value="teacherInfo.address" placeholder="地址"/>
              </span>
              <span class="input">
                <div class="font">毕业院校：</div>
                <el-input type="text" :value="teacherInfo.graduateSchool" placeholder="毕业院校"/>
              </span>
              <span class="input">
                <div class="font">入职时间：</div>
                <el-input type="text" :value="teacherInfo.time|dateFilter" placeholder="毕业院校"/>
              </span>
            </div>
          </div>
        </div>
      </el-card>
      <!--功能操作-->
      <el-card class="box-card" v-if="teacherP">
        <div slot="header" class="clearfix">
          <span>操作</span>
        </div>
        <div class="text item">
          <div class="func">
            <el-button type="primary" icon="el-icon-edit" @click="openInformationSWrite">发送信息</el-button>
            <el-button type="danger" @click="dismiss">禁止授课</el-button>
          </div>
          <div class="upGrade">
            <span>改变授课等级：</span>
            <el-select v-model="courseDataGrade" placeholder="课程等级">
              <el-option v-for="item in grade" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <span>
              <el-button type="primaryp" @click="upLectureGrad">确定</el-button>
            </span>
          </div>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="信息" name="1" class="warning-content">
              <div v-for="(item,index) in warnMessage" :key="index" class="warning">
                <div class="warning-top">{{item.date|dateFilter}}
                  <i>--</i> {{item.adminId.name}}
                </div>
                <div class="warning-con">{{item.message}}</div>
              </div>
            </el-collapse-item>

          </el-collapse>
        </div>
      </el-card>
    </div>
    <!--开课记录-->
    <div class="table" v-if="teacherP">
      <div class="course">开课记录</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="时间" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.date|dateFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="老师" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.teacherId.name}}&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column label="学生">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.studentsId" :key="index">{{item.name}}&nbsp;</span>
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
  import {requestMethod} from "../../../service/index";
  import {getLocalData} from "../../../service/tools";
  import {StatusCode} from "../../../public/message/index";

  import {mapState, mapMutations, mapGetters} from "vuex";

  export default {
    name: "index",
    data() {
      return {
        tableData: [],
        id: null,
        activeNames: "1",
        teacherId: this.$route.params.id,
        warnMessage: [],
        teacherInfo: {},
        grade: StatusCode.GRADE,
        courseDataGrade: null,
        tablePagination: {
          pageSize: 5
        },
        teacherP:false
      };
    },
    created() {
      this.getWarningInfo();
      this.getLocalTeacherInfo();
    },
    mounted() {
      this.getCourseList();
    },
    computed: {
      // 权限验证
      power() {
        return getLocalData("user")[0].isAdmin === 0;
      },
      ...mapState([
        // "teacherInfo",
      ])
    },
    methods: {
      // 获得课程列表
      getCourseList() {
        const teacherId = this.teacherId;
        const data = {
          teacherId,
          pageSize: this.tablePagination.pageSize,
          pageNumer:this.tablePagination.pageNumer||1,
        };
        requestMethod
          .getCourseList(data)
          .then(res => {
            this.tableData = res.data;
            this.tablePagination.count=res.count;
          })
          .catch(res => {
            this.$message(res);
          });
      },
      handleChange(val) {
      },
      //获得老师信息
      getLocalTeacherInfo() {
        const data = {
          _id: this.teacherId
        };
        requestMethod
          .getTeacherInfo(data)
          .then(res => {
            this.teacherInfo = res.data[0];
            console.log(res.data[0]);
            if(res.data[0].isTeacher===1){
              this.teacherP=true;
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      },
      //发送警告信息
      sendWarning(value) {
        const data = this.geTeacherData(value);
        requestMethod
          .sendWarning(data)
          .then(res => {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.getWarningInfo();
          })
          .catch(res => {
            this.$message.error(res);
          });
      },

      geTeacherData(value) {
        const adminId = getLocalData("user")[0]._id;
        let data = {
          teacherId: this.teacherId,
          adminId: adminId
        };
        if (value) {
          data.message = value;
        }
        return data;
      },
      openInformationSWrite() {
        const that = this;
        this.$prompt("请输入信息", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(({value}) => {
          that.sendWarning(value);
        });
      },
      //获取老师警告信息
      getWarningInfo() {
        const data = this.geTeacherData();
        requestMethod
          .getWarningInfo(data)
          .then(res => {
            this.warnMessage = res.data;
          })
          .catch(res => console.log(res));
      },
      //后退
      back() {
        this.$router.go(-1);
      },
      //辞退
      dismiss() {
        const data = this.geTeacherData();
        requestMethod
          .dismissTeacher(data)
          .then(res => {
            this.$message.success("禁止成功")
          })
          .catch(res => {
            this.$message.error(res);
          });
      },
      //提升老师授课等级
      upLectureGrad() {
        const {courseDataGrade} = this;
        const teacherId = this.teacherId;
        if (courseDataGrade || courseDataGrade === 0) {
          const data = {
            _id: teacherId,
            grade: courseDataGrade
          }
          requestMethod.upLectureGrad(data)
            .then(res => {
              this.$message.success(res.message)
              this.teacherInfo = res.data[0];
            }).catch(err => {
            this.$message.error(err);
          })
        }
      },
      //table 分页
      tableChanePage(value) {
        this.tablePagination.pageNumer = value;
        this.getCourseList();
      },
      //table 改变当前显示数量
      tableChangeSize(value) {
        this.tablePagination.pageSize = value;
        this.getCourseList();
      },
    },
    components: {},
    watch: {}
  };
</script>

<style lang="stylus" scoped>
  @import 'teacherInfo.styl';

  .text {
    font-size: 14px;
  }

  .course {
    font-size: 20px;
    color: #5a5a5a;
    font-family: 'Microsoft Yi Baiti';
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before, .clearfix:after {
    display: table;
    content: '';
  }

  .clearfix:after {
    clear: both;
  }

  .box-card {
    display: inline-block;
    width: 480px;
    margin-left: 20px;
  }
</style>
