<template>
  <div class="card-box">
    <div class="card-top">
      <el-button type="danger" v-if="power" @click="showModel('add')">添加</el-button>
    </div>
    <div class="card-content" v-if="cardInfo">
      <el-tabs type="border-card" class="border-card" v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane name="all" label="全部会员卡">
          <div class="card-item" v-for="item in cardInfo">
            <div class="image">
              <img :src='cardImage(item.iName)' alt="">
              <div class="price">
                名字：{{item.name}}
              </div>
              <div class="price">
                优惠：{{item.discount}}/年
              </div>
              <div class="price">
                价格：<span>{{item.price}}</span>/年
              </div>
              <div class="message">
                介绍：{{item.message}}
              </div>
            </div>

            <div class="button">
              <el-button type="primary" plain @click="showModel('add',item)"><i class="el-icon-edit"></i>{{cardEditInfo}}</el-button>
              <el-button type="primary" @click="buyCards(item)">购买</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="my" label="我的会员卡">
          <div class="card-item" v-for="item in cardInfo">
            <div class="image">
              <img :src='cardImage(item.iName)' alt="">
              <div class="price">
                名字：{{item.name}}
              </div>
              <div class="price">
                优惠：{{item.discount}}/年
              </div>
              <div class="price">
                价格：<span>{{item.price}}</span>/年
              </div>
              <div class="message">
                介绍：{{item.message}}
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>




    <div class="card-model" v-if="modelState==='add'">
      <Model @cancel="hided" @confirm="VipCard">
        <span slot="head">{{cardEditName}}</span>
        <div slot="content">
          <div class="addCent">
            <div class="addInput">
              <span>名字：</span>
              <el-input v-model="editCard.name" placeholder="名字"/>
            </div>
            <div class="addInput">
              <span>价格：</span>
              <el-input v-model="editCard.price" placeholder="价格/年"/>
            </div>
            <div class="addInput">
              <span>优惠：</span>
              <el-input type="number" v-model="editCard.discount" placeholder="优惠金额/年"/>
            </div>
            <div class="addInput">
              <span>图片背景：</span>
              <el-input type="text" v-model="editCard.iName" placeholder="图片背景"/>
            </div>
            <div class="addInput">
              <span>使用简介：</span>
              <el-input type="textarea" v-model="editCard.message" placeholder="使用简介"/>
            </div>
          </div>
        </div>
      </Model>
    </div>

  </div>

</template>

<script>
  import {sportMethod, dataMethod} from "../../../service/index"
  import Model from "../../../common/model/model"

  export default {
    name: "reservation",
    data() {
      return {
        user: {},
        modelState: "",
        editCard: {},
        cardInfo: [],
        edit: false,
        activeName:"all"
      }
    },
    created() {
      this.getUser();
      this.getCard();
    },
    mounted() {
    },
    computed: {
      cardEditName() {
        let name ="会员卡添加";
        if(this.edit&&this.user.isAdmin===1){
          name="会员卡编辑";
        }else if(this.edit&&this.user.isAdmin!==1){
          name="会员卡查看"
        }
        return name
      },
      cardEditInfo() {
        return this.user.isAdmin===1 ? "编辑" : "查看";
      },
      power() {
        return this.user.isAdmin===1
      },
    },
    methods: {
      cardImage(value) {
        return `static/image/card/${value}.png`

      },
      //切换tables
      handleClick(){
        this.getCard()
      },
      //获取用户
      getUser() {
        const user = dataMethod.getLocalData("user")[0];
        this.user = user;
      },
      //获取会员卡
      getCard() {
        const {activeName,user}=this;
        const id=user.vipCard.length>0?user.vipCard:123;
        let data={};
        if(activeName==="my"&&user){
          data={
            _id:id,
          }
        }
        sportMethod.getCard(data)
          .then(res => {
            this.cardInfo = res.data;
          })
          .catch(err => {
            this.$message.error(err)
          })
      },
      //添加 编辑 会员卡
      VipCard() {
        const {user, editCard, edit} = this;
        const data = {
          isAdmin: user.isAdmin,
          ...editCard,
          id:editCard._id

        };
        if(user.isAdmin!==1){
          this.hided();
          return ;
        }
        console.log(data);
        if (edit) {
          this.updateCard(data);
        } else {
          this.addVipCard(data)
        }

      },

      //添加会员卡
      addVipCard(data) {
        sportMethod.addVipCard(data)
          .then(res => {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.getCard();
            this.hided()
          })
          .catch(err => {
            this.$message.error(err)
          })
      },
      //更新会员卡
      updateCard(data) {
        sportMethod.updateCard(data)
          .then(res => {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.getCard();
            this.hided()
          })
          .catch(err => {
            this.$message.error(err)
          })
      },

      //购买会员卡
      buyCards(value) {
        this.$confirm('确定购买会员卡?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.buyCard(value)
          })
          .catch(()=>{
            return
          })
      },

      buyCard(value){
        const {user}=this;
        const data={
          _id:user._id,
          vipCard:value._id
        };
        sportMethod.buyCards(data)
          .then(res=>{
            this.$message({
              message: res.message,
              type: "success"
            });
            this.getUserInfo(user._id)
          })
          .catch(err=>{
            this.$message.error(err)
          })
      },

      getUserInfo(_id){
        const data={
          _id
        };
        sportMethod.getUserInfo(data)
          .then(res=>{
            this.user=res.data[0];
            dataMethod.setLocalData("user", res.data);
          })
          .catch(err=>{
            this.$message.error(err)
          })
      },

      //隐藏model
      hided() {
        this.modelState = " ";
      },
      showModel(value, info) {
        this.modelState = value;
        if (value === "add" && info) {
          this.editCard = {...info};
          this.edit = true
        } else if (value === "add" && !info) {
          this.editCard = {};
          this.edit = false
        }
      },
    },
    components: {
      Model: Model
    },
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  @import "./vipCard.styl";
</style>
