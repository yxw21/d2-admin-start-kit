<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:stretch box:justify">
        <div class="page-login--content-header"></div>
        <div
          class="page-login--content-main"
          flex="dir:top main:center cross:center">
          <!-- logo -->
          <img class="page-login--logo" src="./image/logo@2x.png">
          <!-- form -->
          <div class="page-login--form">
            <el-card shadow="never">
              <el-form
                ref="loginForm"
                label-position="top"
                :rules="rules"
                :model="formLogin"
                size="default">
                <el-form-item prop="username">
                  <el-input
                    type="text"
                    v-model="formLogin.username"
                    :placeholder="$t('views.system.login.form.placeholder.username')">
                    <i slot="prepend" class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    v-model="formLogin.password"
                    :placeholder="$t('views.system.login.form.placeholder.password')">
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <el-button
                  size="default"
                  @click="submit"
                  type="primary"
                  class="button-login">
                  {{$t("views.system.login.form.button.login")}}
                </el-button>
                <d2-icon name="fa-keyboard-o"/>
              </el-form>
            </el-card>
          </div>
        </div>
        <div class="page-login--content-footer">
          <p class="page-login--content-footer-locales">
            <a
              v-for="language in $languages"
              :key="language.value"
              @click="onChangeLocale(language.value)">
              {{ language.label }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import localeMixin from '@/locales/mixin.js'
export default {
  mixins: [
    localeMixin
  ],
  computed: {
    rules () {
      return {
        username: [
          {
            required: true,
            message: this.$t('public.rules.required', { name: this.$t('views.system.login.form.label.username') }),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('public.rules.required', { name: this.$t('views.system.login.form.label.password') }),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  data () {
    return {
      // 表单
      formLogin: {
        username: 'admin',
        password: 'admin'
      }
    }
  },
  methods: {
    ...mapActions('d2admin/account', [
      'login'
    ]),
    /**
       * @description 接收选择一个用户快速登录的事件
       * @param {Object} user 用户信息
       */
    handleUserBtnClick (user) {
      this.formLogin.username = user.username
      this.formLogin.password = user.password
      this.submit()
    },
    /**
       * @description 提交表单
       */
    // 提交登录信息
    submit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 登录
          // 具体需要传递的数据请自行修改代码
          this.login({
            username: this.formLogin.username,
            password: this.formLogin.password
          })
            .then(() => {
              // 重定向对象不存在则返回顶层路径
              this.$router.replace(this.$route.query.redirect || '/')
            })
        } else {
          // 登录表单校验失败
          this.$message.error(this.$t('public.message.error.form.invalid'))
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .page-login {
    @extend %unable-select;
    $backgroundColor: #F0F2F5;
    // ---
    background-color: $backgroundColor;
    height: 100%;
    position: relative;
    // 层
    .page-login--layer {
      @extend %full;
      overflow: auto;
    }
    .page-login--layer-area {
      overflow: hidden;
    }
    // 登陆页面控件的容器
    .page-login--content {
      height: 100%;
      min-height: 500px;
    }
    // header
    .page-login--content-header {
      padding: 1em 0;
    }
    // main
    .page-login--logo {
      width: 240px;
      margin-bottom: 2em;
      margin-top: -2em;
    }
    // 登录表单
    .page-login--form {
      width: 280px;
      // 卡片
      .el-card {
        margin-bottom: 15px;
      }
      // 登录按钮
      .button-login {
        width: 100%;
      }
      // 输入框左边的图表区域缩窄
      .el-input-group__prepend {
        padding: 0px 14px;
      }
    }
    // footer
    .page-login--content-footer {
      padding: 1em 0;
      .page-login--content-footer-locales {
        padding: 0px;
        margin: 0px;
        margin-bottom: 15px;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        color: $color-text-normal;
        a {
          color: $color-text-normal;
          margin: 0 .5em;
          &:hover {
            color: $color-text-main;
          }
        }
      }
    }
    // 背景
    .circles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      margin: 0px;
      padding: 0px;
      li {
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: #FFF;
        animation: animate 25s linear infinite;
        bottom: -200px;
        @keyframes animate {
          0%{
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
          }
          100%{
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
          }
        }
        &:nth-child(1) {
          left: 15%;
          width: 80px;
          height: 80px;
          animation-delay: 0s;
        }
        &:nth-child(2) {
          left: 5%;
          width: 20px;
          height: 20px;
          animation-delay: 2s;
          animation-duration: 12s;
        }
        &:nth-child(3) {
          left: 70%;
          width: 20px;
          height: 20px;
          animation-delay: 4s;
        }
        &:nth-child(4) {
          left: 40%;
          width: 60px;
          height: 60px;
          animation-delay: 0s;
          animation-duration: 18s;
        }
        &:nth-child(5) {
          left: 65%;
          width: 20px;
          height: 20px;
          animation-delay: 0s;
        }
        &:nth-child(6) {
          left: 75%;
          width: 150px;
          height: 150px;
          animation-delay: 3s;
        }
        &:nth-child(7) {
          left: 35%;
          width: 200px;
          height: 200px;
          animation-delay: 7s;
        }
        &:nth-child(8) {
          left: 50%;
          width: 25px;
          height: 25px;
          animation-delay: 15s;
          animation-duration: 45s;
        }
        &:nth-child(9) {
          left: 20%;
          width: 15px;
          height: 15px;
          animation-delay: 2s;
          animation-duration: 35s;
        }
        &:nth-child(10) {
          left: 85%;
          width: 150px;
          height: 150px;
          animation-delay: 0s;
          animation-duration: 11s;
        }
      }
    }
  }
</style>
