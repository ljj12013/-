import axios from 'axios'
//引入是路由插件
import router from '../router'

let http = axios.create()

//请求拦截
http.interceptors.request.use(config=>{
    // token失效的时候进行拦截

    return config
})

//响应拦截
http.interceptors.response.use(response=>{
        //后端掉线了 进行响应拦截
        console.log(response,'响应拦截')
        if(response.data.code == -1){
            console.log(router,'router')
            router.replace('/login')
            //router.push('/login')
        }
    return response
})

export default http