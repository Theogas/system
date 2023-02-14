<template>
  <el-card style="width: 500px; border: 1px solid #ccc">
    <el-form label-width="80px" size="small">
      <el-form-item label="用户名">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item >
      <el-form-item label="密码">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="save"></el-button>
      </el-form-item>
    </el-form>

  </el-card>
</template>

<script>
export default {
  name: "Person",
  created() {
    this.get()
  },
  data() {
    return {
      form: {},
      user: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")): {}
    }
  },
  methods :{
    save() {
      this.request.post("/user",this.form).then(res =>{
        if(res.code===1){
          this.$message.success("保存成功")
        }else {
          this.$message.error("保存失败")
        }
      })
    },
    get(){
      let sendId=0;
      if(this.user.id!=null){
        sendId=this.user.id
      }
      this.request.get("/user/"+sendId).then(res =>{
        if(res.code === 1){
          this.form=res.data
        }
      })
    }

  }

}
</script>

<style scoped>

</style>