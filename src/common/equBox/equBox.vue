<template>
  <div>
    <div class="box">
      <div class="ele-img">
        <img :src='image(equipmentItem.iName)' alt="">
      </div>
      <div class="content">
        <div class="calories">
          <p>{{equipmentItem.name}}</p>
        </div>
        <div class="calories">
          耗能量：{{equipmentItem.calories}}
        </div>
        <div class="message">
          {{equipmentItem.message}}
        </div>
      </div>
      <div class="button">
        <el-button type="primary" @click="showModel('reservation',equipmentItem,resDate)">预约</el-button>
        <el-button v-if="user.isAdmin===1" type="danger" icon="el-icon-delete" circle
                   @click="deleteEle(equipmentItem)"/>
        <span class="func-button">
                    <el-button v-if="user.isAdmin===1" type="primary" icon="el-icon-edit" circle
                               @click="showModel('edit',equipmentItem)"/>
                  </span>
        <span class="reservation">已预约：<span class="peo">{{equipmentItem.reserveCount}}</span>人</span>
      </div>
    </div>

  </div>
</template>

<script>
  import {sportMethod, dataMethod} from "../../service/index"
  export default {
    name: "equ-box",
    props: {
      equipmentItem: "",
      user: "",
    },
    data() {
      return {
        startTime:"",
        endTime:"",
        resDate:[]
      }
    },
    created() {
      this.getResTime();
    },
    mounted() {
    },
    computed: {},
    methods: {
      //删除设备 前 confirm 提示
      deleteEle(value) {
        this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            console.log(12346);
            this.deleteEquipment(value)
          }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      //删除设备
      deleteEquipment(value) {
        const {_id} = value;
        const data = {
          _id,
        };
        sportMethod.deleteEquipment(data)
          .then(res => {
            this.$message.success(res.message);
            this.$emit("getEquipment")
          })
          .catch(error => {
            this.$message.error(error)
          })
      },

      showModel(key, value,resDate) {
        this.$emit("showModel", key, value,resDate);
      },
      image(value) {
        return `static/image/ele-image/${value}.jpg`
      },
      getResTime(){
        const _id=this.equipmentItem._id;
        const data={
          equId:_id,
        };
        sportMethod.getResTime(data)
          .then(res=>{
            this.checkStamp(res.data);
          })
      },
      //處理時間戳
      checkStamp(data){
        const time=[];
        data.forEach(value =>{
          let obj={
            startTime:value.startTime,
            endTime:value.endTime
          };
          time.push(obj)
        });
        this.resDate=time;
      }
    },
    components: {},
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "./equBox.styl";
</style>
