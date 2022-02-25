<template>
  <div id="identify" :style="{height: minHeight+ 'px'}">
    <div class="main">
      <nav>
        <div class="right">
          <div class="right-wrap">
            <ul class="ent-wrap">
              <li class="user" id="login_logined">
                <div class="head">
                  <div class="changeid">
                    <a href="javascript:void(0);" :class="{hide: !userid}" @click="officialConfirm()">我是村官</a>
                    <a href="javascript:void(0);" :class="{hide: userid}" @click="villagerConfirm()">我是村民</a>
                  </div>
                  <div class="bell-wrap">
                    <a href="#">
                      <img src="../../public/images/nav/bell.svg" alt="" class="bell">
                      <span class="num" id="newsNum">1</span>
                    </a>
                  </div>
                  <div class="user-info">
                    <a href="#" class="name">{{$route.params.username}}</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>
        <router-view></router-view>
      </main>
    </div>

<!--    <h2>username: {{ $route.params.id }}</h2>-->

  </div>
</template>

<script>
export default {
  data() {
    return {
      minHeight: 100
    }
  },
  mounted() {
    this.minHeight = document.body.scrollHeight + 20
  }
}
</script>
<style lang="scss">
#identify {
  width: 1020px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  .main {
    margin-top: 63px;
    width: 1000px;
    height: 100%;
    min-height: 1210px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    position: relative;
    nav{
      width: 1000px;
      height: 50px;
      position: absolute;
      background-color: var(--nav_bg);
      box-shadow: 0 0 5px 4px rgba(0, 0, 0, .05);
      //background-color: transparent;
      display: flex;
      align-items: center;
      top: 0;
      right: 0;
      left: 0;
      z-index: 100;
      border-radius: 4px;
      //padding-right: 10px;
      .right{
        width: 100%;
        display: flex;
        justify-content: right;
      }
      a{
        margin-right: 20px;
        color: var(--nav_color);
        &:last-child{
          margin-right: 0;
        }
      }
    }
    main {
      position: absolute;
      top: 35px;
      left: 0;
      right: 0;
      height: 500px;
      background-color: var(--main_bg);
      border-radius: 4px;
      padding: 15px 10px 0 10px;
    }
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
}

</style>
