<template>
  <div id="user">
    <Index>
      <div slot="mynav" class="right-wrap">
        <ul class="ent-wrap">
          <li class="user" id="login_logined">
            <div class="head">
              <div class="changeid">
                <a href="javascript:void(0);" :class="{hide: !userInformation.userid}" @click="officialConfirm()">我是村官</a>
                <a href="javascript:void(0);" :class="{hide: userInformation.userid}" @click="villagerConfirm()">我是村民</a>
              </div>
              <div class="bell-wrap">
                <a href="#">
                  <img src="../../public/images/nav/bell.svg" alt="" class="bell">
                  <span class="num" id="newsNum">1</span>
                </a>
              </div>
              <div class="user-info">
                <img :src="userInformation.profilePhoto" alt="" class="photo">
                <a href="#" class="name">{{$route.params.username}}</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Index>
  </div>
</template>

<script>
import Index from './Index'
import {getUserData} from "../network/user";
export default {
  components: {
    Index
  },
  data() {
    return {
      // userid: 0, //0表示村民,1表示村官 默认为0
      //用户信息
      userInformation: {
        profilePhoto: "", //头像
        nickname: "", //昵称
        username: "",//用户名
        userid: 0, //用户标识 0表示村民,1表示村官 默认为0
      }
    }
  },
  created() {
    //请求用户数据 包括昵称，头像，用户标识（村官或村民）等
    getUserData().then(res=>{
      let userlist = res.data.user.list
      let theuser = userlist.find(item => item.username === this.$route.params.username)
      this.userInformation.username = theuser.username
      this.userInformation.nickname = theuser.nickname
      this.userInformation.profilePhoto = theuser.profilePhoto
      this.userInformation.userid = theuser.userid
    })
  },
  methods: {
    officialConfirm() {
      this.$confirm('您当前的账号未认证村官身份，是否认证村官身份？', {
        confirmButtonText: '认证村官身份',
        cancelButtonText: '暂不认证'
      }).then(()=>{
        //页面跳转到村官认证路由
        alert("认证村官身份")
        location.href = '/identify/' + this.$route.params.username + '/official'
      }).catch(()=>{
        alert('暂不认证')
      })
    },
    villagerConfirm() {
      this.$confirm('您当前的账号未认证村民身份，是否认证村民身份？', {
        confirmButtonText: '认证村民身份',
        cancelButtonText: '暂不认证'
      }).then(()=>{
        alert("认证村民身份")
        //页面跳转到村民认证路由
        location.href = '/identify/' + this.$route.params.username + '/villager'
      }).catch(()=>{
        alert('暂不认证')
      })
    }
  }
}
</script>
<style lang="scss">
#user{
  height: 100%;
  .right-wrap {
    right: 0;
  }
  ul, li {
    padding: 0;
    list-style-type: none;
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  .ent-wrap .user {
    position: relative;
    margin-top: 15px;
    margin-left: 20px;

    .head {
      position: relative;
      cursor: pointer;
      display: inline-flex;
      justify-content: flex-end;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        -webkit-border-radius: 100%;
        z-index: 1;
      }

      .changeid {
        position: relative;
        right: 10px;
        line-height: 40px;

        a {
          height: 40px;
          line-height: 40px;
          font-size: 10px;
          border: 1px solid #419CE6;
          padding: 4px 12px;
          border-radius: 6px;
          color: #419CE6;
          &:last-child {
            margin-left: 10px;
            color: #24a587;
            border: 1px solid #24a587;
          }
        }
        a.hide {
          display: none;
        }
      }
      .bell-wrap {
        position: relative;
        padding-top: 10px;
        img {
          vertical-align: middle;
          border: 0;
        }
        span {
          position: absolute;
          top: 0;
          left: -5px;
          height: 18px;
          line-height: 18px;
          padding: 0 10px;
          color: #fff;
          background: #ff3526;
          border-radius: 9px;
          -webkit-border-radius: 9px;
          z-index: 2;
        }
        .bell {
          position: relative;
          width: 28px;
          height: 23px;
        }
        .num {
          background-color: #ff3526;
          height: 18px;
          line-height: 18px;
          padding: 0 6px;
          border-radius: 9px;
          -webkit-border-radius: 9px;
          position: absolute;
          top: 0;
          left: 15px;
        }
      }
      .user-info {
        display: inline-flex;
        .photo {
          position: relative;
          left: 20px;
        }
        .name {
          margin: auto;
          color: #333333;
          font-size: 16px;
          height: 40px;
          line-height: 40px;
          padding: 0 15px 0 15px;
        }
      }
    }
  }
}
</style>
