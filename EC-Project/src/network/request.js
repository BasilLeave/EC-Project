import axios from 'axios'
export function request(config)
{
    //1.创建axios的实例
    const instance = axios.create({
        baseURL: 'http://ec.vaiwan.cn',
        timeout: 5000
    })
    //2.axios的拦截器

    // 请求拦截器
    // 作用：某些网络请求（比如登录(token)），必须携带一些特殊的信息
    // instance.interceptors.request.use(config => {console.log(config); return config}, err=>{console.log(err)})

    // 响应拦截器
    instance.interceptors.response.use(res=>{console.log(res); return res.data}, err=>console.log(err))
    return instance(config)
}
