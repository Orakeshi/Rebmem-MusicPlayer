<template>
  <!-- Iterate through songs and create a song component for each song-->
  <div class="playlists-container">
    <div class="playlist-item" v-for="playlist in playlists" :id="playlist.id" :key="playlist.id">
      <CreatePlaylist :playlist="playlist"></CreatePlaylist>
    </div>
  </div>
</template>

<script>
import CreatePlaylist from './CreatePlaylist'
export default {
  name: "Playlists",
  props: {
    playlists: Array,
  },
  components: {
    CreatePlaylist,
  },


}
</script>

<style scoped>
/* CSS styles for Songs component */
  .playlists-container{
    padding-bottom: 5%;
    margin: 0 auto;
  }
  .playlist-item{
    height: 50px;
    margin-bottom: 5px;
    width: 100%;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
  }

</style>