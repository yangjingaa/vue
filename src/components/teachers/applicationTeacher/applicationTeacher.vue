<template>
   <div class="appTeacher">
     <div class="table">
       <el-table :data="tableData" style="width: 100%">

         <el-table-column prop="name" label="老师"  ></el-table-column>
         <el-table-column prop="email" label="email" width="200" ></el-table-column>
         <el-table-column prop="age" label="年龄" ></el-table-column>
         <el-table-column prop="time" label="申请时间" ></el-table-column>
         <el-table-column prop="graduateSchool" label="学校" ></el-table-column>
         <el-table-column prop="address" label="地址" ></el-table-column>
         <el-table-column  label="操作" >
           <template slot-scope="scope">
             <el-button @click="confirmTeacher(scope.row)">确认审核</el-button>
           </template>
         </el-table-column>

       </el-table>
     </div>
   </div>
</template>

<script>
  import {requestMethod} from "../../../service/index"
    export default {
        name: "application-teacher",
        data() {
            return {
              tableData:[],
            }
        },
        created() {
        },
        mounted() {
          this.getAppTeacherList()
        },
        computed: {},
        methods: {
          getAppTeacherList(){
            requestMethod.getAppTeacherList()
              .then(res=>{
                this.tableData=res.data
              })
              .catch(res=>{
                this.$message({
                  message:res,
                  type: 'warning'
                });
              })
          },
          confirmTeacher(value){
            const _id=value._id;
            const data={
              _id
            };
            requestMethod.confirmTeacher(data)
              .then(res=>{
                this.getAppTeacherList();
              })
              .catch(res=>{
                this.$message({
                  message:res,
                  type: 'warning'
                });
              })
          },
        },
        components: {},
        watch: {}
    }
</script>

<style lang="stylus" scoped>
@import "applicationTeacher.styl"
</style>
