<template>
  <div class="login-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          {{ $t('login.title') }}
        </h3>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          type="password"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-form-item ref="validate" class="validate" prop="code">
        <el-input
          v-model="form.code"
          type="text"
          name="code"
          placeholder="请输入验证码"
        />
        <img class="validate-img" :src="codeImg" alt="" @click="refresh" />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >
        {{ $t('login.logIn') }}
      </el-button>
    </el-form>
  </div>
</template>

<script>
import request from 'reqwest';
import { Notification } from 'element-ui';

export default {
  name: 'App',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: '',
        password: '',
        code: '',
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername },
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword },
        ],
      },
      loading: false,
      codeImg: '',
    };
  },
  created() {
    this.getValidateImg();
  },
  methods: {
    handleLogin() {
      const self = this;
      if (!this.form.code) {
        Notification({
          title: '提示',
          message: '请输入验证码',
        });
        return;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          self.loading = !0;

          request({
            url: '/login',
            method: 'post',
            data: {
              account: self.form.username,
              pwd: self.form.password,
              code: self.form.code,
            },
            success(res) {
              if (res.errorCode > -1) window.location.href = '/';
              else {
                self.loading = !1;
                Notification({
                  title: '提示',
                  message: res.msg,
                });
              }
            },
            error() {
              self.loading = !1;
              Notification({
                title: '提示',
                message: '未知错误，请稍后再试',
              });
            },
          });

          return true;
        }
        return false;
      });
    },
    getValidateImg() {
      const { validate } = this.$refs;
      var This = this;

      var xhr = new XMLHttpRequest();
      xhr.open('get', '/getcode', true);
      xhr.responseType = 'blob';
      xhr.onload = function() {
        if (this.status === 200) {
          var blob = this.response;

          This.codeImg = window.URL.createObjectURL(blob);
        }
      };
      xhr.send();
    },
    refresh() {
      this.getValidateImg();
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */

/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__content {
    display: flex;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0;
    }
  }
  .validate-img {
    width: 120px;
    cursor: pointer;
  }
}
</style>
