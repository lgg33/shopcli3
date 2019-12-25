<template>
  <div class="container">
    <div class="row">
      <div style="margin: 0 auto; margin-top: 10px; width: 950px;">
        <strong>订单详情</strong>
        <table class="table table-bordered">
          <tbody>
          <tr class="warning">
            <th colspan="5">订单编号:{{this.$store.state.oid}}</th>
          </tr>
          <tr class="warning">
            <th>图片</th>
            <th>商品</th>
            <th>价格</th>
            <th>数量</th>
            <th>小计</th>
          </tr>
          <!--          <c:forEach items="${order.orderItems }" var="orderItem">-->
          <tr v-for="item in this.$store.state.orders" class="active">
            <td width="40%">
              <img :src="item.pimage" width="70"
                   height="60"></td>
            <td width="30%"><a target="_blank"> {{item.pname}}</a></td>
            <td width="20%">{{item.shopPrice}}</td>
            <td width="10%">{{item.num}}</td>
            <td width="15%"><span class="subtotal">{{item.cartPrice}}</span></td>
          </tr>
          <!--          </c:forEach>-->
          </tbody>
        </table>
      </div>

      <div style="text-align: right; margin-right: 120px;">
        商品金额: <strong style="color: #ff6600;">￥{{this.$store.state.cartTotal}} 元</strong>
      </div>

    </div>

    <div>
      <hr/>
      <!--登录表单-->
      <el-form :model="orderForm" ref="orderFormRef" label-width="0" class="login_form" :rules="orderFormRules">
        <!---->
        <el-form-item prop="address">
          <el-input v-model="orderForm.address" placeholder="请输入地址"
                    style="width: 40%"/>
        </el-form-item>
        <!--  -->
        <el-form-item prop="name">
          <el-input v-model="orderForm.name"
                    placeholder="请输入姓名" style="width: 40%"/>
        </el-form-item>
        <!---->
        <el-form-item prop="telephone">
          <el-input v-model="orderForm.telephone" placeholder="请输入电话"
                    style="width: 40%"/>
        </el-form-item>
        <hr/>

        <div style="margin-top: 5px; margin-left: 150px;">
          <strong>选择银行：</strong>
          <p>
            <br/> <input type="radio" name="pd_FrpId" value="ICBC-NET-B2C"
                         checked="checked"/>工商银行 <img src="/bank_img/icbc.bmp"
                                                      align="middle"/>&nbsp;&nbsp;&nbsp;&nbsp; <input type="radio"
                                                                                                      name="pd_FrpId"
                                                                                                      value="BOC-NET-B2C"/>中国银行
            <img
              src="/bank_img/bc.bmp" align="middle"/>&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="pd_FrpId" value="ABC-NET-B2C"/>农业银行 <img
            src="/bank_img/abc.bmp" align="middle"/> <br/> <br/> <input
            type="radio" name="pd_FrpId" value="BOCO-NET-B2C"/>交通银行 <img
            src="/bank_img/bcc.bmp" align="middle"/>&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="pd_FrpId" value="PINGANBANK-NET"/>平安银行
            <img src="/bank_img/pingan.bmp" align="middle"/>&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="pd_FrpId" value="CCB-NET-B2C"/>建设银行 <img
            src="/bank_img/ccb.bmp" align="middle"/> <br/> <br/> <input
            type="radio" name="pd_FrpId" value="CEB-NET-B2C"/>光大银行 <img
            src="/bank_img/guangda.bmp" align="middle"/>&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="pd_FrpId" value="CMBCHINA-NET-B2C"/>招商银行
            <img src="/bank_img/cmb.bmp" align="middle"/>

          </p>
          <hr/>
        </div>

        <!-- 按钮 -->
        <el-form-item class="btns" style="margin-left: 50px;">
          <el-button type="danger" @click="submitOrder">确认订单</el-button>
          <el-button type="info" @click="resetorderForm">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>

</template>

<script>
  export default {
    name: "OrderInfo",
    created() {
    },
    data() {
      return {
        orderForm: {
          address: '',
          name: '',
          telephone: '',
          oid: this.$store.state.oid
        },
        orderFormRules: {
          address: [
            {required: true, message: '请输入地址', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          telephone: [
            {required: true, message: '请输入电话', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      getOrderInfo() {

      },
      //重置表单
      resetorderForm() {
        this.$refs.orderFormRef.resetFields();
      },
      submitOrder() {
        this.$refs.orderFormRef.validate(async valid => {
          // console.log(this.loginFormRules);
          if (!valid) {
            return;
          }
          const {data} = await this.$http.put('api/order/orderSubmit', this.orderForm);
          if (data.code !== 200) return this.$message.error("提交失败");
          this.$message.success("提交成功");
          await this.$router.push('/order');
          // console.log(data);
        })
      },
    }
  }
</script>

<style scoped>
  .el-input {
    left: 28%;
    transform: translate(-50%);
  }
  .el-button {
    margin-left: 80%;
    transform: translate(-100%);
  }

</style>
