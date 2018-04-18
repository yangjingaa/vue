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
        <el-table-column label="密码" prop="pwd">
        </el-table-column>
        <el-table-column label="角色" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.isAdmin | roleName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button v-if="roleButton(scope.row.isAdmin)" @click="deleteUser(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {requestMethod} from "../../service/index"
  import {getLocalData} from "../../service/tools"

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
            this.getUserList()
          })
          .catch(mess => {
            console.log(mess);
          })
      }
    },
    components: {},
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "index.styl"
</style>
