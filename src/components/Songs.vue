<template>
  <div>
    <div :key="song.id" v-for="song in songs">
      <Song :song="song"></Song>
    </div>
  </div>
</template>

<script>
import Song from './Song'
export default {
  name: "Songs",
  props: {
    songs: Array,
  },
  components: {
    Song,
  }
}
</script>

<style scoped>
</style>