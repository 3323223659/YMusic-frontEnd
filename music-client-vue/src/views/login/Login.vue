<template>
  <div class="login-container">
    <div class="background">
      <div class="login-box">
        <div class="left">
          <el-card shadow="never" class="login-card">
            <h1 v-if="isLogin">用户登录</h1>
            <h1 v-else>用户注册</h1>
            <el-form :model="loginForm" :rules="loginRules" ref="loginForm" @validate="onValidate">
              <el-form-item prop="username" :error="errors.username">
                <i class="icon iconfont icon-icon-test4"></i>
                <el-input placeholder="用户名" v-model="loginForm.username">
                </el-input>
              </el-form-item>
              <el-form-item prop="password" :error="errors.password">
                <i class="icon iconfont icon-mima"></i>
                <el-input placeholder="密码" type="password" v-model="loginForm.password">
                </el-input>
              </el-form-item>
              <el-form-item v-if="!isLogin" prop="conformPassword" :error="errors.conformPassword">
                <i class="icon iconfont icon-mima"></i>
                <el-input placeholder="确认密码" type="password" v-model="loginForm.conformPassword">
                </el-input>
              </el-form-item>
              <div v-if="isLogin" style="margin-top: 76px;">&nbsp;</div>
              <el-form-item>
                <el-button v-if="isLogin" type="primary" @click="login('loginForm')">登录</el-button>
                <el-button v-else type="primary" @click="register('loginForm')">注册</el-button>
                <a v-if="isLogin" href="#" @click="changeIsLogin">没有账号,先去注册 ></a>
                <a v-else href="#" @click="changeIsLogin">已经有账号,去登陆 ></a>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
        <div class="right">
          <h2 class="welcome">Welcome to</h2>
          <h2 class="music">YMusic!</h2>
        </div>
      </div>
      <div class="logo">
        <img class="logo-image" src="../../assets/img/m.png" alt="YMusic" style="max-width: 130px">
      </div>
    </div>
  </div>
</template>
<script>
import { register } from '@/api/user'

export default {
  name: "LoginView",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        conformPassword: ''
      },
      isLogin: true,
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
          min: 2,
          max: 32,
          message: '用户名长度应该为2-32位之间',
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
        }],
        conformPassword: [{
          required: true,
          message: '请确认密码',
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
    changeIsLogin() {
      this.isLogin = !this.isLogin
      this.$refs.loginForm.resetFields()
    },
    onValidate(prop, valid, message) {
      if (!valid) {
        this.errors[prop] = message;
      } else {
        this.errors[prop] = '';
      }
    },
    login(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('user/login', this.loginForm)
          this.$router.push('/')
        } else {
          console.log('提交失败');
          return false;
        }
      });
    },
    register(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await register(this.loginForm)
          await this.$store.dispatch('user/login', this.loginForm)
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
* {
  user-select: none;
}

.login-container {
  height: 99vh;
  display: flex;
  align-items: stretch;
  margin: 0%;

  .background {
    flex: 1;
    background: url('../../assets/img/pexels-creationsbyfaik-1025469.jpg');
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
  right: 25%;
  width: 1100px;
  height: 500px;
  background: url(../../assets/img/pexels-moose-photos-170195-1037992.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  box-shadow: 0 20px 20px rgba(0, 0, 0, .5);
  border-radius: 10px;
}

.left {
  position: absolute;

  .login-card {
    right: 30%;
    width: 550px;
    height: 500px;
    box-sizing: border-box;
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0);
    border-radius: 10px;
  }

  .el-input {
    width: 400px;
    margin: 10px 0px 0px 0px;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: #333;
    border: 0;
  }

  h1 {
    margin: 40px 100px 20px 100px;
    padding: 0;
    text-align: center;
    color: black;
  }

  .el-button {
    width: 150px;
    margin: 60px 0px 0px 40px;
  }

  .el-input__inner {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid black;
    background-color: transparent;
  }
}

.el-input__inner::placeholder {
  color: #333;
}

.el-form-item__error {
  padding-top: 4px;
  padding-left: 40px;
}

a {
  margin: 0px 0px 0px 130px;
  text-decoration: none;
  border: none;
  outline: none;
  color: #333;
  font-size: 15px;
}

a:hover {
  color: black;
}

.right {
  position: absolute;
  right: 0;
  width: 550px;
  height: 500px;

  .welcome {
    margin: 150px 0px 25px 160px;
    font-size: 45px;
  }

  .music {
    margin: 100px 200px 250px 200px;
    font-size: 45px;
  }
}

.logo {
  .logo-image {
    position: absolute;
    top: 70px;
    right: 110px;
    max-width: 30%;
    animation: rotate 10s linear infinite;
  }
}

.icon-icon-test4 {
  font-size: 20px;
  vertical-align: middle;
}

.icon-mima {
  font-size: 20px;
  vertical-align: middle;
}

</style>