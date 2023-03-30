<template>
  <div>

      <div style="margin: 10px 0">
          <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="username"></el-input>
          <el-button class="ml-5" type="primary" @click="search">搜索</el-button>
          <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
      </div>

      <div style="margin: 10px 0">
          <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
      </div>

      <div>
          <el-table :data="tableData">
              <el-table-column prop="id" label="ID" width="140"></el-table-column>
              <el-table-column prop="name" label="用户名" width="120"></el-table-column>
              <el-table-column prop="host" label="IP地址"></el-table-column>
              <el-table-column prop="cpuUse" laber="cpu占用"></el-table-column>
              <el-talble-column prop="ramUse" laber="交换空间使用"></el-talble-column>
              <el-talble-column prop="swapUse" laber="内存使用"></el-talble-column>
              <el-talble-column prop="diskUse" label="硬盘使用"></el-talble-column>
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
      </div>

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
      <div>
          <el-dialog title="新增主机" :visible.sync="dialogFormVisible" width="30%" >
              <el-form label-width="80px" size="small">
                  <el-form-item label="IP地址">
                      <el-input v-model="form.host" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="服务器名">
                      <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
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
      </div>

      <div>
          <el-dialog title="服务器信息" :visible.sync="dialog1FormVisible" width="30%">
              <el-form label-width="80px" size="small">
                  <el-form-item label="IP地址">
                      <el-input v-model="form.host" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="服务器名">
                      <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="用户名">
                      <el-input v-model="form.username" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                      <el-input v-model="form.password" autocomplete="off"></el-input>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button @click="dialog1FormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="edit">确 定</el-button>
              </div>
          </el-dialog>
      </div>
  </div>
</template>

<script>
export default {
    name: "Server",
    data() {
        return {
            tableData: [],
            total: 0,
            pageNum: 1,
            pageSize: 2,
            dialogFormVisible: false,
            dialog1FormVisible: false,
            username: '',
            form: {},
        }
    },

    created() {
        this.load()
    },

    methods: {
        load() {
            this.request.get("/server/page", {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                }
            }).then(res => {
                if(res.code === 1) {
                    this.tableData = res.data.records
                    this.total = res.data.total
                }else {
                    this.$message.error(res.msg)
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

        save() {
            this.request.post("/server", this.form).then(res => {
                if (res.code === 1) {
                    this.$message.success("保存成功")
                    this.dialogFormVisible = false
                } else {
                    this.$message.error("保存失败")
                }
            })
            this.load()
        },

        handleAdd() {
            this.dialogFormVisible = true
            this.form = {}
        },
        handleEdit(row) {
            this.form = {...row}
            this.dialog1FormVisible = true
        },
        edit() {
            this.request.put("/server", this.form).then(res => {
                if (res.code === 1) {
                    this.$message.success("保存成功")
                    this.dialog1FormVisible = false
                } else {
                    this.$message.error("保存失败");
                }
            })
            this.load()
        },
        handleDelete(id) {
            this.request.delete("/server/" + id).then(res => {
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