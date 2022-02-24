<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <CmdCmd/>
</template>

<script>
import CmdCmd from './components/Cmd.vue'

export default {
  name: 'App',
  components: {
    CmdCmd
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  height: 100px;
  width: 100px;
}
</style>
