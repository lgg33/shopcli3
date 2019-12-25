<template>
  <div id="app">
    <Header v-if="isRouterAlive"/>
    <router-view @rel="reload"/>
    <Footer/>
  </div>
</template>

<script>
  import Header from "common/Header";
  import Footer from "./common/Footer";

  export default {
    name: "App",
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload () {
        this.isRouterAlive = false;
        this.$nextTick(() => (this.isRouterAlive = true));
      }
    },
    components: {
      Header,
      Footer
    }
  }
</script>

<style lang="less">

</style>
