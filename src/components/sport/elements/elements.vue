<template>
  <div class="ele">
    <div class="ele-top" v-if="user.isAdmin===1">
      <span class="func-button"><el-button  @click="showModel('add')">添加</el-button></span>
    </div>
    <!--content-->

    <div class="ele-detail">
      <p>健身器材分类:</p>
      <div class="list">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="有氧训练" name="hasOxygen">
            <div class="ele-box" v-for=" item in equipment" v-if="item.type==='hasOxygen'">
              <div class="ele-child">
                <equBox :equipment-item="item" :user="user" @showModel="showModel"/>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="组合力量" name="mobPower">
            <div class="ele-box" v-for=" item in equipment" v-if="item.type==='mobPower'">
              <div class="ele-child">
                <equBox :equipment-item="item" :user="user" @showModel="showModel"/>
              </div>


            </div>
          </el-tab-pane>
          <el-tab-pane label="自由力量" name="freePower">
            <div class="ele-box" v-for=" item in equipment" v-if="item.type==='freePower'">
              <div class="ele-child">
                <equBox :equipment-item="item" :user="user" @showModel="showModel"/>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="配重部分" name="weightPower">
            <div class="ele-box" v-for=" item in equipment" v-if="item.type==='freePower'">
              <div class="ele-child">
                <div class="box">
                  <div class="ele-img">
                    <img :src='image(item.iName)' alt="">
                  </div>
                  <div class="content">
                    <p>{{item.name}}</p>
                    <div class="message">
                      {{item.message}}
                    </div>
                  </div>
                  <div class="button">
                    <el-button type="primary" circle @click="showModel('reservation',item._id)">预约</el-button>
                    <el-button v-if="user.isAdmin===1" type="danger" icon="el-icon-delete" circle
                               @click="deleteEle(item)"/>
                    <span class="func-button">
                    <el-button v-if="user.isAdmin===1" type="primary" icon="el-icon-edit" circle
                               @click="showModel('edit',null,item)"/>
                  </span>
                    <span class="reservation">已预约：<span class="peo">20</span>人</span>
                  </div>
                </div>
                <equBox :equipment-item="item" :user="user" @showModel="showModel"/>
              </div>


            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!--model 显示-->

    <div v-if="modelState==='add'">
      <Model @cancel="hided" @confirm="addEquipment">
        <span slot="head">健身设备添加</span>
        <div slot="content" class="addContent">
          <div class="addInput">
            <span>名字：</span>
            <el-input v-model="equInfo.name" placeholder="名字"></el-input>
          </div>
          <div class="addInput">
            <span>照片：</span>
            <el-input v-model="equInfo.iName" placeholder="照片"></el-input>
          </div>
          <div class="addInput">
            <span>类型：</span>
            <el-select v-model="editEquInfo.type" placeholder="类型">
              <el-option
                v-for="item in eleType"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="addInput">
            <span>耗能量：</span>
            <el-input v-model="equInfo.calories" placeholder="耗能量"></el-input>
          </div>
          <div class="addInput">
            <span>使用简介：</span>
            <el-input type="textarea" v-model="equInfo.message" placeholder="使用简介"></el-input>
          </div>
        </div>
      </Model>
    </div>
    <div v-if="modelState==='reservation'">
      <Model @cancel="hided" @confirm="reservationEqu">
        <span slot="head">{{reservationInfo.name}}预约</span>
        <div slot="content" class="addContent">
          <p style="color:red">注意事项：没人每天每个设备，只能预约一次</p>
          <div class="res-time"  v-if="resDate.length>0">
            <span class="spanss">已预约时间:</span>
            <span v-for=" item in resDate">
              {{item.startTime|dateFilter(true)}} - {{item.endTime|dateFilter(true)}}
            </span>
          </div>
          <div class="addInput">
            <span>名字：</span>
            <el-input disabled v-model="reservationInfo.name" placeholder="设备名字："/>
          </div>

          <div class="addInput">
            <span>预约时间：</span>
            <el-time-select
              placeholder="起始时间"
              v-model="startTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }">
            </el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="endTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: startTime
              }">
            </el-time-select>
          </div>
        </div>
      </Model>
    </div>
    <div v-if="modelState==='edit'">
      <Model @cancel="hided" @confirm="editEquipment">
        <span slot="head">健身设备添加</span>
        <div slot="content" class="addContent">
          <div class="addInput">
            <span>名字：</span>
            <el-input v-model="editEquInfo.name"/>
          </div>
          <div class="addInput">
            <span>照片：</span>
            <el-input v-model="editEquInfo.iName"/>
          </div>
          <div class="addInput">
            <span>类型：</span>
            <el-select v-model="editEquInfo.type" placeholder="类型">
              <el-option
                v-for="item in eleType"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="addInput">
            <span>耗能量：</span>
            <el-input v-model="editEquInfo.calories"/>
          </div>
          <div class="addInput">
            <span>使用简介：</span>
            <el-input type="textarea" v-model="editEquInfo.message"/>
          </div>
        </div>
      </Model>
    </div>
    <div v-if="modelState==='delete'">
      <Model></Model>
    </div>
  </div>
</template>

<script>
  import {sportMethod, dataMethod} from "../../../service/index"
  import {StatusCode} from "../../../public/message/index"
  import Model from "../../../common/model/model"
  import equBox from "../../../common/equBox/equBox"


  export default {
    name: "elements",
    data() {
      return {
        activeName: 'hasOxygen',
        modelState: " ",
        //用户信息
        user: {},
        // 添加设备信息对象
        equInfo: {
          name: "",
          iName: "",
          calories: "",
          type: "",
          message: "",
        },
        //设备信息
        equipment: [],
        selectId: "",
        editEquInfo: {},
        reservationInfo:{
          name:"",
          _id:""
        },//预约信息
        startTime:"",
        endTime:"",
        resDate:[],
      }
    },
    created() {

    },
    mounted() {
      this.getEquipment();
      this.getUser();
    },
    computed: {
      eleType() {
        return StatusCode.ELE_TYPE;
      },

    },
    methods: {
      //table 点击改变时 发生的变化
      handleClick(tab) {
        const {name} = tab;
        this.activeName = name;
        this.getEquipment();
      },

      image(value) {
        return `../../../../static/ele-image/${value}.jpg`
      },


      //展示Model
      showModel(key, equInfo,resDate) {
        this.modelState = key;
        if (equInfo && key === "edit") {
          this.editEquInfo = {...equInfo};
        }

        if (equInfo && key === "reservation") {
          this.reservationInfo={
            name:equInfo.name,
            equId:equInfo._id
          };
          this.resDate=resDate
        }
      },

      //隐藏model
      hided() {
        this.modelState = " ";
      },

      //添加设备
      addEquipment() {
        const {equInfo, user} = this;
        const data = {
          isAdmin: user.isAdmin,
          name: equInfo.name,
          calories: equInfo.calories,
          type: equInfo.type,
          message: equInfo.message,
          iName: equInfo.iName,
        };
        sportMethod.addEquipment(data)
          .then(res => {
            this.$message({
              message: res.message,
              type: "success",
            }),
              this.getEquipment();
            this.hided();
          })
          .catch(error => {
            this.$message.error(error)
          })
      },

      //编辑设备

      editEquipment() {
        const {editEquInfo, user} = this;
        const data = {
          isAdmin: user.isAdmin,
          ...editEquInfo
        };
        sportMethod.editEquipment(data)
          .then(res => {
            this.$message({
              message: res.message,
              type: "success",
            }),
              this.getEquipment();
            this.hided();
          })
          .catch(error => {
            this.$message.error(error)
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
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getEquipment();

          })
          .catch(error => {
            this.$message.error(error)
          })
      },

      //获取设备列表
      getEquipment() {
        const data = {
          type: this.activeName,
        };
        console.log(data)
        sportMethod.getEquipment(data)
          .then(res => {
            this.equipment = res.data;
          })
          .catch(err => {
            this.$message.error(err)
          })
      },

      //获取用户
      getUser() {
        const user = dataMethod.getLocalData("user")[0];
        this.user = user;
      },

      //删除设备 前 confirm 提示
      deleteEle(value) {
        this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.deleteEquipment(value)
          }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },

      //预约设备

      reservationEqu() {
        const {reservationInfo,startTime,endTime,user,resDate} = this;
        const {equId,name}=reservationInfo;
        const data={
          userId:user._id,
          equId,
          name,
          startTime:dataMethod.getNowDate(startTime),
          endTime:dataMethod.getNowDate(endTime),
        };
        const resultTime=this.judgeTime(resDate,data.startTime,data.endTime);
        if(resultTime){
          sportMethod.addReverse(data)
            .then(res=>{
              this.$message({
                message:res.message,
                type:"success"
              });
              this.hided();
              this.getEquipment()
            })
            .catch(err=>{
              this.$message.error(err)
            })
        }else {
          this.$message.error("请选择正确预约时间")
        }

      },
      judgeTime(resDate,start,end){
        return resDate.every(value=>{
          let res=false;
          if(start>=value.endTime||end<=value.startTime){
            res=true
          }
          return res;
        })
      },
    },
    components: {
      Model: Model,
      equBox:equBox
    },
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "./element.styl"

</style>
