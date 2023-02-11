<template>
  <div style="width: 500px; padding: 20px;border: 1px solid #ccc">
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

  </div>
</template>

<script>
export default {
  name: "Person",
  data() {
    return {
      form: {}
    }
  },
  methods :{
    save() {
      this.request.post("/user",this.form).then(res =>{
        if(res){
          this.$message.success("保存成功")
        }else {
          this.$message.error("保存失败")
        }
      })
    }
  }

}
</script>

<style scoped>

</style>