<template>
  <div id="create-playlist-popup">
    <div id="popup-form">
      <textarea id="playlist-name" placeholder="Enter playlist name:"></textarea>

      <div id="add-songs-container">
        <div id="songs-add-parent">
          <div class="song-item" v-for="song in songs" :id="'popup'+song.id" :key="song.id" @click="selectSong('popup'+song.id, song)">
            <img id="song-select-img" :src="song.imgdata">
            <div id="song-title-parent">
              <p id="song-title">{{song.title}}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="confirm-playlist" style="cursor: pointer" @click="submitPlaylist()">
        <img src="../../../public/images/check.png" class="button">
      </div>

    </div>
  </div>
  <div id="library-parent">
<!--    <Library style="display: none" v-on:songs="getSongs($event)"></Library>-->
  </div>

</template>

<script>
// All imports and requires for component
// import Library from "../UI/Library";
const fs = window.require("fs")
const path = window.require("path")
const os = window.require("os").homedir()

const songFolder = path.join(os, 'Music')

export default {
  name: "PlaylistPopup",
  methods: {
    /***
     * handles getting all the songs from the library container
     * @param e
     */
    // getSongs: function (e){
    //   this.songs = e
    // },
    /***
     * Method handles highlighting song
     * Also handles pushing selected song to array ready to write to file
     * @param songId
     * @param song
     */
    selectSong: function (songId, song){
      let selectedSongId = document.getElementById(songId);
      if (this.selectedSongs.includes(song)){
        selectedSongId.style.backgroundColor = '#808E9B';

        let elementIndex = this.highlightedSongs.indexOf(selectedSongId);
        let index = this.selectedSongs.indexOf(song);

        if (elementIndex > -1){
          this.highlightedSongs.splice(elementIndex, 1)
        }

        if (index > -1){
          this.selectedSongs.splice(index, 1)
        }
      }
      else{
        selectedSongId.style.backgroundColor = 'green';
        this.highlightedSongs.push(selectedSongId)
        this.selectedSongs.push(song)
      }
    },
    /***
     * Responsible for writing playlist data to JSON file
     */
    submitPlaylist: function (){
      let playlistName = document.getElementById("playlist-name").value;

      if (playlistName == ""){
        console.log("Enter playlist name")
        return;
      }
      if (this.selectedSongs.length == 0){
        console.log("click songs please")
        return;
      }

      let playlistData = {
        id: window.playlistId,
        title: playlistName,
        playlistimgdata: "../images/Large-Logo.png",
        songs: []
      }
      window.playlistId +=1;

      for (let i in this.selectedSongs){
        let item = this.selectedSongs[i];

        playlistData.songs.push({
          "title": item.title,
          "audiosrc": item.audiosrc,
          "imgdata": item.imgdata
        })
      }
      let data = JSON.stringify(playlistData);
      fs.writeFileSync(songFolder+"/"+playlistName+"-"+"playlist.json", data)
      this.selectedSongs = [];

      for (let i in this.highlightedSongs){
        let currentTemp = this.highlightedSongs[i]
        currentTemp.style.backgroundColor = '#808E9B';
      }
      this.highlightedSongs = []
      window.emitter.emit("newplaylist", playlistData)
    },

    /***
     * Method is responsible for populating song images and names for selectable songs on popup
     */
    updateOptions(){
      this.$nextTick(function(){
        for (let i in this.songs){
          let currentSong = this.songs[i]
          let currentElement = document.getElementById("popup"+currentSong.id)

          this.$nextTick(function(){
            currentElement.getElementsByTagName('p')[0].innerHTML = currentSong.title
            currentElement.getElementsByTagName('img')[0].setAttribute("src", currentSong.imgdata)
          })
        }
      })
    }
  },
  /***
   * Handles loading song cards when create button is pressed
   */
  mounted() {
    window.addEventListener("load", ()=>{
      this.updateOptions()

    })
    let clicked = false
    document.getElementById("playlist-create-button").addEventListener("click", ()=>{
      if (clicked){
        return
      }
      else{
        clicked = true
        this.updateOptions()
      }

    })


  },
  props: {
    songs: Array
  },
  /***
   * Stores all array data needed for component
   * @returns {{highlightedSongs: *[], selectedSongs: *[], songs: *[]}}
   */
  data(){
    // Store array of song data
    return {
      //songs: [],
      selectedSongs: [],
      highlightedSongs: [],
    }
  },
  components: {
    // Library,
  }

}
</script>

<style scoped>
  .button:active {
    transform: translateY(4px);
  }
  #confirm-playlist{
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 20px;
  }
  #confirm-playlist img{
    height: 32px;
    width: 32px;
  }
  #create-playlist-popup{
    position: absolute;
    top: 10%;
    left: 50%;
    -ms-transform: translate(-50%, -10%);
    transform: translate(-50%, -0%);
    width: 50%;
    height: 50%;

    border-radius: 10px;
    display: block;
  }
  #popup-form{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
    background: #1E272E;
  }
  #songs-add-parent{
    height: 200px;
    width: 100%;
    position: relative;
    margin: 0;
    padding: 0;
    pointer-events: none;
  }

  #add-songs-container{
    height: 85%;
    width: 100%;
    border-radius: 10px;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
  }

  #add-songs-container::-webkit-scrollbar {
    width: 12px;
  }

  #add-songs-container::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
  }

  #add-songs-container::-webkit-scrollbar-thumb {
    background-color: #808E9B;
    border-radius: 6px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: content-box;
    min-width: 32px;
    min-height: 32px;
  }

  #add-songs-container::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
  .song-item{
    height: 50px;
    width: 100%;
    background: #808e9b;
    border: #1E272E 2px solid;
    cursor: pointer;
    pointer-events: auto;
  }
  p{
    margin: 0 auto;
    padding: 0;
  }
  #form-button-parents{
    background: pink;
    position: absolute;
    transform: translateX(-50%) translateY(-50%);
    left: 50%;
    bottom: 0;
  }
  .form-buttons{
    display: inline-flex;
    border-radius: 10px;
    margin-top: 10px;
    position: relative;
    background: yellow;
  }

  #playlist-name{
    position: relative;
    height: 35px;
    width: 100%;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    border-radius: 5px;
    resize: none;
    font-size: 20px;
  }
  ::placeholder{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
  }
  #song-select-img{
    width: 50px;
    height: 50px;
  }
  #song-title-parent{
    display: inline-block;
    position: relative;
    height: auto;
    width: auto;
    top: 0;
    margin-left: 5px;

    transform: translateY(-100%);
  }
  #song-title{
    position: relative;
    height: auto;
    color: white;
    font-size: 20px;
    width: auto;
  }
  #library-parent{
    display: none;
  }
</style>