<template>
  <button @click="handleClick" />
</template>

<script>
  export default {
    methods: {
      handleClick() {
        this.$http.get('/user').then(()=>{
          console.log('网络错误');
        })
      },
      handleClick2() {
        this.$http.get('/frgfser').then(()=>{
          console.log('网络错误');
        })
      }
    }
  }
</script>

<style>
</style>