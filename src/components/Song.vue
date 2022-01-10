<template>
  <div class="song">
    <h3>{{ song.text }}</h3>
    <p>{{ song.name }}</p>
  </div>

</template>

<script>
export default {
  name: "Song",
  props: {
    song: Object,
  },
}
</script>

<style scoped>
.song {
  background: grey;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.song h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>