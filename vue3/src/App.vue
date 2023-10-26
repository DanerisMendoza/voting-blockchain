<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <ionic />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ionic from './components/ionic.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,ionic
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
</style>
