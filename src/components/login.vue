<template>
<div>
  <h1>sdaasdadsasda</h1>
  <button @click="b(10)">promisec</button>
</div>
</template>

<script>
    export default {
        name: "login",
      data(){
          return{
            na:true
          }
      },
        methods:{
          childInfo:function () {
            console.log("我是子类")
          },
          p:function (value) {
            console.log(value );
            let that=this;
            return new Promise(function (resolve, reject) {
                if(that.na){
                  resolve(that.na)
                }else {
                  reject()
                }
            })
          },
          b:function (value) {
            let that=this;
            let a =this.p(value).then(function (value) {
              console.log(100);
              let s=Symbol(10);
              console.log(s)
              that.na=false;
            }).catch(function () {
              console.log("false");

            })
          }
        }
    }
</script>

<style scoped>

</style>
