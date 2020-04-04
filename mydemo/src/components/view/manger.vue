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
            <v-del :id="scope.row.id" @del="del"></v-del>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表单对话框 -->
      <add-manger ref='addManger' :showForm="showForm" :isAdd="isAdd" @cancel="cancel" @init="init"></add-manger>
    </div>
  </div>
</template>
<script>
//引入封装接口
import url from "../../util/api";
//引入封装的弹框
import comAlert from "../../util/alert";
//引入弹框
import addManger from "../pages/addManger";
export default {
  data() {
    return {
      tableData: [], //表格数据
      showForm: false, //显示隐藏对话框（表单）默认是false
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
      //this.empty();
    },
    //关闭弹框
    cancel(e) {
      this.showForm = e;
    },
    //查看当条数据详情
    lookInfo(id) {
      //这是一个修改事件
      this.isAdd = false;
      //弹出form弹框
      this.showForm = true;
      //把id传给子组件事件，直接调取子组件的函数方法
      this.$refs.addManger.findOne(id)
    },
    //调取子组件传递的自定义事件
    del(id) {
      console.log(id, "公共的子组件传值");
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
    }
    //删除事件
    /*     del(id) {
      this.$confirm("你确定要删除这个账号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
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
        })
        .catch(() => {
          comAlert.infoAlert(this,'已取消删除')
        });
    }, */
  },
  components: {
    addManger
  },
  //组件内部导航
  beforeRouteEnter (to, from, next) {
    console.log(localStorage.getItem('isAdmin'),'存储的值')
    if(localStorage.getItem('isAdmin')=='0'){
      next()
    }else{
      next('/index')
    }
  }
};
</script>
<style lang="" scoped>
.mLeft {
  margin-left: 25px;
}
</style>
