<template>
  <div class="container">
    <div class="row">
      <div
        style="border: 1px solid #e4e4e4; width: 930px; margin-bottom: 10px; margin: 0 auto; padding: 10px; margin-bottom: 10px;">
        <a href="./index.htm">
          首页&nbsp;&nbsp;&gt;
        </a>
        <a @click="backList" style="cursor: pointer">
        {{product.cname}}&nbsp;&nbsp;&gt;
        </a>
        <a>
          {{product.pname}}
        </a>
      </div>

      <div style="margin: 0 auto; width: 950px;">
        <div class="col-md-6">
          <img style="opacity: 1; width: 400px; height: 350px;" title=""
               class="medium"
               :src="product.pimage">
        </div>

        <div class="col-md-6" style="margin-top: 20px">
          <div>
            <strong>{{product.pname}}</strong>
          </div>
          <div
            style="border-bottom: 1px dotted #dddddd; width: 350px; margin: 10px 0 10px 0;">
            <div>编号：{{product.pid }}</div>
          </div>

          <div style="margin: 10px 0 10px 0;">
            亿家价: <strong style="color: #ef0101;">￥：{{product.shopPrice }}元/件</strong> 参 考 价：
            <del>{{product.market_price}}元/件</del>
          </div>

          <div style="margin: 10px 0 10px 0;">
            促销: <a target="_blank" title="限时抢购 (2014-07-30 ~ 2015-01-01)"
                   style="background-color: #f07373;">限时抢购</a>
          </div>

          <div
            style="padding: 10px; border: 1px solid #e7dbb1; width: 330px; margin: 15px 0 10px 0;; background-color: #fffee6;">
            <div style="margin: 5px 0 10px 0;">白色</div>

            <div
              style="border-bottom: 1px solid #faeac7; margin-top: 20px; padding-left: 10px;">
              <el-form>

                <el-form-item label="购买数量:" style="height: 40px">
                  <el-button type="danger" size="mini" style="font-size: 20px;margin-right: 10px" @click="decr">-</el-button>
                  <el-input v-model="num" style="width: 50px; height: 200px; position: relative; bottom: 2px"></el-input>
                  <el-button type="danger" size="mini" style="font-size: 20px;margin-left: 10px" @click="add">+</el-button>
                </el-form-item>
                <el-form-item>
                  <div style="margin: 20px 0 10px 0; text-align: center;">
                    <el-button type="danger" @click="addCart">加入购物车</el-button>&nbsp;收藏商品
                  </div>
                </el-form-item>
                <el-form-item>
                  <!-- 返回 -->
                  <div>
                    <a @click="backList" style="cursor: pointer">返回商品列表</a>
                  </div>
                </el-form-item>

              </el-form>
            </div>


          </div>

        </div>
      </div>
      <div class="clear"></div>
      <div style="width: 950px; margin: 0 auto;">
        <div
          style="background-color: #d3d3d3; width: 930px; padding: 10px 10px; margin: 10px 0 10px 0;">
          <strong>商品介绍</strong>
        </div>

        <div>
          <img :src="product.pimage">
        </div>

        <div
          style="background-color: #d3d3d3; width: 930px; padding: 10px 10px; margin: 10px 0 10px 0;">
          <strong>商品参数</strong>
        </div>
        <div style="margin-top: 10px; width: 900px;">
          <table class="table table-bordered">
            <tbody>
            <tr class="active">
              <th colspan="2">基本参数</th>
            </tr>
            <tr>
              <th width="10%">级别</th>
              <td width="30%">标准</td>
            </tr>
            <tr>
              <th width="10%">标重</th>
              <td>500</td>
            </tr>
            <tr>
              <th width="10%">浮动</th>
              <td>200</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div style="background-color: #d3d3d3; width: 900px;">
          <table class="table table-bordered">
            <tbody>
            <tr class="active">
              <th><strong>商品评论</strong></th>
            </tr>
            <tr class="warning">
              <th>暂无商品评论信息 <a>[发表商品评论]</a></th>
            </tr>
            </tbody>
          </table>
        </div>

        <div style="background-color: #d3d3d3; width: 900px;">
          <table class="table table-bordered">
            <tbody>
            <tr class="active">
              <th><strong>商品咨询</strong></th>
            </tr>
            <tr class="warning">
              <th>暂无商品咨询信息 <a>[发表商品咨询]</a></th>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "ProductDetail",
    created() {
      this.product = this.$route.query;
      this.getRecords();
    },
    data() {
      return {
        product: {},
        num: 1,
      }
    },
    methods: {
      backList() {
        this.$router.push({
          path: '/productList',
          query: {
            cid: this.product.cid
          }
        });
      },
      add() {
        this.num++;
      },
      decr() {
        if (this.num <= 1) return;
        this.num--;
      },
      async addCart() {
        let username = sessionStorage.getItem('username');
        // console.log(item === null);
        if (username === null) return this.$router.push('/login');
        let pars = this.product;
        pars.num = this.num;
        pars.cartPrice = this.num * pars.shoPrice;
        pars.uname = username;
        await this.$http.post('api/product/addCart', pars);
        await this.$router.push('/cart');
      },
      //获取浏览记录
      getRecords() {
        //初始化state中的records数组。当从localStorage中获取为null时，初始为空数组[]
        this.$store.commit('initRecords');
        // console.log(this.$store.state.records);
        //records中只存放7个元素
        if (this.$store.state.records.length < 7) {
          //过滤数组，当添加的商品包含在其中时移除该商品
          this.$store.state.records = this.$store.state.records.filter((item) => item.pid !== this.product.pid);
          //添加该商品到数组首位
          this.$store.state.records.unshift(this.product);
          // console.log(this.$store.state.records);
          //从localStorage中存放数据，解决刷新界面时，vuex中的数据丢失。
          localStorage.setItem('info', JSON.stringify(this.$store.state.records));
          // console.log(this.$store.state.records);
        }else {
          this.$store.state.records = this.$store.state.records.filter((item) => item.pid !== this.product.pid);
          //有7个元素时从尾部移除一个元素，否则不移除
          if (this.$store.state.records.length === 7) {
            this.$store.state.records.pop();
          }
          this.$store.state.records.unshift(this.product);
          // console.log(this.$store.state.records);
          localStorage.setItem('info', JSON.stringify(this.$store.state.records));
        }
      }
    }
  }
</script>

<style scoped>


</style>
