<template>
  <div class="personal-main">
    <div class="top">
      <h1>个人信息填写</h1>
    </div>
    <div class="writeInfo">
        <span class="input">
          <div class="font">名字：</div>
          <input disabled v-model="name" placeholder="名字">
        </span>
      <span class="input">
        <div class="font">年龄：</div>
        <input v-model="age" placeholder="">
      </span>
      <span class="input">
        <div class="font">email：</div>
          <input type="text" v-model="email" placeholder="年龄">
      </span>
      <span class="input">
        <div class="font">地址：</div><input type="text" v-model="address" placeholder="地址">
      </span>
      <span class="input">
        <div class="font">毕业院校：</div>
        <input type="text" v-model="graduateSchool" placeholder="毕业院校">
      </span>
      <el-button type="primary" @click="addList">确定</el-button>
    </div>
  </div>
</template>

<script>
  import {requestMethod, dataMethod} from "../../../service/index"

  export default {
    name: "index",
    data() {
      return {
        name: "杨景博",
        age: "24",
        email: "517725252@qq.com ",
        address: "河北",
        graduateSchool: "河北科技大学",
        _id:"",
      }
    },
    created() {
    },
    mounted() {
      this.getUserName();
    },
    computed: {},
    methods: {
      //添加老师信息
      addList() {
        const {name, age, email, address, graduateSchool,_id} = this;
        const data = {
          name, age, email, address, graduateSchool, _id
        };
        requestMethod.addTeacher(data)
          .then(res => {
            const message = res.message;
            this.$message({
              message:message,
              type:"success"
            });
          }).catch(res => {
          this.$message.error(res)
        })
      },
      //获得用户名字
      getUserName(){
        const user=dataMethod.getLocalData("user")[0];
        this.name=user.name;
        this._id=user._id;

      }
    },
    components: {},
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "personal.styl"
</style>
