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
let titleToHighlight = "";
export default {
    name: 'SearchLibrary',
    components: {
      Library,
      Songs,
    },
  /***
   * Data needed for component
   * @returns {{songs: *[], songsearched: *[]}}
   */
    data(){
      // Store array of song data
      return {
        songs: [],
        songsearched: []
      }
    },
    methods: {
      /***
       * Populates array with library data
       * @param e
       */
      populateSongs(e){
        this.songs = e
      },
      /***
       * Handles updating the song cards for the searched songs
       */
      updateCards(){
        this.$nextTick(function (){
          for (let i in this.songsearched){
            let currentSong = this.songsearched[i]
            let songCard = document.getElementById(currentSong.id)

            let allImg = songCard.getElementsByTagName('img');
            let allP = songCard.getElementsByTagName('p');

            allImg[0].setAttribute("src", currentSong.imgdata)
            allP[0].innerHTML = currentSong.title;

            // Code below handles highlighting specific characters searched
            let innerHTML = allP[0].innerHTML
            let index = allP[0].innerHTML.toLowerCase().indexOf(titleToHighlight);
            if (index >= 0){
              innerHTML = innerHTML.substring(0, index) + "<span style='background-color: yellow; color: black'>" + innerHTML.substring(index,index+titleToHighlight.length) + "</span>" + innerHTML.substring(index + titleToHighlight.length);
              allP[0].innerHTML = innerHTML
            }
          }
        })
      },
      /***
       * Updates the container with the song components
       */
      updateView(){
        let songId =1

        for (let i in this.songs){
          let title = this.songs[i].title.toLowerCase()
          let songLower = songSearch.toLowerCase()
          titleToHighlight = songLower

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

            this.songsearched.push(newSong)
            songId +=1
          }

        }
        this.$nextTick(function (){
          this.updateCards()
          document.getElementById("library-container").style.display="none"
        })
      },
      /***
       * Handles Checking if a song has been searched for
       */
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
          // IF song searched. Update container view etc
          this.songsearched = []
          this.updateView()
          songSearch = ""
          this.checkData()
        }
      }
    },
  /***
   * Responsible for setting search container view to active or hidden dependent on search
   */
  mounted() {
    let searchedContainer = document.getElementById("search-library-container")
    let libraryContainer = document.getElementById("library-container")
    window.emitter.on("searchsong", function (songToSearch){
      searchedContainer.style.display="block"
      songSearch = songToSearch
    })
    window.emitter.on("resetsong", function (){
      searchedContainer.style.display="none"
      libraryContainer.style.display="block"
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
