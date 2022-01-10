<template>
  <header>
    <h1>{{ title }}</h1>
    <Button text="Hey" color = "green"></Button>
  </header>
</template>

<script>
import Button from './Button'
export default {
  name: 'Library',
  props:  {
    title: String,
  },
  components: {
    Button
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