<template>
  <!-- Library elements -->
  <div id="test-container" class="playlist-songs-container">
    <Songs :songs="songs" :key="componentKey"></Songs>
    <div class="controls-blocker">

    </div>
  </div>
<!--  <Library style="display: none" v-on:songs="getSongs($event)"></Library>-->
</template>

<script>
// Imports for component
import Songs from '../Songs/Songs';
// import Library from "@/components/UI/Library";

let newSongs;

/***
 * method handles updating song cards on click event
 */
window.updateAllCards = function (){
  console.log("doing")
  for (let i in newSongs){
    let currentSong = newSongs[i]
    let songCard = document.getElementById(currentSong.id)

    let allImg = songCard.getElementsByTagName('img');
    let allP = songCard.getElementsByTagName('p');

    allImg[0].setAttribute("src", currentSong.imgdata)
    allP[0].innerHTML = currentSong.title;
  }
}

export default {
  name: "PlaylistSongsContainer",
  /***
   * Props needed for data to be passed from parent
   */
  props:  {
    title: String,
    playlist: Object,
    allsongs: Array
  },
  components: {
    // Library,
    Songs,
  },
  /***
   * Data needed for component
   * @returns {{songs: *[], allsongs: *[], componentKey: number}}
   */
  data(){
    return {
      songs: [],
      //allsongs: [],
      componentKey: 0
    }
  },
  methods:{
    /***
     * Method handles reading library data
     * @param e
     */
    // getSongs: function (e){
    //   this.allsongs = e
    // },
    /***
     * Method updates song images and names on DOM load
     */
    updateCards(){
        this.$nextTick(function(){
          newSongs = this.songs
          for (let i in this.songs){
            let currentSong = this.songs[i]
            let songCard = document.getElementById(currentSong.id)

            let allImg = songCard.getElementsByTagName('img');
            let allP = songCard.getElementsByTagName('p');

            allImg[0].setAttribute("src", currentSong.imgdata)
            allP[0].innerHTML = currentSong.title;
          }
      })
    },

    forceRefresh(){
      this.componentKey +=1;
    },

    /***
     * Handles refreshing song container data on existing playlists
     */
    createPlaylists(){
      this.forceRefresh();
      let songId = 1;
      let playlist = this.playlist

      console.log(playlist)

      for (let i in playlist.songs) {
        let newSong = {
          id: "",
          title: "",
          imgdata: "",
          audiosrc: "",
        }

        newSong.title = playlist.songs[i].title;
        newSong.id = playlist.title+songId;
        let found = this.allsongs.find(item => item.title === newSong.title)
        console.log(found)
        if (found !=null) {
          let index = this.allsongs.indexOf(found)
          newSong.imgdata = this.allsongs[index].imgdata
        }
        else {
          newSong.imgdata = "../images/Large-Logo.png"
        }

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
      this.createPlaylists()
      this.updateCards()
    }
    else{
      window.addEventListener("load", ()=>{
        this.$nextTick(function (){
          this.createPlaylists()
          this.updateCards()
        })
      })
    }

  },
  created() {
    this.createPlaylists()
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
