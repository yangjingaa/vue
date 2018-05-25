<template>
  <div class="coach">
    <div class="top">
      <el-button type="primary" icon="el-icon-edit" class="addCourse" @click="addCoachList">添加教练</el-button>
    </div>
    <div class="content">
      <div class="coach-box" v-for="(list,index) in coachList" :key=index>
        <div class="info">
          <info :coachInfo=list @change="addCoachList"></info>
        </div>
        <div class="log">
          <log></log>
        </div>
      </div>
    </div>
    <div v-if="addCoach">
      <Model @cancel="hided" @confirm="confirmAddCoach">
        <span slot="head">添加教练</span>
        <div slot="content" class="addContent">
          <div class="addInput">
            <span>名字：</span>
            <el-input v-model="coach.name" placeholder="名字"/>
          </div>
          <div class="addInput">
            <span>教练等级：</span>
            <el-select v-model="coach.gender" placeholder="等级">
              <el-option
                v-for="item in gradeType"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="addInput">
            <span>年龄：</span>
            <el-input type="number" v-model="coach.age" placeholder="年龄"/>
          </div>
          <div class="addInput">
            <span>身份证号：</span>
            <el-input type="number" v-model="coach.IDCard" placeholder="手机号"/>
          </div>
          <div class="addInput">
            <span>手机号：</span>
            <el-input type="number" v-model="coach.phoneNum" placeholder="手机号"/>
          </div>
          <div class="addInput">
            <span>介绍：</span>
            <el-input type="textarea" v-model="coach.message" placeholder="介绍"/>
          </div>
        </div>

      </Model>
    </div>


  </div>
</template>

<script>
  import {sportMethod, dataMethod} from "../../../service/index"
  import info from "./info";
  import log from "./log";
  import Model from "../../../common/model/model"
  import {StatusCode} from "../../../public/message/index"

  export default {
    name: "course",
    data() {
      return {
        addCoach: false,
        coach: {},
        coachList: []
      }
    },
    created() {
      this.getCoachSever();
    },
    mounted() {

    },
    computed: {
      gradeType() {
        return StatusCode.GRADE;
      },
    },
    methods: {
      addCoachList(value) {
        this.addCoach = true;
        if(value){
          this.coach=value;
        }
      },
      hided() {
        this.addCoach = false;
      },
      confirmAddCoach() {
        const {coach} = this;
        console.log(coach);
        const {name, age, phoneNum, message, gender, IDCard} = coach;
        if (!name || !age || !phoneNum || !message || !IDCard) {
          this.$message.error("请检查输入不可为空");
          return false;
        }
        if (!gender && gender !== 0) {
          this.$message.error("请检查输入不可为空");
          return false;
        }
        this.addCoachSever(coach)
      },
      getCoachSever() {
        sportMethod.getCoachSever()
          .then(res => {
            console.log(res.data);
            this.coachList = res.data;
          })
          .catch(err => this.$message.error(err))
      },
      addCoachSever(data) {
        sportMethod.addCoachSever(data)
          .then(res => {
            this.$message.success(res.message);
          })
          .catch(err => this.$message.error(err))
      },
      image(value) {
        return `static/image/ele-image/${value}.jpg`
      }
    },
    components: {
      info, log, Model
    },
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "coach.styl"
</style>
