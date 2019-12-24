<template>
  <div>
    <div class="container-fluid">
      <div class="col-md-4">
        <img src="~assets/img/logo2.png" />
      </div>
      <div class="col-md-5">
        <img src="~assets/img/header.png" />
      </div>
      <div class="col-md-3" style="padding-top:20px">
        <ol  class="list-inline">
          <!--
            判断user 是否为空  。
           -->
          <li v-if="username"><a href="" @click="toLogin">{{username}}</a></li>
          <li v-else><a href="" @click="toLogin">登录</a></li>
          <li v-if="username"><a href="" @click="toLogout">注销</a></li>
          <li v-else><a href="" @click="toRegister">注册</a></li>
          <li><a href="cart.jsp">购物车</a></li>
          <li><a href="order_list.jsp">我的订单</a></li>
        </ol>

      </div>
    </div>

    <!-- 导航条 -->
    <div class="container-fluid">
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">首页</a>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <!--<li @click="findByCategory(item.cid)" v-for="item in categories">{{item.cname}}</li>-->
              <li v-for="item in categories" @click="findByCategory(item.cid)" style="cursor: pointer"><a>{{item.cname}}</a></li>
<!--              <li class="active"><a href="${root}/ProductServlet?state=queryAll">手机数码<span class="sr-only">(current)</span></a></li>-->
<!--              <li><a href="#">电脑办公</a></li>-->
<!--              <li><a href="#">电脑办公</a></li>-->
<!--              <li><a href="#">电脑办公</a></li>-->
            </ul>
            <form class="navbar-form navbar-right" role="search">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Search">
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  </div>

</template>


<script>
  export default {
    name: "Header",
    data() {
      return {
        categories: [],
        username: null
      }
    },
    created() {
      this.getCategories();
      let sName = window.sessionStorage.getItem('username');
      // console.log(sName);
      this.username = sName;
    },
    methods: {
      //前往登录页
      toLogin() {
        this.$router.push('/login');
      },
      //前往注册页
      toRegister() {
        this.$router.push('/register');
      },
      //注销登录
      toLogout() {
        window.sessionStorage.clear();
        this.$router.push('/login');
      },
      //获取商品种类
      async getCategories() {
        let {data} = await this.$http.get("api/category/findAll");
        this.categories = data.queryResult.list;
      },
      //根据种类查询商品
      findByCategory(cid) {
        // console.log(cid);
        this.$router.push({
          path: '/productList',
          query: {
            cid
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
