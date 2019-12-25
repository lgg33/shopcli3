<template>
  <div>
    <!-- 用户列表(表格)区域 -->
    <div class="cart-box" v-if="cartTable.length !== 0">
      <el-table :data="cartTable" border stripe @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.pimage" width="70" height="60">
          </template>
        </el-table-column>
        <el-table-column label="商品" prop="pname"></el-table-column>
        <el-table-column label="价格" prop="shopPrice"></el-table-column>
        <el-table-column label="数量" prop="num"></el-table-column>
        <el-table-column label="小计" prop="cartPrice"></el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size='small' title="删除" @click="deleteCart(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="cart-button">
        <p style="margin-left: 30px">
          <span>商品金额：￥<span style="color: red">{{cartTotal}}</span> 元</span>
        </p>

        <el-button @click="deleteC">清空购物车</el-button>
        <el-button type="danger" @click="toOrder">提交订单</el-button>
      </div>
    </div>
    <div class="box"  v-else>
        <el-tooltip  class="item" effect="dark" content="Top Center 提示文字" placement="top">
          <el-button type="danger" style="margin-left: 50%;transform: translate(-50%)" @click="toBuy">
            购物车为空，快去添加商品吧！
          </el-button>
        </el-tooltip>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Cart",
    data() {
      return {
        cartTable: [],
        multipleSelection: [],
        cartTotal: 0
      }
    },
    created() {
      this.getCart();
    },
    methods: {
      async getCart() {
        const {data} = await this.$http.get('api/product/getCart/' + sessionStorage.getItem('username'));
        this.cartTable = data.queryResult.list;
        // for (let i = 1;i < localStorage.length;i++) {
        //   let key = localStorage.key(i);
        //   let value = localStorage.getItem(key);
        //   this.cartTable.push(JSON.parse(value));
        // }
      },
      handleSelectionChange(value) {
        this.cartTotal = 0;
        this.multipleSelection = value;
        for (let item of this.multipleSelection) {
          this.cartTotal += item.cartPrice;
        }
      },
      async deleteCart(row) {
        await this.$http.delete('api/product/deleteCartById/' + row.id);
        this.getCart();
      },
      deleteC() {
        this.$http.delete('api/product/deleteCart/' + sessionStorage.getItem('username'));
        this.getCart();
      },
      toBuy() {
        this.$router.push('/');
      },
      async toOrder() {
        console.log(this.multipleSelection);
        const {data} = await this.$http.post('api/order/addOrder', this.multipleSelection);
        console.log(data);
        this.$store.state.orders = this.multipleSelection;
        localStorage.setItem('orders', JSON.stringify(this.multipleSelection))
        this.$store.state.cartTotal = data.total;
        localStorage.setItem('total', JSON.stringify(data.total))
        this.$store.state.oid = data.oid;
        localStorage.setItem('oid', JSON.stringify(data.oid))
        await this.$router.push({
          path: '/orderInfo',
          query: {
            username: sessionStorage.getItem('username')
          }
        });
      }
    }
  }
</script>

<style scoped>
  .cart-box {
    margin: 0 auto;
    width: 1300px;
  }

  .el-table {
    margin: 0 auto;
    width: 1200px;
  }

  .cart-button {
    float: right;
    margin-top: 30px;
    margin-right: 70px;
    margin-bottom: 50px;
  }

</style>
