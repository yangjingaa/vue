<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
  /*background: url("./bg.png");*/
  background: rgba(233, 229, 247, 0.16);
  background-size: auto 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
