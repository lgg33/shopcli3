<template>
  <div class="container box-container"
       style="width: 100%; height: 460px; background: #FF2C4C url('/images/loginbg.jpg') no-repeat;">
    <div class="row">
      <div class="col-md-7">
        <!--<img src="./image/login.jpg" width="500" height="330" alt="会员登录" title="会员登录">-->
      </div>

      <div class="col-md-5">
        <div
          style="width: 440px; border: 1px solid #E7E7E7; padding: 20px 0 20px 30px; border-radius: 5px; margin-top: 60px; background: #fff;">
          <!--登录盒子-->
          <div class="login_box" style="margin-left: 30px">
            <h4>用户登录</h4>
            <!--登录表单-->
            <el-form :model="loginForm" ref="loginFormRef" label-width="0" class="login_form" :rules="loginFormRules">
              <!--用户名-->
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" placeholder="请输入用户名"
                style="width: 300px"/>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima"
                          placeholder="请输入密码" style="width: 300px"/>
              </el-form-item>
              <!--验证码-->
              <el-form-item prop="checkCode">
                <el-input id="check-code" v-model="loginForm.checkCode" placeholder="请输入验证码" style="width: 120px; margin-right: 30px"/>
                <img :src="codeUrl"  @click="getCode" style="height: 35px; width: 100px"/>
              </el-form-item>
              <!--remember-->
              <el-form-item style="margin-left: 90px">
                <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
              </el-form-item>
              <!-- 按钮 -->
              <el-form-item class="btns" style="margin-left: 50px;">
                <el-button type="danger" @click="login">登录</el-button>
                <el-button type="info" @click="resetLoginForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        codeUrl: 'http://localhost:9000/getCode',
        loginForm: {
          username: '',
          password: '',
          checkCode: '',
          remember: false
        },
        loginFormRules: {
          username: [
            { required: true, message: '请输入登录名', trigger: 'blur' },
            {
              min: 2,
              max: 10,
              message: '登录名长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              min: 3,
              max: 15,
              message: '密码长度在 3 到 15 个字符',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    created() {
      this.getCookie();
    },
    methods: {
      //获取验证码
      getCode() {
        this.codeUrl = this.codeUrl + "?a=" + new Date().getTime();
      },
      //登录
      login() {
        this.$refs.loginFormRef.validate(async valid => {
          // console.log(this.loginFormRules);
          if (!valid) {
            return;
          }
          const self = this;
          //判断复选框是否被勾选 勾选则调用配置cookie方法
          if (this.loginForm.remember === true) {
            console.log("checked == true");
            //传入账号名，密码，和保存天数3个参数
            this.setCookie(this.loginForm.username, this.loginForm.password, 7);
          }else {
            console.log("清空Cookie");
            //清空Cookie
            this.clearCookie();
          }
          //与后端请求代码，
          const {data} = await this.$http.get('api/login', {
            params: {username: this.loginForm.username, password: this.loginForm.password, code: this.loginForm.checkCode}
          });
          // console.log(data);
          if (data.code !== 200) {
            return this.$message.error('登录失败:' + data.message);
          }
          this.$message.success('登录成功');
          window.sessionStorage.setItem('username', this.loginForm.username)
          await this.$router.push('/');
        })
      },
      //重置表单
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields();
      },
      setCookie(c_name, c_pwd, exdays) {
        let exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie() {
        if (document.cookie.length > 0) {
          let arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            let arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] === 'userName') {
              this.loginForm.username = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] === 'userPwd') {
              this.loginForm.password = arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      }
    }
  }
</script>

<style lang="less" scoped>
  .check-code {
    height: 25px;
    width: 90px;
    margin-top: 5px;
  }
  body {
    margin-top: 20px;
    margin: 0 auto;
  }

  .carousel-inner .item img {
    width: 100%;
    height: 300px;
  }

  .container .row div {
    /* position:relative;
           float:left; */

  }

  font {
    color: #666;
    font-size: 22px;
    font-weight: normal;
    padding-right: 17px;
  }


</style>
