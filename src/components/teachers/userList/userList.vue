<template>
  <div>

    <div class="table">
      <div class="course">用户列表</div>
      <el-table :data="userList" style="width: 100%">
        <el-table-column label="id">
          <template slot-scope="scope">
            <span>{{scope.row._id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名" prop="userName" width="180">
        </el-table-column>
        <el-table-column label="名字"  prop="name">
          <template slot-scope="scope">
            <span class="courseName" @click="JumpPersonalInfo(scope.row)">{{scope.row.name}}&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column label="角色" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.isAdmin | roleName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <span v-if="roleButton(scope.row.isAdmin)" style="display: flex;justify-content: space-around">
              <el-button  @click="deleteUser(scope.row._id)">删除</el-button>
              <el-button   @click="recoveryteUser(scope.row._id)">恢复授权</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {requestMethod} from "../../../service/index"
  import {getLocalData} from "../../../service/tools"
  import { mapState, mapMutations, mapActions } from "vuex";

  export default {
    name: "user-list",
    data() {
      return {
        userList: []
      }
    },
    created() {

    },
    mounted() {
      this.getUserList()
    },
    computed: {},
    methods: {
      getUserList() {
        requestMethod.getUserList()
          .then(res => {
            console.log(res.data);
            this.userList = res.data;
          })
          .catch(res => {
            this.$message.error(res)
          })
      },
      roleButton(value) {
        if (value === 100) {
          return true
        }
      },
      deleteUser(_id) {
        const data = {_id};
        requestMethod.deleteUser(data)
          .then(res => {
            this.$message.success(res.message);
            this.getUserList()
          })
          .catch(mess => {
            console.log(mess);
          })
      },
      recoveryteUser(_id){
        const data = {_id};
        requestMethod.recoveryteUser(data)
          .then(res=>{
            this.$message.success(res.message)
            this.getUserList()
          })
          .catch(err=>{
            this.$message.error(err)
          })
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
      ...mapMutations(["set_teacher_info"]),
      ...mapActions(["timeChange"])
    },
    components: {},
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "index.styl"
</style>
