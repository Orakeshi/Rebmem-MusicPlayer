<template>
  <!-- Iterate through songs and create a song component for each song-->
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
  /* CSS styles for Songs component */
  .songs-container{
    height: auto;
    width: auto;
    display: flex;
    padding-bottom: 500px;
  }
  .song-item{
    height: 100px;
    width: 100px;
    display: inline-flex;
    flex-wrap: wrap;
    margin: 10px 10px 10px 10px;
    justify-content: center;
  }

</style>