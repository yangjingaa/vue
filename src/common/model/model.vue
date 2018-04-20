<template>
    <div class="model">我是model页面
      <div class="model-box">
        <div class="head">
          <slot name="head">

          </slot>
        </div>
        <div class="content">
          <slot name="content">

          </slot>
        </div>
        <div class="footer">
          <el-button type="warning" @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "model",
        data() {
            return {}
        },
        created() {

        },
        mounted() {

        },
        computed: {},
        methods: {
          cancel(){
            this.$emit("cancel")
          },
          confirm(){
            this.$emit("confirm")
          }
        },
        components: {},
        watch: {}
    }
</script>

<style lang="stylus" scoped>
@import "./model.styl"
</style>
