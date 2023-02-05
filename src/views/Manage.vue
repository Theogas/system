<template>
  <el-container style="min-height: 100vh">
    <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246); box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
      <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow" />
    </el-aside>

    <el-container>
      <el-header style="font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px; display: flex">
        <div style="flex: 1; font-size: 20px">
          <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
        </div>
        <el-dropdown style="width: 70px; cursor: pointer">
          <span>王小虎</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item style="font-size: 14px; padding: 5px 0">个人信息</el-dropdown-item>
            <el-dropdown-item style="font-size: 14px; padding: 5px 0">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-header>

      <el-main>
        <div style="margin-bottom: 30px">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div style="margin: 10px 0">
          <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="username"></el-input>
          <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
          <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>

        <div style="margin: 10px 0">
          <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
        </div>
        <el-table :data="tableData">
          <el-table-column prop="id" label="ID" width="140">
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="120">
          </el-table-column>
          <el-table-column prop="updateTime" label="更新日期">
          </el-table-column>
          <el-table-column label="操作"  width="200" align="center">
            <template slot-scope="scope">
              <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
              <el-popconfirm
                  class="ml-5"
                  confirm-button-text='确定'
                  cancel-button-text='我再想想'
                  icon="el-icon-info"
                  icon-color="red"
                  title="您确定删除吗？"
                  @confirm="handleDelete(scope.row.id)"
              >
                <el-button type="danger" slot="reference" >删除 <i class="el-icon-remove-outline"></i></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div style="padding: 10px 0">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[1, 5, 10, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
        <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%" >
          <el-form label-width="80px" size="small">
            <el-form-item label="用户名">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="用户信息" :visible.sync="dialog1FormVisible" width="30%">
          <el-form label-width="80px" size="small">
            <el-form-item label="用户名">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item >
            <el-form-item label="密码">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialog1FormVisible = false">取 消</el-button>
            <el-button type="primary" @click="edit">确 定</el-button>
          </div>
        </el-dialog>

      </el-main>

  </el-container>
  </el-container>
</template>

<script>


import request from "@/utils/request";
import Aside from "@/components/Aside.vue"

export default {
  name: 'Home',
  components: {
    Aside
  },
  data() {
    return {
      tableData: [],
      total: 0,
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      pageNum: 1,
      pageSize: 2,
      username: '',
      form: {},
      dialogFormVisible: false,
      dialog1FormVisible: false,
    }
  },
  created() {
    this.load()
  },
  methods: {
    collapse() {  // 点击收缩按钮触发
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {  // 收缩
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      } else {   // 展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    },
    load(){
      request.get("/user/page",{
        params:{
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          username: this.username
        }
      }).then(res =>{

        this.tableData=res.records
        this.total=res.total
      })
    },

    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
    reset(){
      this.username=""
      this.load()
    },
    save(){
      console.log(this.form)
      request.post("/user",this.form).then(res =>{
        if(res){
          this.$message.success("保存成功")
          this.dialogFormVisible=false
        }else {
          this.$message.error("保存失败")
        }
      })
      this.load()
    },
    handleAdd(){
      this.dialogFormVisible=true
      this.form={}
    },
    handleEdit(row){
      this.form={...row}
      this.dialog1FormVisible=true
    },
    edit(){
      console.log(this.form)
      request.put("/user",this.form).then(res=>{
        if(res) {
          this.$message.success("修改成功")
        }else {
          this.$message.error("修改失败")
        }
      })
      this.load()
    },
    handleDelete(id){
      request.delete("/user/"+id).then(res=>{
        if(res){
          this.$message.success("删除成功")
        }else {
          this.$message.error("删除失败")
        }
      })
      this.load()
    }
  }
}
</script>