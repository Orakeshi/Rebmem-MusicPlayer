<template>
  <!-- Library elements -->
  <div id="test-container" class="playlist-songs-container">
    <Songs :songs="songs" :key="componentKey"></Songs>
    <div class="controls-blocker">

    </div>
  </div>
</template>

<script>
// Import VUE component and packages needed
import Songs from './Songs';

export default {
  name: "PlaylistSongsContainer",
  props:  {
    title: String,
    playlist: Object
  },
  components: {
    Songs,
  },
  data(){
    // Store array of song data
    return {
      songs: [],
      allsongs: [],
      componentKey: 0
    }
  },
  methods:{
    getSongs: function (e){
      this.allsongs = e
    },
    updateCards(){
      window.addEventListener("load", ()=>{
        console.log("Pass Card #1")
        for (let i in this.songs){
          let currentSong = this.songs[i]
          console.log(currentSong)
          let songCard = document.getElementById(currentSong.id)
          //console.log(songCard)
          let allImg = songCard.getElementsByTagName('img');
          let allP = songCard.getElementsByTagName('p');


          allImg[0].setAttribute("src", currentSong.imgdata)
          // Set Names
          allP[0].innerHTML = currentSong.title;
        }
      })
    },
    updateNewCards(){
      this.$nextTick(function(){
        console.log("Pass Card #2")
        for (let i in this.songs){
          let currentSong = this.songs[i]
          console.log(currentSong)
          let songCard = document.getElementById(currentSong.id)
          //console.log(songCard)
          let allImg = songCard.getElementsByTagName('img');
          let allP = songCard.getElementsByTagName('p');

          allImg[0].setAttribute("src", currentSong.imgdata)
          // Set Names
          allP[0].innerHTML = currentSong.title;
        }
      })
  },

    forceRefresh(){
      this.componentKey +=1;
    },
    refreshContainer(){
      this.forceRefresh();
      let songId = 1;
      console.log(songId)

      let playlist = this.playlist
      console.log(playlist)
      for (let i in playlist.song) {
        let newSong = {
          id: "",
          title: "",
          imgdata: "",
          audiosrc: "",
        }

        newSong.id = "playlist-test"+this.playlist.id+songId;
        newSong.title = playlist.song[i].title;
        newSong.imgdata = "../images/Large-Logo.png"
        newSong.audiosrc = playlist.song[i].audiosrc;

        this.songs.push(newSong);
        console.log(newSong)
        songId += 1
      }
      console.log(this.songs)
      this.updateNewCards()
    },

      createPlaylists(){
        this.forceRefresh();
        let songId = 1;
        console.log(songId)

        let playlist = this.playlist

        for (let i in playlist.songs) {
          let newSong = {
            id: "",
            title: "",
            imgdata: "",
            audiosrc: "",
          }

          newSong.id = "playlist-test"+this.playlist.id+songId;
          newSong.title = playlist.songs[i].title;
          newSong.imgdata = "../images/Large-Logo.png"
          newSong.audiosrc = playlist.songs[i].audiosrc;

          this.songs.push(newSong);
          songId += 1
        }
      }
  },

  mounted() {
    console.log(this.playlist)

    window.addEventListener("load", ()=>{
      this.createPlaylists()
    })
    this.refreshContainer()
    this.updateCards()


  }
}
</script>

<style scoped>
/* CSS styles for the library container */
header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 10px;
}
.library-songs-container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: #485460;
}

#test-img{
  width: 100%;
  height: 100%;
  position: absolute;
}
#library-container{
  display: none;
}
</style>
