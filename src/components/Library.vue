<template>
  <header>
    <h1>Library</h1>
  </header>
</template>

<script>
export default {
  name: 'Library',
  props:  {
    title: String,
  }
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 10px;
}
</style>