<template>
  <!-- vue on click used to iterate through each song data and create div elements -->
  <div v-on:click="playSong" class="song">
    <div class="song-img">
      <img v-bind:src="song.imgdata">
    </div>

    <div class="song-name" id="song-name-container">
      <div id="song-text-parent">
        <p>{{ song.title }}</p>
      </div>
    </div>

  </div>

</template>

<script>
const path = window.require("path")
const os = window.require("os").homedir()
const songFolder = path.join(os, 'Music')
export default {
  name: "Song",
  props: {
    song: Object
  },
  methods: {
    // Function used to adjust the controls picture and name when song clicked
    playSong: function(){
      console.log("DOING")
      //console.log(this.song.artist)
      console.log("HOWDY: "+songFolder+"/"+this.song.audiosrc);
      //document.getElementById("audio-player-test").crossOrigin = 'anonymous'
      document.getElementById("audio-player-test").setAttribute("src", "file:///"+songFolder+"/"+this.song.audiosrc)
      document.getElementById("song-img").setAttribute("src", this.song.imgdata)
      document.getElementById("song-name").innerHTML=this.song.title
      window.changeSong('play')
    }
  },
}
</script>

<style scoped>
  /* Styles for SONG component */
  .song {
    position: relative;
    display: block;
    flex-flow: column;
    width: 100%;
    height: 100%;
    background: #1E272E;
    cursor: pointer;
  }
  .song-img{
    position: relative;
    width: 100%;
    height: 75%;
  }
  .song-img img{
    height: 100%;
    width: 100%;
  }

  .song-name {
    position: relative;
    height: 25%;
    width: 100%;
    margin: 0 auto;
  }

  #song-text-parent{
    height: auto;
    width: 100%;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  #song-text-parent p{
    margin: 0;
    font-size: 13px;
    font-weight: bold;
    height: 100%;
    width: 100%;
    color: white;
    text-align: center;
  }


</style>