<template>
  <div class="container"
       style="width: 100%; background: url('/images/regist_bg.jpg');">
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户注册</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 登录表单区域 -->
      <el-form :model="registerForm" status-icon :rules="registerFormRules" ref="registerFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerForm.checkPass" autocomplete="off" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="registerForm.email" placeholder="请输入Email"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="registerForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="registerForm.sex" label="男">男</el-radio>
          <el-radio v-model="registerForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-col :span="11">
            <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="registerForm.birthday" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="电话号码" prop="telephone">
          <el-input v-model="registerForm.telephone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">提交</el-button>
          <el-button @click="resetregisterForm">重置</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>

</template>

<script>
  export default {
    name: "Register",
    data() {
      // 验证邮箱的规则
      const checkEmail = (rule, value, cb) => {
        // 验证邮箱的正则表达式
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (regEmail.test(value)) {
          // 合法的邮箱
          return cb()
        }
        cb(new Error('请输入合法的邮箱'))
      };
      // 验证手机号的规则
      const checkMobile = (rule, value, cb) => {
        // 验证手机号的正则表达式
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if (regMobile.test(value)) {
          return cb()
        }
        cb(new Error('请输入合法的手机号'))
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const checkUser = (rule, value, callback) => {
        this.$http.get('api/checkUser', {
          params: {username: value}
        }).then((data) => {
          // console.log(data)
          if (data.data.code !== 200) {
            callback(new Error('用户名已存在'));
          }else {
            callback();
          }
        });
      };
      return {
        registerForm: {},
        registerFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            {
              min: 3,
              max: 10,
              message: '用户名的长度在3~10个字符之间',
              trigger: 'blur'
            },
            { validator: checkUser, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              min: 3,
              max: 15,
              message: '用户名的长度在3~15个字符之间',
              trigger: 'blur'
            }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkMobile, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      register() {
        this.$refs.registerFormRef.validate(async valid => {
          if (!valid) return;
          const {data} = await this.$http.post('api/register', this.registerForm);
          console.log(data);
          if (data.code !== 200) return this.$message.error('注册失败');
          this.$message.success('注册成功');
          await this.$router.push('/welcome');
        });
      },
      resetregisterForm() {
        this.$refs.registerFormRef.resetFields();
      }
    }
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

  .el-card {
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: center;
    width: 900px;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
  .el-breadcrumb {
    margin-bottom: 25px;
    margin-left: 30px;
  }
  .el-input {
    width: 350px;
  }
</style>
