<template>
  <!-- Library elements -->
  <div id="test-container" class="playlist-songs-container">
    <Songs :songs="songs" :key="componentKey"></Songs>
    <div class="controls-blocker">

    </div>
  </div>
</template>

<script>
// Imports for component
import Songs from './Songs';

export default {
  name: "PlaylistSongsContainer",
  /***
   * Props needed for data to be passed from parent
   */
  props:  {
    title: String,
    playlist: Object
  },
  components: {
    Songs,
  },
  /***
   * Data needed for component
   * @returns {{songs: *[], allsongs: *[], componentKey: number}}
   */
  data(){
    return {
      songs: [],
      allsongs: [],
      componentKey: 0
    }
  },
  methods:{
    /***
     * Method handles reading library data
     * @param e
     */
    getSongs: function (e){
      this.allsongs = e
    },
    /***
     * Method updates song images and names on DOM load
     */
    updateCards(){
        console.log("here")
        this.$nextTick(function(){
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
    /***
     * Handles refreshing song container data when new playlist created
     */
    refreshContainer(){
      this.$nextTick(function(){
        this.forceRefresh();
        let songId = 1;

        let playlist = this.playlist
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
          songId += 1
        }
      })

    },

    /***
     * Handles refreshing song container data on existing playlists
     */
    createPlaylists(){
      this.forceRefresh();
      let songId = 1;
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

  /***
   * Handles checking what methods to run dependent on DOM status
   * If DOM complete -> It means new playlist
   * else it means existing playlist
   */
  mounted() {
    if(document.readyState === "complete") {
      this.refreshContainer()
      this.$nextTick(function (){
        this.updateCards()
      })
    }
    else{
      window.addEventListener("load", ()=>{
        this.createPlaylists()
        this.updateCards()
      })
    }
    // window.addEventListener("load", ()=>{
    //
    // })
    // this.refreshContainer()
    // this.updateCards()


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
