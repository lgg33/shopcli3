<template>
  <div class="container-fluid">

    <!-- 引入header.jsp -->
<!--    <jsp:include page="/header.jsp"></jsp:include>-->

    <!-- 轮播图 -->
    <div class="container-fluid">
      <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        <!-- 轮播图的中的小点 -->
        <ol class="carousel-indicators">
          <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
          <li data-target="#carousel-example-generic" data-slide-to="1"></li>
          <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        </ol>
        <!-- 轮播图的轮播图片 -->
        <div class="carousel-inner" role="listbox">
          <div class="item active">
            <img src="~assets/img/1.jpg">
            <div class="carousel-caption">
              <!-- 轮播图上的文字 -->
            </div>
          </div>
          <div class="item">
            <img src="~assets/img/2.jpg">
            <div class="carousel-caption">
              <!-- 轮播图上的文字 -->
            </div>
          </div>
          <div class="item">
            <img src="~assets/img/3.jpg">
            <div class="carousel-caption">
              <!-- 轮播图上的文字 -->
            </div>
          </div>
        </div>

        <!-- 上一张 下一张按钮 -->
        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>

    <!-- 热门商品 -->
    <div class="container-fluid">
      <div class="col-md-12">
        <h2>热门商品&nbsp;&nbsp;<img src="~assets/img/title2.jpg"/></h2>
      </div>
      <div class="col-md-2" style="border:1px solid #E7E7E7;border-right:0;padding:0;">
        <img src="~assets/products/hao/big01.jpg" width="205" height="404" style="display: inline-block;"/>
      </div>
      <div class="col-md-10">
        <div class="col-md-6" style="text-align:center;height:200px;padding:0px;">
          <a href="">
            <img src="~assets/products/hao/middle01.jpg" width="516px" height="200px" style="display: inline-block;">
          </a>
        </div>


        <div class="col-md-2" v-for="item in hotProduct" style="text-align:center;height:200px;padding:10px 0px;">
          <a style="cursor: pointer" @click="toDetail(item)">
            <img :src="item.pimage" width="130" height="130" style="display: inline-block;">
          </a>
          <p><a @click="toDetail(item)" style='color:#666;cursor: pointer'>{{item.pname}}</a></p>
          <p><font color="#E4393C" style="font-size:16px">{{item.shopPrice}}</font></p>
        </div>
      </div>
    </div>

    <!-- 广告条 -->
    <div class="container-fluid">
      <img src="~assets/products/hao/ad.jpg" width="100%"/>
    </div>

    <!-- 最新商品 -->
    <div class="container-fluid">
      <div class="col-md-12">
        <h2>最新商品&nbsp;&nbsp;<img src="~assets/img/title2.jpg"/></h2>
      </div>
      <div class="col-md-2" style="border:1px solid #E7E7E7;border-right:0;padding:0;">
        <img src="~assets/products/hao/big01.jpg" width="205" height="404" style="display: inline-block;"/>
      </div>
      <div class="col-md-10">
        <div class="col-md-6" style="text-align:center;height:200px;padding:0px;">
          <a href="">
            <img src="~assets/products/hao/middle01.jpg" width="516px" height="200px" style="display: inline-block;">
          </a>
        </div>

        <div class="col-md-2" v-for="item in newProduct" style="text-align:center;height:200px;padding:10px 0px;">
          <a style="cursor: pointer" @click="toDetail(item)">
            <img :src="item.pimage" width="130" height="130" style="display: inline-block;">
          </a>
          <p><a @click="toDetail(item)" style='color:#666;cursor: pointer'>{{item.pname}}</a></p>
          <p><font color="#E4393C" style="font-size:16px">{{item.shopPrice}}</font></p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        hotProduct: [],
        newProduct: [],
      }
    },
    created() {
      this.$emit('rel');
      this.getHotProduct();
      this.getNewProduct();
    },
    methods: {
      async getHotProduct() {
        const {data} = await this.$http.get('api/product/hotProduct');
        this.hotProduct = data.queryResult.list;
      },
      async getNewProduct() {
        const {data} = await this.$http.get('api/product/newProduct');
        this.newProduct = data.queryResult.list;
      },
      async toDetail(item) {
        console.log(item);
        const {data} = await this.$http.get('api/category/findById/' + item.cid);
        // console.log(data);
        item.cname = data.cname;
        await this.$router.push({
          path: '/productDetail',
          query: item
        });
      }
    }
  }
</script>

<style scoped>

</style>
