<template>
  <div>
    <login>
      <div slot="main_title" class="title">
        <a href="/login" slot="main_title">登录</a>|<a href="/sign" class="active">注册</a>
      </div>
      <div slot="form" class="login_form">
        <input type="text" placeholder="请输入用户名" v-model="register_info.username">
        <input type="password" placeholder="请输入密码" v-model="register_info.pwd">
        <input type="password" placeholder="请输入确认密码" v-model="register_info.confirm">
<!--        <div class="code">-->
<!--          <input type="text" placeholder="请输入验证码" v-model="register_info.code">-->
<!--          <img src="../../public/images/login/code.png" alt="">-->
<!--        </div>-->
        <button @click="sign">注册</button>
      </div>
    </login>
  </div>
</template>

<script>
import axios from "axios";
import login from "./Login";
export default {
  components: {
    login
  },
  data() {
    return {
      register_info: {
        username: "",
        pwd: "",
        confirm: "",
        // code: ""
      }
    }
  },
  methods: {
    sign() {
      if (this.register_info.pwd === this.register_info.confirm) {
        let url = 'http://ec.vaiwan.cn/register'; //后端注册接口
        let data = {
          'username': this.register_info.username.toString(),
          'password': this.register_info.pwd.toString()
        }
        axios.post(url, data)
            .then(res => {
              console.log(res);
              if (res.data.code == "200") {
                alert('register success from Vue');
                location.href = '/login'
              } else if (res.data.code == "400") {
                alert(res.data.data);
              }
            }).catch(err => alert(err))
          console.log(this.register_info)
        } else {
            alert("密码不一致");
        }
      }
  }
}
</script>
<style scoped>
</style>
