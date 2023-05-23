<template>
<div>
    <div style="margin: 10px 0">
        <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="name"></el-input>
        <el-button class="ml-5" type="primary" @click="search">搜索</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
        <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
    </div>

    <div>
        <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"  >
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="规则名" prop="name"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="规则内容" prop="content"></el-table-column>
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
                        @confirm="delete(scope.row.id)"
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
                :page-sizes="[2, 5, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>

    <div>
        <el-dialog title="新增规则" :visible.sync="dialogFormVisible" width="30%" >
            <el-form label-width="80px" size="small">
                <el-form-item label="规则名">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="规则内容">
                    <el-input v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
    </div>

    <div>
        <el-dialog title="修改规则" :visible.sync="dialog1FormVisible" width="30%">
            <el-form label-width="80px" size="small">
                <el-form-item label="规则名">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item >
                <el-form-item label="规则内容">
                    <el-input v-model="form.content" autocomplete="off"></el-input>
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
    name: "Rule",
    data() {
        return {
            tableData: [],
            total: 0,
            pageNum: 1,
            pageSize: 2,
            form: {},
            dialogFormVisible: false,
            dialog1FormVisible: false,
            name: '',
        }
    },
    created() {
        this.load()
    },
    methods:{
        load() {
            this.request.get("/rule/page",{
                params:{
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }
            }).then(res =>{
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

        save(){
            this.request.post("/rule",this.form).then(res =>{
                if(res.code === 1){
                    this.$message.success("保存成功")
                    this.dialogFormVisible = false
                }else {
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
            this.request.put("/rule",this.form).then(res =>{
                if (res.code === 1) {
                    this.$message.success("保存成功")
                    this.dialog1FormVisible = false
                } else {
                    this.$message.error("保存失败");
                }
            })
            this.load()
        },

        delete(id){
            this.request.delete("/rule/"+id).then(res =>{
                if (res.code === 1) {
                    this.$message.success("删除成功")
                } else {
                    this.$message.error("删除失败")
                }
            })
            this.load()
        },

        reset(){
            this.name=  ''
        },

        search(){
            this.request.get("/rule/search",{
                params:{
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    name: this.name
                }
            }).then(res =>{
                if(res.code === 1) {
                    this.tableData = res.data.records
                    this.total = res.data.total
                }else {
                    this.$message.error(res.msg)
                }
            })
        }


    }
}
</script>

<style scoped>

</style>