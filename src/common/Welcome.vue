<template>
    <div>
      <el-card>
        <h2>欢迎您！激活信息已发送至您的邮箱，请完成激活后<a href="" @click="toLogin">登录</a> </h2>
      </el-card>
    </div>
</template>

<script>
  export default {
    name: "Welcome",
    methods: {
      toLogin() {
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>
  .el-card {
    display: flex;
    margin: 0 auto;
    height: 120px;
    width: 1000px;
    align-items: center;
  }

</style>
