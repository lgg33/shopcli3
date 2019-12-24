<template>
    <div class="row" style="width: 1210px; margin: 0 auto;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="20">
        <el-col v-for="item in products" :span="6">
          <div style="height:250px; margin-top: 50px;">
            <a style="cursor: pointer" @click="productDetail(item)">
              <img :src="item.pimage" width="170" height="170" style="display: inline-block;">
            </a>
            <p>
              <a style='color: green;cursor: pointer;' @click="productDetail(item)">
                {{item.pname}}
              </a>
            </p>
            <p>
              <span style="color: red">商城价：&yen;{{item.shopPrice}}</span>
            </p>
          </div>
        </el-col>
      </el-row>

      <!-- 分页导航区域 @size-change(pagesize改变时触发)
                        @current-change(页码发生改变时触发)
                        :current-page(设置当前页码)
                        :page-size(设置每页的数据条数)
                        :total(设置总页数) -->
      <div  style="width: 380px; margin-left: 200px; margin-top: 10px; margin-bottom: 10px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="params.page" :page-sizes="[3, 1, 2, 5, 10]" :page-size="params.size"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

      <div
        style="width: 1210px; margin: 0 auto; padding: 0 9px; border: 1px solid #ddd; border-top: 2px solid #999; height: 246px;">

        <h4 style="width: 50%; float: left; font: 14px/30px 微软雅黑">浏览记录</h4>
        <div style="width: 50%; float: right; text-align: right;">
          <a href="">more</a>
        </div>
        <div style="clear: both;"></div>

        <div style="overflow: hidden;">

          <ul style="list-style: none; margin-top: 30px">
            <li v-for="item in this.$store.state.records" style="width: 150px; height: 216px; float: left; margin: 0 8px 0 0; padding: 0 18px 15px; text-align: center;">
              <img :src="item.pimage" width="130px" height="130px" />
            </li>
          </ul>

        </div>
      </div>

    </div>
</template>

<script>
  export default {
    name: "product_list",
    created() {
      this.params.cid = this.$route.query.cid;
      // console.log(this.params.cid);
      this.findList();
      this.$store.commit('initRecords');
    },
    data() {
      return {
        products: [],
        total: 10,
        params: {
          page: 1,
          size: 3,
          cid: ''
        },
        record: []
      }
    },
    methods: {
      findList() {
        this.$http.get('api/product/findList/' + this.params.page + '/' + this.params.size+'?cid=' + this.params.cid)
          .then((data) => {
          // console.log(data);
          this.products = data.data.queryResult.list;
          this.total = data.data.queryResult.total;
        })
      },
      handleSizeChange(newPageSize) {
        //pagesize改变时触发，当pagesize发生改变的时候，我们应该
        //以最新的pagesize来请求数据并展示数据
        this.params.size = newPageSize;
        this.findList();
      },
      handleCurrentChange(current) {
        //页码发生改变时触发当current发生改变的时候，我们应该
        //以最新的current页码来请求数据并展示数据
        this.params.page = current;
        this.findList();
      },
      async productDetail(item) {
        const {data} = await this.$http.get('api/category/findById/' + this.params.cid);
        // console.log(data);
        item.cid = this.params.cid;
        item.cname = data.cname;
        await this.$router.push({
          path: '/productDetail',
          query: item
        });
      }
    },
    mounted() {

    },
    watch: {
      '$route'(to, from) {
        this.params.cid = this.$route.query.cid;
        this.findList();
      }
    }
  }
</script>

<style lang="less" scoped>
  .product-list {
    margin-left: 70px;
  }

</style>
