//封装用户的数据请求
import {request} from "./request";

export function getUserData() {
    return request({
        //请求后端用户信息接口
        url: 'json/userProfile'
    })
}
