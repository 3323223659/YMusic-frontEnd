<template>
  <div class="login-container">
    <div class="background">
      <h1 style="font-size: 300%; margin: 0px 620px 50px 100px; color:#F5F5F5; user-select: none;">YMusic后台管理系统</h1>
      <div class="login-box">
        <el-card shadow="never" class="login-card">
          <h1>管理员登录</h1>
          <el-form style="margin-left: 20px;" :model="loginForm" :rules="loginRules" ref="loginForm" @validate="onValidate">
            <el-form-item prop="username" :error="errors.username">
              <h3 style="display: inline; color: #fff;">用户名：</h3>
              <el-input placeholder="用户名" v-model="loginForm.username">
              </el-input>
            </el-form-item>
            <el-form-item prop="password" :error="errors.password">
              <h3 style="display: inline; color: #fff;">密码：</h3>
              <el-input style="margin-left: 18px;" placeholder="密码" type="password" v-model="loginForm.password">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      loginForm:{
        username: '',
        password: ''
      },
      errors: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }, {
          min: 4,
          max: 32,
          message: '用户名长度应该为4-32位之间',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          min: 6,
          max: 12,
          message: '密码长度应该为6-12位之间',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    onValidate(prop, valid, message) {
      if (!valid) {
        this.errors[prop] = message;
      } else {
        this.errors[prop] = '';
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          await this.$store.dispatch('admin/login',this.loginForm)
          this.$router.push('/')
        } else {
          console.log('提交失败');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
*{
  user-select: none;
}
.login-container {
  height: 99vh;
  display: flex;
  align-items: stretch;
  margin: 0%;
  .background {
      flex: 1;
      background: url('../../assets/img/turntable-1109588_1920.jpg');
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      margin: 0;
      padding: 0;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      background-attachment: fixed;
    }
}
.login-box {
  position: relative;
  right: 30%;
  width: 700px;
  height: 400px;
  background: rgba(0, 0, 0, .1);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, .5);
  border-radius: 10px;
}
.login-box h1 {
  margin: 30px 0 20px;
  padding: 0;
  text-align: center;
  color: #fff;
  user-select: none;
}
.login-card {
  right: 30%;
  width: 700px;
  height: 400px;
  background: rgba(0, 0, 0, .8);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, .5);
  border-radius: 10px;
}
.el-input{
  width: 500px;
  margin: 25px 0px 0px 0px ;
  background-color: #e8e8e8;
  border-radius: 50%;
}
.el-input__inner::placeholder {
    color: #333;
  }
.el-button{
  margin: 25px 0px 0px 500px;
}
.el-form-item__error {
  padding-top: 4px;
  padding-left: 80px; /* 向右偏移 */
  user-select: none;
}
</style>