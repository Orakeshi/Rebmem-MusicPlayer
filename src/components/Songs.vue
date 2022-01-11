<template>
  <div class="songs-container">
    <div class="song-item" v-for="song in songs" :key="song.id">
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
  },


}
</script>

<style scoped>
.songs-container{
  padding-bottom: 5%;
  margin: 0 auto;
}
.song-item{
  height: 150px;
  width: 150px;
  display: inline-flex;
  flex-wrap: wrap;
  margin: 10px 10px 10px 10px;
  justify-content: center;
}

</style>