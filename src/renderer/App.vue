<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "fe-bimo",
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  // font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,monospace;
  // font-family: monospace;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;


  #app {
    width: 100%;
    height: 100%;
  }
}
</style>
