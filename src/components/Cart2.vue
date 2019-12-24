<template>
  <!-- 显示图片 -->
  <div>
    <img src="/images/cart-empty.png">
    <a href="${pageContext.request.contextPath }">返回首页</a>
    <div class="container">
      <div class="row">

        <div style="margin:0 auto; margin-top:10px;width:950px;">
          <strong style="font-size:16px;margin:5px 0;">订单详情</strong>
          <table class="table table-bordered">
            <tbody>
            <tr class="warning">
              <th>图片</th>
              <th>商品</th>
              <th>价格</th>
              <th>数量</th>
              <th>小计</th>
              <th>操作</th>
            </tr>
            <tr class="active">
              <td width="40%">
                <input type="hidden" name="id" value="22">
                <img src="${pageContext.request.contextPath }/${entry.value.product.pimage }" width="70" height="60">
              </td>
              <td width="30%">
                <a target="_blank"> ${entry.value.product.pname }</a>
              </td>
              <td width="20%">
                ￥${entry.value.product.shop_price}
              </td>
              <td width="10%">
                ${entry.value.buyNum }
              </td>
              <td width="15%">
                <span class="subtotal">￥${entry.value.subTotal }</span>
              </td>
              <td>
                <a href="javascript:;" onclick="delFromCart('${entry.value.product.pid }')" class="delete">删除</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style="margin-right:130px;">
        <div style="text-align:right;">
          <em style="color:#ff6600;">
            登录后确认是否享有优惠&nbsp;&nbsp;
          </em> 赠送积分: <em style="color:#ff6600;">${cart.total }</em>&nbsp; 商品金额: <strong style="color:#ff6600;">￥${cart.total }元</strong>
        </div>
        <div style="text-align:right;margin-top:10px;margin-bottom:10px;">
          <a href="javascript:;" onclick="clearCart()" id="clear" class="clear">清空购物车</a>
          <a href="order_info.htm">
            <input type="submit" width="100" value="提交订单" name="submit" border="0" style="background: url('./images/register.gif') no-repeat scroll 0 0 rgba(0, 0, 0, 0);
						height:35px;width:100px;color:white;">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Cart",
    data() {
      return {
      }
    },
    created() {
    },
    methods: {

    }
  }
</script>

<style scoped>
  body {
    margin-top: 20px;
    margin: 0 auto;
  }

  .carousel-inner .item img {
    width: 100%;
    height: 300px;
  }

  font {
    color: #3164af;
    font-size: 18px;
    font-weight: normal;
    padding: 0 10px;
  }

</style>
