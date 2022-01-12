<template>
  <!-- Library elements -->
  <div class="library-songs-container">
    <Songs :songs="songsearched"></Songs>
    <div class="controls-blocker">
    </div>
    <Library style="display: none" v-on:songs=populateSongs($event)></Library>
  </div>

</template>

<script>
// Import VUE component and packages needed
import Songs from '../Songs/Songs';
import Library from "@/components/UI/Library";

let songSearch = "";

export default {
    name: 'SearchLibrary',
    components: {
      Library,
      Songs,
    },
    data(){
      // Store array of song data
      return {
        songs: [],
        songsearched: []
      }
    },
    methods: {
      populateSongs(e){
        this.songs = e
      },
      updateCards(){
        console.log("in sir")
        this.$nextTick(function (){
          for (let i in this.songsearched){
            let currentSong = this.songsearched[i]
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
      updateView(){
        let songId =1
        console.log(songSearch)
        for (let i in this.songs){
          let title = this.songs[i].title.toLowerCase()
          let songLower = songSearch.toLowerCase()
          if (title.includes(songLower)){
            let newSong = {
              id: "search-song"+songId,
              imgdata: "",
              title: "",
              audiosrc: ""
            }
            newSong.imgdata = this.songs[i].imgdata
            newSong.title = this.songs[i].title
            newSong.audiosrc = this.songs[i].audiosrc

            console.log(newSong)
            this.songsearched.push(newSong)
            songId +=1
          }

        }
        this.$nextTick(function (){
          this.updateCards()
          document.getElementById("library-container").style.display="none"
        })
      },
      checkData(){
        if (songSearch == "resetsongs"){
          this.songsearched = []
          songSearch = ""
          this.checkData()
        }
        if (songSearch == ""){
            setTimeout(()=>{
              this.checkData()
            }, 500)
        }
        else{
          this.songsearched = []
          this.updateView()
          songSearch = ""
          this.checkData()
        }
      }
    },
  mounted() {
    window.emitter.on("searchsong", function (songToSearch){
      document.getElementById("search-library-container").style.display="block"
      songSearch = songToSearch
      console.log(songSearch)
    })
    window.emitter.on("resetsong", function (){
      document.getElementById("search-library-container").style.display="none"
      document.getElementById("library-container").style.display="block"
      songSearch = "resetsongs"
    })
    this.checkData()
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
</style>
