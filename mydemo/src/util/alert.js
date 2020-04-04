//针对已经封装好的elementUI弹框进行二次封装
//成功时候的弹框
function successAlert(that,info){
    that.$message({
        message: info,
        type: 'success'
      });
}
//警告弹框
function warningAlert(that,info){
    that.$message({
        message: info,
        type: 'warning'
      });
}
//错误弹框
function errAlert(that,info){
    that.$message.error(info);
}
//信息弹框
function infoAlert(that,info){
    that.$message({
        message: info,
        type: 'info'
      });
}
export default {
    successAlert,
    warningAlert,
    errAlert,
    infoAlert
}
