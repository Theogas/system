<template>
  <div>

    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="name"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div>
      <el-upload action="http://localhost:8080/log/upload" :headers="headers" :show-file-list="false" :on-success="handleFileUploadSuccess" style="display: inline-block" >
        <el-button type="primary" class="ml-5">上传文件 <i class="el-icon-top"></i></el-button>
      </el-upload>
    </div>

    <div>
    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"  >
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="文件名称" prop="name"></el-table-column>
      <el-table-column label="文件大小(kb)" prop="size"></el-table-column>
      <el-table-column label="上传时间" prop="uploadTime"></el-table-column>
      <el-table-column label="下载"></el-table-column>
      <el-table-column label="操作"  width="200" align="center">
        <template slot-scope="scope">
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
let user;
user=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}
let token=user.token
export default {
  name: "log",
  data(){
    return{
      tableData: [],
      pageSize: 2,
      pageNum: 1,
      total: 0,
      headers: {token: token}
    }
  },
  created(){
    this.load()
  },
  methods: {
    load(){
      this.request.get("/log/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }}).then(res=> {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    handleFileUploadSuccess(){
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
    del(id){
      this.request.delete("/log/"+id).then(res => {
        if (res.code === 1) {
          this.$message.success("删除成功")
        } else {
          this.$message.error("删除失败")
        }
      })
      this.load()
    }
  }
}
</script>

<style scoped>

</style>