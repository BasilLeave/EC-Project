import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Diary from "../views/Diary";
import News from "../views/News";
import Market from "../views/Market";
import Login from "../views/Login";
import Sign from "../views/Sign";
import User from "../views/User";
import Identify from "../views/Identify";
import IdentifyVillager from "../views/IdentifyVillager";
import IdentifyOfficial from "../views/IdentifyOfficial";
Vue.use(VueRouter)


// 创建router实例 传入routes配置
export default new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: Index},
        {path: '/user/:username', component: User, name: 'user'},
        {path: '/news', component: News},
        {path: '/diary', component: Diary},
        {path: '/market', component: Market},
        {path: '/login', component: Login},
        {path: '/sign', component: Sign},
        {
            path: '/identify/:username',
            component: Identify,
            children: [
                {
                    path: 'villager',
                    component: IdentifyVillager,
                },
                {
                    path: 'official',
                    component: IdentifyOfficial
                }
            ]
        }
    ]
})
