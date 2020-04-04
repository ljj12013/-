<template>
    <div>
              <el-dialog title="新增/修改管理员" :visible.sync="showForm" center>
        <el-form :model="form" :rules="rules" ref="formManger">
          <el-form-item label="账号" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" placeholder="请输入账号" :disabled="!isAdd"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
            <el-input v-model="form.pass" placeholder="请输入密码" :disabled="!isAdd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" v-if="isAdd" :label-width="formLabelWidth">
            <el-input v-model="comPass" placeholder="请输入确认密码"></el-input>
          </el-form-item>
          <el-form-item label="属性" prop="prop" :label-width="formLabelWidth">
            <el-input v-model="form.prop" placeholder="请输入属性"></el-input>
          </el-form-item>
          <el-form-item label="时间" prop="time" :label-width="formLabelWidth">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.time"></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="addManger">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
export default {
    props:['showForm'],
    data(){
        return{
                  showForm: false, //显示隐藏对话框（表单）默认是false
      form: {
        name: "", //账户
        pass: "", //密码
        prop: "", //属性
        time: "" //时间
      },
      comPass: "", //确认密码
      formLabelWidth: "120px",
      rules: {
        //表单输入框规则验证(工作的时候，到底是什么规则，是产品经理定)
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
        ],
        prop: [
          { required: true, message: "请输入属性", trigger: "blur" },
          { min: 1, max: 1, message: "只能输入一个字符", trigger: "blur" }
        ],
        time: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ]
      },
      isAdd: true //用于判断是否是新增
        }
    },
    methods: {

    //添加管理员账号
    addManger() {
      //进行判断，如果是修改就调取修改接口。如果是新增就调取新增接口
      if(this.isAdd){
      //要对表单进行规则判断
      this.$refs.formManger.validate(valid => {
        if (valid) {
          //成功逻辑
          //密码和确认密码进行匹配
          if (this.form.pass !== this.comPass) {
            comAlert.warningAlert(this, "两次密码不一致，请重新输入");
            return;
          } else {
            //先转换一下时间 转换成时间戳
            let params = this.form;
            console.log(params.time, "2222");
            params.time = new Date(params.time).getTime();
            console.log(params.time, "转化成时间戳");
            url
              .addM(this.form)
              .then(res => {
                console.log(res, "添加响应");
                if (res.data.isok) {
                  comAlert.successAlert(this, res.data.info);
                  //成功之后关闭对话框
                  this.showForm = false;
                  //调取查询接口
                  this.init();
                }else{
                  comAlert.warningAlert(this, res.data.info);
                }
              })
              .catch(err => {});
          }
        } else {
          //表单规则不正确的时候
          comAlert.warningAlert(this, "请输入必填项");
          return;
        }
      });
      }else{
        //调取更新接口
        url.updateManger({
          id:this.form.id,
          prop:this.form.prop
        })
        .then(res=>{
          console.log(res,'修改事件')
          if(res.data.isok){
            comAlert.successAlert(this,res.data.info)
            //更新成功之后 关闭弹框 并查询数据
            this.showForm= false
            this.init()
          }
        })
        .catch(err=>{

        })
      }

    },
        //取消事件
    cancel() {
      if (this.isAdd) {
        //关闭弹框
        this.showForm = false;
      } else {
        //关闭弹框之前 清除input框数据
        this.form = {
          name: "", //账户
          pass: "", //密码
          prop: "", //属性
          time: "" //时间
        };
        this.comPass=''
        //关闭弹框
        this.showForm = false;
      }
    },
    },
}
</script>
<style lang="">
    
</style>