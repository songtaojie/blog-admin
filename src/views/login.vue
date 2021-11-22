
<template>
  <div class="hx-login-wrap">
    <ul class="bg-bubbles">
      <li :key="n+'n'" v-for="n in 10"></li>
      <ol :key="m+'m'" v-for="m in 5"></ol>
    </ul>
    <!-- <div class="bg bg-blur"></div> -->
    <div class="h-25"></div>
    <div class="hx-login-container">
      <div class="hx-login-header">
        <el-link :underline="false" class="text-center mb-1" href="/">
          <img :src="require('@/assets/images/logo.png')" />
        </el-link>
      </div>
      <div class="hx-login-form">
        <el-form :model="form" :rules="rules" class="demo-ruleForm login-container" label-position="left" label-width="0px" ref="ruleForm">
          <el-form-item prop="username">
            <el-input auto-complete="off" placeholder="账号" type="text" v-model="form.username">
              <template slot="prepend">
                <i class="el-icon-user"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input auto-complete="off" placeholder="密码" show-password v-model="form.password">
              <template slot="prepend">
                <i class="el-icon-lock"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-checkbox checked class="remember" v-model="form.remember">记住我</el-checkbox>
          <el-form-item style="width:100%;">
            <el-button :loading="isLoading" @click.native.prevent="handlelogin" style="width:100%;" type="primary">登录</el-button>
          </el-form-item>
          <div>
            <h4>忘记密码?</h4>
            <p>
              不用担心, 点击
              <a class href="javascript:;" id="forget-password">这里</a>
              找回密码.
            </p>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { authorize } from '../api/admin/oauth2.js'
export default {
  data() {
    var isDev = process.env.NODE_ENV === 'development'
    return {
      isLoading: false,
      form: {
        username: isDev ? 'SuperAdmin' : '',
        password: isDev ? '123456' : '',
        remember: false
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handlelogin() {
      const that = this
      window.from = that.$refs.form
      that.$refs.ruleForm.validate(valid => {
        if (valid) {
          that.isLoading = true
          authorize(that.form)
            .then(res => {
              that.isLoading = false
              console.log(res)
              that.$router.push({
                path: that.$route.query.redirect || '/'
              })
            })
            .catch(() => {
              that.isLoading = false
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" >
.hx-login-wrap {
  // background: rgba(239, 233, 242, 0.8) url("../assets/images/newbg.png")
  //   no-repeat bottom center;
  background: #50a3a2;
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    color-stop(0, #127c7b),
    to(#50a3a2)
  );
  background: linear-gradient(to bottom right, #127c7b 0, #50a3a2);
  opacity: 0.8;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .hx-login-container {
    // width: 18.75rem;
    // padding-top: 5rem;
    // margin: 0 auto;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: auto;
    width: 20rem;
    padding: 1rem 0;
    background: #fff;
    border: 1px solid #eaeaea;
    -webkit-box-shadow: 0 0 25px #cac6c6;
    box-shadow: 0 0 25px #cac6c6;
    z-index: 9999;
    position: relative;
  }
  .hx-login-header {
    a {
      display: block;
    }
  }
  .hx-login-form {
    background-color: #fff;
    margin-bottom: 0px;
    padding: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}
@import "@/scss/bg-bubbles";
</style>
