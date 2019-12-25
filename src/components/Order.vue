<template>
  <div class="container">
    <div class="row">
      <div style="margin: 0 auto; margin-top: 10px; width: 950px;">
        <strong>我的订单</strong>
        <table class="table table-bordered">
          <tbody v-for="item in orders">
          <tr class="success">
            <th colspan="5">订单编号:{{item.oid}} &nbsp;&nbsp;&nbsp;{{item.state==0?"未付款":"已付款" }}</th>
          </tr>
          <tr class="warning">
            <th>图片</th>
            <th>商品</th>
            <th>价格</th>
            <th>数量</th>
            <th>小计</th>
          </tr>
            <tr v-for="cItem in item.orderItems" class="active">
              <td width="40%"><input type="hidden" name="id"
                                                value="22"> <img :src="cItem.product.pimage" width="70"
                                                                 height="60"></td>
              <td width="30%"><a target="_blank"> {{cItem.product.pname}}</a></td>
              <td width="20%">￥{{cItem.product.shopPrice}}</td>
              <td width="10%">{{cItem.count}}</td>
              <td width="15%"><span class="subtotal">￥{{cItem.subtotal}}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 分页导航区域 @size-change(pagesize改变时触发)
                        @current-change(页码发生改变时触发)
                        :current-page(设置当前页码)
                        :page-size(设置每页的数据条数)
                        :total(设置总页数) -->
    <div  style="width: 380px; margin-left: 200px; margin-top: 10px; margin-bottom: 10px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="page.num" :page-sizes="[5, 1, 2, 10]" :page-size="page.size"
                     layout="total, sizes, prev, pager, next, jumper" :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Order2",
    created() {
      this.getOrders();
    },
    data() {
      return {
        orders: [],
        page: {
          num: 1,
          size: 5,
          total: 0
        }
      }
    },
    methods: {
      async getOrders() {
        const {data} = await this.$http.get('api/order/findList/' + sessionStorage.getItem('username')
        + '/' + this.page.num + '/' + this.page.size);
        this.orders = data.queryResult.list;
        this.page.total = data.queryResult.total;
        // console.log(data);
      },
      handleSizeChange(newPageSize) {
        //pagesize改变时触发，当pagesize发生改变的时候，我们应该
        //以最新的pagesize来请求数据并展示数据
        this.page.size = newPageSize;
        this.getOrders();
      },
      handleCurrentChange(current) {
        //页码发生改变时触发当current发生改变的时候，我们应该
        //以最新的current页码来请求数据并展示数据
        this.page.num = current;
        this.getOrders();
      },
    }
  }
</script>

<style scoped>

</style>
