<template>
  <!-- Iterate through songs and create a song component for each song-->
  <div class="songs-container" :key="componentKey">
    <div class="song-item" v-for="song in songs" :id="song.id" :key="song.id">
      <Song :songs="songs" :song="song"></Song>
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
  computed: {
    componentKey: function() {
      return "Hello BCS!"
    }
  },

}
</script>

<style scoped>
  /* CSS styles for Songs component */
  .songs-container{
    position: relative;
    top: 0;
    height: auto;

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