<template>
  <div id="login">
    <div class="main">
      <div class="top">
        <slot name="main_title">
          <div class="title">
            <div>
              <a href="/login" class="active">登录</a>|<a href="/sign">注册</a>
            </div>
          </div>
        </slot>
        <slot name="form">
          <div class="login_form">
            <div class="login_form">
              <input type="text" placeholder="请输入用户名" v-model="login_info.username">
              <input type="password" placeholder="请输入密码" v-model="login_info.pwd">
              <div class="code">
                <input type="text" placeholder="请输入验证码" v-model="login_info.code">
<!--                <img src="../../public/images/login/code.png" alt="">-->
                <el-image :src="kaptcha" @click="refreshCode()" alt="加载失败" style="margin-left:10px;height:40px;margin-top:5px">
                  <div slot="placeholder" class="image-slot">
                    <i class="el-icon-loading"></i>
                  </div>
                </el-image>
              </div>
              <button @click="login">登录</button>
            </div>
          </div>
        </slot>
        <div class="login_other">
          <p>其他登录方式</p>
          <div>
            <img src="../../public/images/login/qq.svg" alt="">
            <img src="../../public/images/login/weixin.svg" alt="">
            <img src="../../public/images/login/weibo.svg" alt="">
          </div>
        </div>
      </div>
      <div class="bottom">
        <img src="../../public/images/login/bg.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      kaptcha: "http://ec.vaiwan.cn/kaptcha?t=" + new Date().getTime(),
      login_info: {
        username: "",
        pwd: "",
        code: ""
      },
      alertMessage: "12",
    }
  },
  methods: {
    login() {
      let url = 'http://ec.vaiwan.cn/login'; //后端登录接口
      let data = {
        "username": String(this.login_info.username),
        "password": String(this.login_info.pwd),
        "code": String(this.login_info.code)
      }
      axios.post(url, data)
          .then(res => {
            if(res.data.code == "200") {
              // this.$message.success('登录成功')
              location.href = '/user/' + this.login_info.username
            }else if(res.data.code == "400") {
              if(res.data.msg == "密码不正确")
              {
                this.$message.error("密码不正确")
              }else if(res.data.msg == "用户不存在")
              {
                this.$message.error("用户不存在")
              }else if(res.data.msg == "验证码错误")
              {
                this.$message.error("验证码错误")
              }else{
                this.$message("请重新输入")
              }
            }
          }).catch(err => alert(err))
      console.log(this.login_info)
      // this.$router.push({name: 'user', params: {id: this.login_info.username}})
    },
    refreshCode(){
      console.log("测试切换验证码")
      this.kaptcha = "http://ec.vaiwan.cn/kaptcha?t="+ new Date().getTime()
      console.log(this.kaptcha)
    }
  },

}
</script>
<style scoped lang="scss">
@import "../assets/sass/login.scss";
</style>
