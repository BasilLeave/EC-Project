<!--首页-->
<template>
  <div id="index">
    <div class="left_inner">
      <div class="left_nav">
        <div class="brand">
          <a href="/"><img src="../../public/images/nav/icon.png" alt=""></a>
        </div>
        <ul>
          <li><router-link :to="{name:'index', params: {username: '12'}}">首页</router-link></li>
          <li><router-link to="/news">新闻</router-link></li>
          <li><router-link to="/diary">日记</router-link></li>
          <li><router-link to="/market">市场</router-link></li>
        </ul>
      </div>
    </div>
<!--    1.导航栏-->
    <nav>
        <div class="right">
          <slot name="mynav">
            <div>
              <img :src="theme > 0 ? imgSources[1] : imgSources[0]" alt="" @click="setTheme">
              <a href="/login">登录</a>
              <a href="/sign">注册</a>
            </div>
          </slot>


<!--        <router-link to="/login">登录</router-link>-->
<!--        <router-link to="/login">注册</router-link>-->
        </div>
    </nav>
<!--    2.轮播图-->
    <header>
      <div>
        <Carousel :imgSource="banner"></Carousel>
      </div>
    </header>
    <main>
      <slot>
        <div class="main">
          <div class="left">
            <div class="card allArticle">
              <div class="title">
                <h2>新闻</h2>
              </div>
              <div class="body">
<!--                新闻列表-->
                <ul>
                  <li>
                    <div class="left">
                      <div>
                        <img src="http://www.fengfengzhidao.com/media/article_img/31.jpg" alt="">
                      </div>
                    </div>
                    <div class="right">
                      <h2>
                        <a href="">文章标题</a>
                      </h2>
                      <p>
                        前后端分离项目部署前后端项目分别开发完成之后，我们可以选择两种部署方式，第一种就是将前端生成的文件放到后端中，由后端去部署到服务器中
                      </p>
                      <div class="article_info">
                        <span>
                          <i class="fa fa-clock-o"></i>2022-12-9
                        </span>
                        <span>
                          <i class="fa fa-thumbs-up"></i>169
                        </span>
                        <span>
                          <i class="fa fa-eye"></i>111
                        </span>
                        <span>
                          <i class="fa fa-comments"></i>1
                        </span>
                        <span>
                          <i class="fa fa-star-half-o"></i>0
                        </span>
                      </div>
                      <a href="">查看详情</a>
                    </div>
                  </li>
                </ul>
                <ul>
                  <li>
                    <div class="left">
                      <div>
                        <img src="http://www.fengfengzhidao.com/media/article_img/31.jpg" alt="">
                      </div>
                    </div>
                    <div class="right">
                      <h2>
                        <a href="">文章标题</a>
                      </h2>
                      <p>
                        前后端分离项目部署前后端项目分别开发完成之后，我们可以选择两种部署方式，第一种就是将前端生成的文件放到后端中，由后端去部署到服务器中
                      </p>
                      <div class="article_info">
                        <span>
                          <i class="fa fa-clock-o"></i>2022-12-9
                        </span>
                        <span>
                          <i class="fa fa-thumbs-up"></i>169
                        </span>
                        <span>
                          <i class="fa fa-eye"></i>111
                        </span>
                        <span>
                          <i class="fa fa-comments"></i>1
                        </span>
                        <span>
                          <i class="fa fa-star-half-o"></i>0
                        </span>
                      </div>
                      <a href="">查看详情</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="card hotList">
              <div class="title">
                <h2>今日热搜</h2>
                <div>
                  <a href="#">查看更多</a>
                </div>
              </div>
              <div class="body">
                <ul>
                  <li>
                    <span>1</span>
                    <a href="https://s.weibo.com/weibo?q=%23%E7%9F%AD%E9%81%93%E9%80%9F%E6%BB%91%E7%94%B7%E5%AD%901500%E7%B1%B3%E9%BB%84%E5%A4%A7%E5%AE%AA%E8%8E%B7%E5%BE%97%E9%87%91%E7%89%8C%23&amp;Refer=top">短道速滑男子1500米黄大宪获得金牌</a>
                  </li>
                  <li>
                    <span>2</span>
                    <a href="https://s.weibo.com/weibo?q=%23%E7%9F%AD%E9%81%93%E9%80%9F%E6%BB%91%E7%94%B7%E5%AD%901500%E7%B1%B3%E9%BB%84%E5%A4%A7%E5%AE%AA%E8%8E%B7%E5%BE%97%E9%87%91%E7%89%8C%23&amp;Refer=top">短道速滑男子宪获得金牌</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </slot>
    </main>
    <footer>
      <div>
        <p class="thank">Thank For</p>
        <p class="site">
          <span><img src="../../public/images/footer/tencent.png" alt="">腾讯云服务器</span>
          <span><img src="../../public/images/footer/tencent.png" alt="">腾讯云SSL证书</span>
        </p>
        <p>建站日期：2022-2-5</p>
      </div>
    </footer>
  </div>
</template>

<script>

import {getHomePicData} from "../network/home";
import Carousel from "../components/Carousel";

export default {
  components: {
    Carousel
  },
  data(){
    return {
      imgSources: [require("../../public/images/nav/light.svg"), require("../../public/images/nav/dark.svg")],
      theme: 0, // 0表示白天 1表示黑夜
      // pics: [
      //   {url: require("../../public/images/header/1.jpg")},
      //   {url: require("../../public/images/header/2.jpg")},
      //   {url: require("../../public/images/header/3.png")}
      // ],
      banner: []
    }
  },
  created(){
    // 1.读取localStorage存储的配置信息
    let pathName = '/CSS/theme/' + localStorage.getItem('Theme') + '.css';
    if(pathName)
    {
      document.getElementById('theme').setAttribute('href', pathName);
    }

    //2.请求首页数据 轮播图
    getHomePicData().then(res=>{
      this.banner = res.data.banner.list
      console.log(res.data.banner)
    })
  },
  methods: {
    setTheme() {
      let pathName = "";
      let themeColor = "";
      if(this.theme) //由黑夜转为白天
      {
        pathName = '/CSS/theme/light.css';
        themeColor = "light";
        // 图标和主题转为白天
        this.imgSource = "../../public/images/nav/light.svg"
        this.theme = 0;
      }else { //由白天转为黑夜
        pathName = '/CSS/theme/dark.css'
        themeColor = "dark"
        // 图标和主题转为黑夜
        this.imgSource = "../../public/images/nav/dark.svg"
        this.theme = 1;
      }
      document.getElementById('theme').setAttribute('href', pathName);
    //  持久化存储 避免刷新后回到最初设置的主题
      localStorage.setItem('Theme', themeColor);
    }
  }
}
</script>
<style scoped lang="scss">
@import "../assets/sass/index";

</style>
<style>

</style>
