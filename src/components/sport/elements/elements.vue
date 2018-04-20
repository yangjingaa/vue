<template>
  <div class="ele">
    <p>器材展示：名字，图片，适合人群， 使用人数，</p>
    <div class="ele-top">
      <span class="func-button"><el-button @click="showModel('delete')">删除</el-button></span>
      <span class="func-button"><el-button @click="showModel('edit')">编辑</el-button></span>
      <span class="func-button"><el-button @click="showModel('add')">添加</el-button></span>
    </div>
    <div class="ele-detail">
      <p>健身器材分类:</p>
      <div class="list">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="有氧训练" name="hasOxygen">
            <div class="ele-box">
              <div class="ele-child" v-for=" item in equipment">
                <div class="box">
                  <div class="ele-img">
                    <img src="../../../../static/ele-image/treadmill.jpg" alt="">
                  </div>
                  <div class="content">
                    <p>{{item.name}}</p>
                    <div class="message">
                      {{item.message}}
                    </div>
                  </div>
                  <div class="button">
                    <el-button @click="showModel('reservation',item._id)">预约</el-button>
                    <span class="reservation">已预约：<span class="peo">20</span>人</span>
                  </div>
                </div>

              </div>
              <div class="ele-child">
                <div class="box">
                  <div class="ele-img">
                    <img src="../../../../static/ele-image/treadmill.jpg" alt="">
                  </div>
                  <div class="content">
                    <p>跑步机</p>
                    <div class="message">
                      我是一个跑步机的介绍
                    </div>
                  </div>
                  <div class="button">
                    <el-button @click="showModel('reservation')">预约</el-button>
                    <span class="reservation">已预约：<span class="peo">20</span>人</span>
                  </div>
                </div>

              </div>
              <div class="ele-child">
                <div class="box">
                  <div class="ele-img">
                    <img src="../../../../static/ele-image/treadmill.jpg" alt="">
                  </div>
                  <div class="content">
                    <p>跑步机</p>
                    <div class="message">
                      我是一个跑步机的介绍
                    </div>
                  </div>
                  <div class="button">
                    <el-button @click="showModel('reservation')">预约</el-button>
                    <span class="reservation">已预约：<span class="peo">20</span>人</span>
                  </div>
                </div>

              </div>
              <div class="ele-child">
                <div class="box">
                  <div class="ele-img">
                    <img src="../../../../static/ele-image/treadmill.jpg" alt="">
                  </div>
                  <div class="content">
                    <p>跑步机</p>
                    <div class="message">
                      我是一个跑步机的介绍
                    </div>
                  </div>
                  <div class="button">
                    <el-button @click="showModel('reservation')">预约</el-button>
                    <span class="reservation">已预约：<span class="peo">20</span>人</span>
                  </div>
                </div>

              </div>
              <div class="ele-child">
                <div class="box">
                  <div class="ele-img">
                    <img src="../../../../static/ele-image/treadmill.jpg" alt="">
                  </div>
                  <div class="content">
                    <p>跑步机</p>
                    <div class="message">
                      我是一个跑步机的介绍
                    </div>
                  </div>
                  <div class="button">
                    <el-button @click="showModel('reservation')">预约</el-button>
                    <span class="reservation">已预约：<span class="peo">20</span>人</span>
                  </div>
                </div>

              </div>

            </div>
          </el-tab-pane>
          <el-tab-pane label="组合力量" name="mobPower">组合力量</el-tab-pane>
          <el-tab-pane label="自由力量" name="freePower">自由力量</el-tab-pane>
          <el-tab-pane label="配重部分" name="weightPower">配重部分</el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div v-if="modelState==='add'">
      <Model @cancel="hided" @confirm="addEquipment">
        <span slot="head">健身设备添加</span>
        <div slot="content" class="addContent">
          <div class="addInput">
            <span>名字：</span>
            <el-input v-model="equInfo.name"></el-input>
          </div>
          <div class="addInput">
            <span>照片：</span>
            <el-input v-model="equInfo.iName"></el-input>
          </div>
          <div class="addInput">
            <span>类型：</span>
            <el-input v-model="equInfo.type"></el-input>
          </div>
          <div class="addInput">
            <span>耗能量：</span>
            <el-input v-model="equInfo.calories"></el-input>
          </div>
          <div class="addInput">
            <span>使用简介：</span>
            <el-input type="textarea" v-model="equInfo.message"></el-input>
          </div>
        </div>
      </Model>
    </div>
    <div v-if="modelState==='reservation'">
      <Model></Model>
    </div>
    <div v-if="modelState==='edit'">
      <Model></Model>
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

  export default {
    name: "elements",
    data() {
      return {
        activeName: 'hasOxygen',
        modelState: " ",
        // 添加设备信息对象
        equInfo: {
          name: "跑步车",
          iName:"treadmill",
          calories: "10",
          type: "hasOxygen",
          message: "我是一堆介绍",
        },
        //设备信息
        equipment:[],
        selectId:""
      }
    },
    created() {

    },
    mounted() {
      this.getEquipment()
    },
    computed: {
      eleType(){
        return StatusCode;
      },
      image(value){
        return `../../../../static/ele-image/${value}.jpg`
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      showModel(key,id) {
        this.modelState = key;
        if(id){
          this.selectId=id;
        }
      },
      hided() {
        this.modelState = " ";
      },
      //添加设备
      addEquipment() {
        const {equInfo} = this;
        const data = {
          name: equInfo.name,
          calories: equInfo.calories,
          type: equInfo.type,
          message: equInfo.message,
          iName:equInfo.iName,
        };
        sportMethod.addEquipment(data)
          .then(res => {
            this.$message({
              message: res.message,
              type: "success",
            }),
              this.hided();
          })
          .catch(error => {
            this.$message.error(error)
          })
      },
      //获取设备列表
      getEquipment(){
        sportMethod.getEquipment()
          .then(res=>{
            this.equipment=res.data;
          })
          .catch(err=>{
            this.$message.error(err)
          })
      }
    },
    components: {
      Model: Model,
    },
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "./element.styl"
</style>
