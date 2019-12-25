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
          <li><a style="cursor: pointer" @click="toCart">购物车</a></li>
          <li><a style="cursor: pointer" @click="toOrder">我的订单</a></li>
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
            <div class="navbar-form navbar-right" role="search">
              <div class="form-group">
                <input type="text" v-model="keyWord" class="form-control" placeholder="Search">
              </div>
              <button class="btn btn-default" @click="toSearch">搜索</button>
            </div>
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
        username: sessionStorage.getItem('username'),
        keyWord: ''
      }
    },
    created() {
      // let sName = window.sessionStorage.getItem('username');
      // // console.log(sName);
      // this.username = sName;
      this.getCategories();
    },
    mounted() {
      // window.location.reload();
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
      },
      toCart() {
        this.$router.push('/cart')
      },
      toOrder() {
        this.$router.push('/order')
      },
      toSearch() {
        this.$router.push({
          path: '/search',
          query: {
            key: this.keyWord
          }
        })
      }
    },
    // watch: {
    //   'username': {
    //     handler() {
    //       console.log('123');
    //       this.$router.push('/');
    //     }
    //   }
    // }
  }
</script>

<style scoped>

</style>
