<template>
  <div v-on:click="playSong" class="song">
    <div class="song-img">
<!--      <img :src="image">-->
      <img v-bind:src="song.imgdata">
    </div>

    <div class="song-name" id="song-name-container">
      <div id="song-text-parent">
        <p>{{ song.title }}</p>
      </div>
    </div>
    <!--<h3>{{ song.text }}</h3>-->
  </div>

</template>

<script>
/*import image from "./public/images/placeholder-song.png"*/

export default {
  name: "Song",
  props: {
    song: Object
  },
  methods: {
    playSong: function(event){
      console.log("DOING")
      //console.log(this.song.artist)
      console.log("HOWDY: "+this.song.audiosrc);
      document.getElementById("audio-player-test").setAttribute("src", this.song.audiosrc)
      document.getElementById("song-img").setAttribute("src", this.song.imgdata)
      document.getElementById("song-name").innerHTML=this.song.title
      changeSong('play')
    }
  },
  /*data: function (){
    return {
      image: image
    }
  }*/
}
</script>

<style scoped>
.song {
  position: relative;
  display: block;
  flex-flow: column;
  width: 100%;
  height: 100%;
  background: #1E272E;
  cursor: pointer;
  border: 1px solid red;
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
  border: blue 1px solid;
  height: 25%;
  width: 100%;
  margin: 0 auto;
}

#song-text-parent{
  height: auto;
  width: 100%;
  margin: 0;
  position: absolute;
  border: 1px solid yellow;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
#song-text-parent p{
  margin: 0;
  font-size: 13px;
  font-weight: bold;
  border: 1px solid green;
  height: 100%;
  width: 100%;
  color: white;
  text-align: center;
}


</style>