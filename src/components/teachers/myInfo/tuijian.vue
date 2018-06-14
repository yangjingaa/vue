<template>
  <div class="personal-main">
    <div class="left">
      <div class="top">
        <!-- <h1>{{$t("message.personalInfo.titie")}}</h1> -->
        <h1>教师推荐</h1>
      </div>
      <div class="writeInfo">
        <span class="input">
          <div class="font">用户名</div>
          <el-input v-model="tuijianData.userName" placeholder="用户名" />
        </span>
        <span class="input">
          <div class="font">{{$t("message.personalInfo.age")}}</div>
          <el-input v-model="tuijianData.age" placeholder="年龄" />
        </span>
        <span class="input">
          <div class="font">{{$t("message.personalInfo.email")}}</div>
          <el-input type="text" v-model="tuijianData.email" placeholder="email" />
        </span>
        <span class="input">
          <div class="font">{{$t("message.personalInfo.adress")}}</div>
          <el-input type="text" v-model="tuijianData.address" placeholder="地址" />
        </span>
        <span class="input">
          <div class="font">{{$t("message.personalInfo.graduateSchool")}}</div>
          <el-input type="text" v-model="tuijianData.graduateSchool" placeholder="毕业院校" />
        </span>
        <span class="input">
          <!-- <div class="font">{{$t("message.personalInfo.graduateSchool")}}</div> -->
          <div class="font">推荐理由</div>
          <el-input type="textarea" v-model="tuijianData.liyou" placeholder="推荐理由" />
        </span>
        <div>
          <el-button type="primary" @click="addList">{{$t("message.determine")}}</el-button>
        </div>
      </div>
    </div>
    <div class="table">
      <p class="record">推荐记录:</p>
      <el-table :data="tuijianList" style="width: 100%">
        <!-- <el-table-column prop="name" label="推荐老师">
          <template slot-scope="scope">
            {{scope.row.tuijian.name}}
          </template> -->
        <!-- </el-table-column> -->
        <el-table-column prop="time" width="150px" label="推荐时间">
          <template slot-scope="scope">
            {{scope.row.time|dateFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="老师名字"></el-table-column>
        <el-table-column prop="email" label="email" width="200"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>

        <el-table-column prop="graduateSchool" width="150px" label="学校"></el-table-column>
        <el-table-column prop="address" width="150px" label="地址"></el-table-column>
        <el-table-column label="审核状态">
          <template slot-scope="scope">
            {{scope.row.state|tuijian}}
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>

</template>

<script>
import { requestMethod, dataMethod } from "../../../service/index";
export default {
    name: "tuijian",
    data() {
        return {
            tuijianData: {},
            tuijianList:[],
        };
    },
    created() {
    },
    mounted() {
      this.getTuijianList()

    },
    computed: {},
    methods: {
        addList() {
            const { tuijianData } = this;
            tuijianData.tuijian = this.userinfo._id;
            requestMethod
                .tuijianTeacher(tuijianData)
                .then(result => {
                    this.$message.success(result.message);
                    this.getTuijianList();
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        getTuijianList(){
          let finfQuery={
            tuijian:this.userinfo._id
          };
          requestMethod.getTuiJianTeacher(finfQuery)
          .then((result) => {
            this.tuijianList=result.data;
          }).catch((err) => {
            this.$message.error(err)
          });
        }
    },
    components: {},
    watch: {}
};
</script>

<style lang="stylus" scoped>
@import './index.styl';
</style>
