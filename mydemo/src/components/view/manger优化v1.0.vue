<template>
  <div>
    <div class="mLeft">
      <el-button @click="showDialog" type="primary" size="small">新增</el-button>
      <!-- 表格渲染 -->
      <el-table :data="tableData" border>
        <el-table-column fixed prop="name" label="账户"></el-table-column>
        <el-table-column prop="pass" label="密码"></el-table-column>
        <el-table-column label="属性" width="120">
          <template slot-scope="scope">
            <div>
              <!-- 根据后端提供的不同value值渲染不同内容 -->
              <div v-if="scope.row.prop==0">超级管理员</div>
              <div v-if="scope.row.prop==1">普通管理员</div>
              <div v-if="scope.row.prop==2">用户</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">{{scope.row.time | toTime}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="lookInfo(scope.row.id)" type="primary" size="small">查看</el-button>
            <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表单对话框 -->
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
  </div>
</template>
<script>
//引入封装接口
import url from "../../util/api";
//引入封装的弹框
import comAlert from "../../util/alert";
export default {
  data() {
    return {
      tableData: [], //表格数据
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
            trigger: "blur" //优化的是点击这个查看之后取消再点新增，日期变更会报红
          }
        ]
      },
      isAdd: true //用于判断是否是新增
    };
  },
  mounted() {
    //组件一加载就调取接口(查询管理员)
    this.init();
  },
  methods: {
    //初始化
    init() {
      //调取查询管理员接口
      url
        .findManger()
        .then(res => {
          console.log(res, "查询结果");
          if (res.data.isok) {
            comAlert.successAlert(this, res.data.info);
            this.tableData = res.data.data;
          } else {
            comAlert.warningAlert(this, res.data.info);
          }
        })
        .catch(err => {});
    },
    //点击新增，出现对话框
    showDialog() {
      //确定当前是新增事件
      this.isAdd = true;
      this.showForm = true;
      //点击新增的时候 让form为空
      this.empty();
    },
    //添加管理员账号
    addManger() {
      //进行判断，如果是修改就调取修改接口。如果是新增就调取新增接口
      if (this.isAdd) {
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
      } else {
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
              //更新成功之后 关闭弹框 并查询数据
              this.showForm = false;
              this.init();
            } else {
              //未成功的状态下 提供的提示
              comAlert.warningAlert(this, res.data.info);
            }
          })
          .catch(err => {});
      }
    },
    //查看当条数据详情
    lookInfo(id) {
      //这是一个修改事件
      this.isAdd = false;
      //弹出form弹框
      this.showForm = true;
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
    },
    //取消事件
    cancel() {
      //清空所有输入框
      this.empty();
      //关闭这个对话框
      this.showForm = false;
    },
    //删除事件
    del(id) {
      //调取删除接口
      url
        .delManger({ id })
        .then(res => {
          console.log(res, "删除结果");
          if (res.data.isok) {
            comAlert.successAlert(this, res.data.info);
            //调取查询列表
            this.init();
          } else {
            comAlert.warningAlert(this, res.data.info);
          }
        })
        .catch(err => {});
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
    }
  }
};
</script>
<style lang="" scoped>
.mLeft {
  margin-left: 25px;
}
</style>
