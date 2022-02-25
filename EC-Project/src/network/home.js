// 封装首页的数据请求
import {request} from "./request";

export function getHomePicData() {
    return request({
        url: '/json/carousel'
    })
}
