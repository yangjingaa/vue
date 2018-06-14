<template>
  <div class="teacher-home">
    <div class="table">
      <el-table :data="teacherList" style="width: 100%" @row-click="tableSelectClick">
        <el-table-column prop="name" label="姓名" width="180">
          <template slot-scope="scope">
            <span class="courseName" @click="JumpPersonalInfo(scope.row._id)">{{scope.row.name}}&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="180"></el-table-column>
        <el-table-column prop="email" label="email"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="graduateSchool" label="毕业院校"></el-table-column>
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

</template>

<script>
  import {requestMethod} from "../../../service/index"

  export default {
    name: "teacher",
    data() {
      return {
        teacherList: null,
        teacherId: null,
        name:null,
        age:null,
        email:null,
        address:null,
        graduateSchool:null,
        tableShenHe:{
          pageSize: 5
        }
      }
    },
    created() {
      this.getTeacherList();
    },
    mounted() {

    },
    computed: {},
    methods: {
      //获得老师列表
      getTeacherList() {
        const findData={
          pageSize: this.tableShenHe.pageSize,
          pageNumer:this.tableShenHe.pageNumer||1
        };
        requestMethod.getTeacherList(findData)
          .then((res) => {
              this.teacherList = res.data;
              this.tableShenHe.count=res.count;
          }).catch((err)=>{
            this.$message.error(err)
          }
        )
      },
      //表格行被点击
      tableSelectClick(row) {
        let id = row._id;
        if (id) {
          this.teacherId = id;
        }
      },
      //添加老师
      addList(){
        const {name,age,email,address,graduateSchool}=this;
        const data={
          name, age,email,address,graduateSchool
        };
        requestMethod.addTeacher(data)
          .then(res=>{

          })
      },
      //跳转到老师信息页面
        JumpPersonalInfo(_id) {
            this.$router.push({
                name: "teacherInfo",
                params: { id: _id._id }
            });
        },
      tableChanePageShen(value) {
        this.tableShenHe.pageNumer = value;
        this.getTeacherList();
      },
      //table 改变当前显示数量
      tableChangeSizeShen(value){
        this.tableShenHe.pageSize=value;
        this.getTeacherList();
      },
    },
    components: {},
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "./teacher.styl"
</style>
