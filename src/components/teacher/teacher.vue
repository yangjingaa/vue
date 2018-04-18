<template>
  <div class="teacher-home">
    <div class="top">
        <span class="input">名字：
          <input v-model="name" placeholder="">
        </span>
      <span class="input">年龄：
        <input v-model="age"  placeholder="">
      </span>
      <span class="input">email：
          <input type="text" v-model="email" placeholder="">
      </span>
      <span class="input">地址：
          <input type="text" v-model="address" placeholder="">
      </span>
      <span class="input">毕业院校：
          <input type="text" v-model="graduateSchool" placeholder="">
      </span>
      <el-button type="primary" @click="addList">添加</el-button>
    </div>
    <div class="table">
      <el-table :data="teacherList" style="width: 100%" @row-click="tableSelectClick">
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="age" label="年龄" width="180"></el-table-column>
        <el-table-column prop="email" label="email"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="graduateSchool" label="毕业院校"></el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
  import {requestMethod} from "../../service/index"

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
        requestMethod.getTeacherList()
          .then((res) => {
              this.teacherList = res.data;
          }).catch()
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
      }
    },
    components: {},
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "./teacher.styl"
</style>
