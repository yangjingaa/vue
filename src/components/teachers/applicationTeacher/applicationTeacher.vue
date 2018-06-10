<template>
  <div class="appTeacher">
    <div class="box">
      <div class="font">
        <p>教师审核：</p>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="老师"/>
          <el-table-column prop="email" label="email" width="200"/>
          <el-table-column prop="age" label="年龄"/>
          <el-table-column prop="time" label="申请时间"/>
          <el-table-column prop="graduateSchool" label="学校"/>
          <el-table-column prop="address" label="地址"/>


          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="confirmTeacher(scope.row)">确认审核</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          background
          @current-change="tableChanePageShen"
          @size-change="tableChangeSizeShen"
          :page-sizes="[5, 10, 15, 20, 25, 30]"
          :page-size="tableShenHe.pageSize"
          layout="sizes, prev, pager, next"
          :total="tableShenHe.count">
        </el-pagination>
      </div>
    </div>
    <div class="box">
      <div class="font">
        <p>推荐教师审核：</p>
      </div>
      <div class="tiaojian">
        <el-button type="primary" :disabled="tuijianState==='tijiao'" @click="screenList('tijiao')">未审核</el-button>
        <el-button type="primary" :disabled="tuijianState==='chenggong'" @click="screenList('chenggong')">审核成功
        </el-button>
        <el-button type="primary" :disabled="tuijianState==='shibai'" @click="screenList('shibai')">审核失败</el-button>
      </div>
      <div class="table">
        <el-table :data="tuijianDate" style="width: 100%">
          <el-table-column prop="name" label="推荐老师">
            <template slot-scope="scope">
              {{scope.row.tuijian.name}}
            </template>
          </el-table-column>
          <el-table-column prop="time" label="推荐时间">
            <template slot-scope="scope">
              {{scope.row.time|dateFilter}}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="老师名字"></el-table-column>
          <el-table-column prop="email" label="email" width="200"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>

          <el-table-column prop="graduateSchool" label="学校"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column label="审核状态">
            <template slot-scope="scope">
              {{scope.row.state|tuijian}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250px">
            <template slot-scope="scope">
              <div class="button">
                <el-button size="mini" @click="createTeacher(scope.row,'chenggong')">确认审核</el-button>
                <el-button size="mini" @click="createTeacher(scope.row,'shibai')">审核不通过</el-button>
              </div>
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

  </div>
</template>

<script>
  import {requestMethod, dataMethod} from "../../../service/index";

  export default {
    name: "application-teacher",
    data() {
      return {
        tableData: [],
        tuijianDate: [],
        tuijianState: "tijiao",
        tablePagination: {
          pageSize: 5
        },
        tableShenHe:{
          pageSize: 5
        }
      };
    },
    created() {
    },
    mounted() {
      this.getAppTeacherList();
      this.getTuiJianTeacher();
    },
    computed: {},
    methods: {
      getAppTeacherList() {
        const findData = {
          pageSize: this.tableShenHe.pageSize,
        };
        requestMethod
          .getAppTeacherList(findData)
          .then(res => {
            this.tableData = res.data;
            this.tableShenHe.count=res.count;
          })
          .catch(res => {
            this.$message({
              message: res,
              type: "warning"
            });
          });
      },
      confirmTeacher(value) {
        const _id = value._id;
        const data = {
          _id
        };
        requestMethod
          .confirmTeacher(data)
          .then(res => {
            this.getAppTeacherList();
          })
          .catch(res => {
            this.$message({
              message: res,
              type: "warning"
            });
          });
      },
      getTuiJianTeacher() {
        const findData = {
          state: this.tuijianState,
          pageSize: this.tablePagination.pageSize,
        };
        requestMethod
          .getTuiJianTeacher(findData)
          .then(result => {
            this.tuijianDate = result.data;
            this.tablePagination.count=result.count;
          })
          .catch(err => {
            this.$message.error(err);
          });
      },
      //table 分页
      tableChanePage(value) {
        this.tablePagination.pageNumer = value;
        this.getTuiJianTeacher();
      },
      //table 改变当前显示数量
      tableChangeSize(value){
        this.tablePagination.pageSize=value;
        this.getTuiJianTeacher();
      },
      tableChanePageShen(value) {
        this.tableShenHe.pageNumer = value;
        this.getAppTeacherList();
      },
      //table 改变当前显示数量
      tableChangeSizeShen(value){
        this.tableShenHe.pageSize=value;
        this.getAppTeacherList();
      },
      createTeacher(list, state) {
        let upDate = {
          _id: list._id,
          state: state
        };
        requestMethod.createTuijianTeacher(upDate)
          .then((result) => {
            this.$message.success(result.message);
            this.getTuiJianTeacher()
          }).catch((err) => {
          this.$message.error(err)
        });
      },
      screenList(value) {
        this.tuijianState = value;
        this.getTuiJianTeacher();
      }
    },
    components: {},
    watch: {}
  };
</script>

<style lang="stylus" scoped>
  @import 'applicationTeacher.styl';
</style>
