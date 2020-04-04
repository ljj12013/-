import http from './axiosConfig'
let getData = {}
//let baseUrl = "http://localhost:3000"
//改成代理服务器地址
let baseUrl = "/api"
//封装一个登陆接口
getData.login = (data)=>{
    return http.post(baseUrl+'/login',data)
}
//封装一个查询管理员接口
getData.findManger = (data)=>{
    return http.get(baseUrl + '/findManage',{
        params:data
    })
}
//封装一个添加管理员接口
getData.addM = (data)=>{
    return http.get(baseUrl + '/addManage',{
        params:data
    })
}
//封装一个删除管理员接口
getData.delManger = (data)=>{
    return http.get(baseUrl + '/delManage',{
        params:data
    })
}
//封装一个更新管理员接口
getData.updateManger = (data)=>{
    return http.get(baseUrl + '/updateManage',{
        params:data
    })

}
export default getData