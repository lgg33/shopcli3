<template>
  <div>
    <!-- 用户列表(表格)区域 -->
    <el-table :data="cartTable" border stripe>
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
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <!-- 删除 -->
          <el-button type="danger" icon="el-icon-delete" size='small' title="删除" @click="deleteCart(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "Cart",
    data() {
      return {
        cartTable: []
      }
    },
    created() {
      this.getCart();
    },
    methods: {
      deleteCart(row) {
        console.log(row);
      },
      async getCart() {
        const {data} = await this.$http.get('api/product/getCart/' + sessionStorage.getItem('username'));
        this.cartTable = data.queryResult.list;
        // for (let i = 1;i < localStorage.length;i++) {
        //   let key = localStorage.key(i);
        //   let value = localStorage.getItem(key);
        //   this.cartTable.push(JSON.parse(value));
        // }
      }
    }
  }
</script>

<style scoped>
  .el-table {
    margin: 0 auto;
    width: 1200px;
  }

</style>
