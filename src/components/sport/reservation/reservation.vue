<template>
  <div class="res-box">
    <div class="res-content" >
      <div v-if="equipment.length>0">
        <el-card shadow="hover" class="res-card" v-for="(item, index) in equipment" :key="index">
          <div class="res-list">
            <img :src="image(item.equId.iName)" alt="">
          </div>
          <div class="res-list">
            <p>名字：{{item.name}}</p>
          </div>
          <div class="res-list">
            <span>时间：</span><span>{{item.startTime|dateFilter}} - {{item.endTime|dateFilter}}</span>
          </div>
          <div class="res-list">
            <el-button @click="cancelRes(item)">取消预约</el-button>
          </div>
        </el-card>
      </div>
      <div v-else>
        <el-card class="res-no">
          <h1>您还未预约</h1>
        </el-card>
      </div>

    </div>

  </div>
</template>

<script>
  import {sportMethod, dataMethod} from "../../../service/index"
  import {StatusCode} from "../../../public/message/index"
  import Model from "../../../common/model/model"
  import equBox from "../../../common/equBox/equBox"
  export default {
    name: "reservation",
    data(){
      return{
        user:'',
        equipment:[],
      }
    },
    created() {
      this.getUser();
    },
    mounted() {
      this.getReservationEquipment();
    },
    computed: {

    },
    methods: {
      getUser() {
        const user = dataMethod.getLocalData("user")[0];
        this.user = user;
      },
      getReservationEquipment(){
        const  data={
          userId:this.user._id
        };
        sportMethod.getReservationEquipment(data)
          .then(res=>{
            this.equipment=res.data;
          })
          .catch(err=>{
            this.$message.error(err)
          })
      },
      image(value) {
        return `static/image/ele-image/${value}.jpg`
      },
      cancelRes(value) {
        this.$confirm('取消预约, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.cancelResUser(value)
          })
      },
      //取消預約
      cancelResUser(value){
        const data={
          _id:value._id,
          equId:value.equId._id
        };
        sportMethod.cancelRes(data)
          .then(res=>{
            this.$message({
              message:res.message,
              type:"success"
            });
            this.getReservationEquipment()
          })
      }
    },
    components: {
      // equBox,
      // Model
    },
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "./reservation.styl";
</style>
