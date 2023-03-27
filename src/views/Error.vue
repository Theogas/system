<template>
  <div>

    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入日志名称" suffix-icon="el-icon-search" v-model="name"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div>
      <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"  >
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="日志名称" prop="name"></el-table-column>
        <el-table-column label="日志内容" prop="message"></el-table-column>
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
export default {
  name: "Error",
  data(){
    return{
      tableData: [],
      pageSize: 2,
      pageNum: 1,
      total: 0,
      name: '',
    }
  },
  created() {
  },
  methods: {
    load() {
      this.request.get("/error/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
        }
      }).then(res => {
        if(res.code === 1){
          this.$message.success("查询成功")
          this.tableData = res.data.records
          this.total = res.data.total
        }else {
          this.$message.error("查询失败")
        }
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

    reset() {
      this.name = ''
      this.load()
    },
  }
}
</script>

<style scoped>

</style>