<template>
  <div class="personal-main">
    <div class="top">
      <h1>{{$t("message.personalInfo.titie")}}</h1>
    </div>
    <div class="writeInfo">
      <span class="input">
        <div class="font">{{$t("message.personalInfo.name")}}</div>
        <el-input disabled v-model="userinfo.name" placeholder="名字" />
      </span>
      <span class="input">
        <div class="font" style="color:red">{{$t("message.personalInfo.IdentityType")}}</div>
        <el-input type="text" disabled v-model="identity" placeholder="身份类型" />
      </span>
      <span class="input">
        <div class="font">{{$t("message.personalInfo.age")}}</div>
        <el-input v-model="teacherInfo.age" placeholder="年龄" />
      </span>
      <span class="input">
        <div class="font">{{$t("message.personalInfo.email")}}</div>
        <el-input type="text" v-model="teacherInfo.email" placeholder="email" />
      </span>
      <span class="input">
        <div class="font">{{$t("message.personalInfo.adress")}}</div>
        <el-input type="text" v-model="teacherInfo.address" placeholder="地址" />
      </span>
      <span class="input">
        <div class="font">{{$t("message.personalInfo.graduateSchool")}}</div>
        <el-input type="text" v-model="teacherInfo.graduateSchool" placeholder="毕业院校" />
      </span>

      <div>
        <el-button type="primary" @click="addList">{{$t("message.determine")}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { requestMethod, dataMethod } from "../../../service/index";

export default {
    data() {
        return {
            teacherInfo: {}
        };
    },
    created() {},
    mounted() {
        this.getUserName();
    },
    computed: {
        identity() {
            if (!this.userIsTeacher()) {
                return this.$t("message.Tourists");
            } else {
                return this.$t("message.teacher");
            }
        }
    },
    methods: {
        //添加老师信息
        addList() {
            const {age,email,address,graduateSchool} = this.teacherInfo;
            const data = {
                age,
                email,
                address,
                graduateSchool,
                _id: this.userinfo._id,
                name:this.userinfo.name
            };
            requestMethod
                .addTeacher(data)
                .then(res => {
                    const message = res.message;
                    this.$message({
                        message: message,
                        type: "success"
                    });
                })
                .catch(res => {
                    this.$message.error(res);
                });
        },
        //获得用户名字
        getUserName() {
            const data = {
                _id: this.userinfo._id
            };
            requestMethod
                .getTeacherList(data)
                .then(res => {
                    if (res.data.length > 0) {
                        this.teacherInfo = res.data[0];
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        }
    },
    components: {},
    watch: {}
};
</script>

<style lang="stylus" scoped>
@import 'personal.styl';
</style>
