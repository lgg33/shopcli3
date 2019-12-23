<template>
  <div class="container"
       style="width: 100%; background: url('/images/regist_bg.jpg');">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8"
           style="background: #fff; padding: 40px 80px; margin: 30px; border: 7px solid #ccc;">
        <font>会员注册</font>USER REGISTER
        <form class="form-horizontal" action="${root}/Register?state=register"  method="post" style="margin-top: 5px;">
          <div class="form-group">
            <label for="username" class="col-sm-2 control-label">用户名</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" id="username" name="username"
                     placeholder="请输入用户名">
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
            <div class="col-sm-6">
              <input type="password" class="form-control" name="password" id="inputPassword3"
                     placeholder="请输入密码">
            </div>
          </div>
          <div class="form-group">
            <label for="confirmpwd" class="col-sm-2 control-label">确认密码</label>
            <div class="col-sm-6">
              <input type="password" class="form-control" name="confirmpwd" id="confirmpwd"
                     placeholder="请输入确认密码">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-6">
              <input type="email" class="form-control" id="inputEmail3"
                     placeholder="Email" name="email">
            </div>
          </div>
          <div class="form-group">
            <label for="usercaption" class="col-sm-2 control-label">姓名</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" id="usercaption"
                     placeholder="请输入姓名" name="name">
            </div>
          </div>
          <div class="form-group opt">
            <label for="inlineRadio1" class="col-sm-2 control-label">性别</label>
            <div class="col-sm-6">
              <label class="radio-inline"> <input type="radio"
                                                  name="sex" id="inlineRadio1" value="男">
                男
              </label> <label class="radio-inline"> <input type="radio"
                                                           name="sex" id="inlineRadio2" value="女">
              女
            </label>
            </div>
          </div>
          <div class="form-group">
            <label for="date" class="col-sm-2 control-label">出生日期</label>
            <div class="col-sm-6">
              <input type="date" name="birthday" class="form-control">
            </div>
          </div>

          <div class="form-group">
            <label for="date" class="col-sm-2 control-label">电话号码</label>
            <div class="col-sm-6">
              <input type="text" name="telephone" class="form-control">
            </div>
          </div>

          <div class="form-group">
            <label for="date" class="col-sm-2 control-label">验证码</label>
            <div class="col-sm-3">
              <input type="text" name="checkCode" class="form-control">

            </div>
            <div class="col-sm-2">
<!--              <img src="./image/captcha.jhtml" />-->
            </div>

          </div>


          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <input type="submit" width="100" value="注册" name="submit"
                     style="background: url('/images/register.gif') no-repeat scroll 0 0 rgba(0, 0, 0, 0); height: 35px; width: 100px; color: white;">
            </div>
          </div>
        </form>
      </div>

      <div class="col-md-2"></div>

    </div>
  </div>

</template>

<script>
  export default {
    name: "Register",
  }
</script>

<style lang="less" scoped>
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
