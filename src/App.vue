<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
  import Header from "common/Header";
  import Footer from "./common/Footer";

  export default {
    name: "App",
    components: {
      Header,
      Footer
    }
  }
</script>

<style lang="less">

</style>
