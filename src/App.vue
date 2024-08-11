<template>
  <TopNavbarComp/>
  <div style="margin-top: 70px;">
    <router-view></router-view>
  </div>
</template>

<script>
import TopNavbarComp from './components/TopNavbarComp.vue';
export default {
  name: 'App',
  components: {
    TopNavbarComp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 10px;
}
body{
  background-color: #ffffff;
}
</style>
