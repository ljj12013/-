<template>
  <div>
    <el-dialog :title="isAdd ?'新增管理员':'修改管理员'" :visible.sync="showForm" center>
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
        <el-button type="primary" @click="addManger" v-if="isAdd">确 定</el-button>
        <el-button type="primary" @click="upManger" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//引入封装接口
import url from "../../util/api";
//引入封装的弹框
import comAlert from "../../util/alert";
export default {
  props: ["showForm", "isAdd"],
  data() {
    return {
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
            trigger: "blur" //优化的是点击这个查看之后取消再点新增，日期变更会报红
          }
        ]
      }
    };
  },
  methods: {
    //添加管理员账号
    addManger() {
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
            params.time = new Date(params.time).getTime();
            url
              .addM(this.form)
              .then(res => {
                console.log(res, "添加响应");
                if (res.data.isok) {
                  comAlert.successAlert(this, res.data.info);
                  //关闭这个对话框(子组件修改父组件的值showForm)
                  this.$emit("cancel", false);
                  //调取查询接口
                  this.$emit("init");
                  //提交之后清空本组件的输入框
                  this.empty();
                } else {
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
    },
    //更新事件
    upManger() {
      //调取更新接口
      //先转换一下时间 转换成时间戳
      let params = this.form;
      params.time = new Date(params.time).getTime();
      url
        .updateManger(params)
        .then(res => {
          console.log(res, "修改事件");
          if (res.data.isok) {
            comAlert.successAlert(this, res.data.info);
            //关闭这个对话框(子组件修改父组件的值showForm)
            this.$emit("cancel", false);
            //调取查询接口
            this.$emit("init");
            //提交之后清空本组件的输入框
            this.empty();
          } else {
            //未成功的状态下 提供的提示
            comAlert.warningAlert(this, res.data.info);
          }
        })
        .catch(err => {});
    },
    //取消事件
    cancel() {
      //清空所有输入框
      this.empty();
      //关闭这个对话框(子组件修改父组件的值showForm)
      this.$emit("cancel", false);
    },
    //清空函数
    empty() {
      //清空输入框内容
      this.form = {
        name: "", //账户
        pass: "", //密码
        prop: "", //属性
        time: "" //时间
      };
      //清空二次密码
      this.comPass = "";
    },
    //查询单条数据
    findOne(id) {
      //调取查询接口
      url
        .findManger({ id })
        .then(res => {
          console.log(res, "当前这条数据");
          if (res.data.isok) {
            //把form表单赋值
            this.form = res.data.data[0];
            //转换一下时间
            this.form.time = new Date(parseInt(this.form.time)).getTime();
            //删除唯一 _id
            delete this.form._id;
          } else {
            comAlert.warningAlert(this, res.data.info);
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="" scoped>
/* .el-dialog__headerbtn{
    display: none !important;
} */
</style>