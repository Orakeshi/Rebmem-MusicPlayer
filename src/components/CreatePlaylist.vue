<template>
  <div v-on:click="openPlaylist" :key="componentKey" class="playlist">
    <div class="playlist-img">
      <img :id="'playlist'+playlist.id" v-bind:src="playlist.playlistimgdata">
    </div>

    <div class="playlist-name" id="playlist-name-container">
      <div id="playlist-text-parent">
        <p class="playlist-name" :id="'playlist-text'+playlist.id">{{playlist.title}}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Playlist",
  props: {
    playlist: Object
  },
  data(){
    return{
      componentKey: 0
    }
  },
  methods: {
    // Function used to adjust the controls picture and name when song clicked
    openPlaylist: function(){
      let playlist = document.getElementById("playlistmain"+this.playlist.id)
      window.emitter.emit('openplaylist', playlist)
    },
    forceRerender(){
      this.componentKey +=1;
    }
  },
  mounted() {
    window.addEventListener("load", ()=>{
      this.forceRerender()
      let playlistImg = document.getElementById('playlist'+this.playlist.id)
      let playlistText = document.getElementById('playlist-text'+this.playlist.id)

      playlistImg.setAttribute("src", this.playlist.playlistimgdata)
      playlistText.innerHTML = this.playlist.title
    })
  }
}
</script>

<style scoped>
  .playlist{
    position: relative;
    display: block;
    flex-flow: column;
    width: 100%;
    height: 100%;
    background: #1E272E;
    cursor: pointer;
    border: 1px solid grey;
  }
  .playlist-img{
    position: relative;
    float: right;
    width: 40%;
    height: 100%;
  }
  .playlist-img img{
    height: 100%;
    width: 100%;
  }
  #playlist-name-container{
    width: 50%;
    margin: 0;
    padding: 0;

  }
  .playlist-name{
    width: 50%;
    margin: 0;
    position: relative;
    left: 50%;
    transform: translate(-90%, -50%);
    padding: 0;
    color: white;
    font-size: 12px;
    top: 50%;
  }
</style>