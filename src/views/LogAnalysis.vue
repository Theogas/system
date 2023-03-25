<template>

</template>

<script>
let user;
user=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}
let token=user.token
export default {
  name: "LogAnalysis",
  data(){
    return {

    }
  },
  created() {
    this.load()
  },
  methods: {
    load(){
      this.request.get()
    }
  }
}
</script>

<style scoped>

</style>