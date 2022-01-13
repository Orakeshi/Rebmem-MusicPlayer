<template>
  <div class="playlists-parent">
    <div id="playlist-selection-parent">
      <div id="playlist-creation-container">
        <CreatePlaylists :key="componentKey" id="create-playlist" :playlists="playlists"></CreatePlaylists>
      </div>
    </div>
    <div v-on:click="showPlaylist" id="playlist-create-button">
      <img id="show-menu" class="button" src="../../../public/images/plus.png">
      <img id="close-menu" class="button" src="../../../public/images/negative.png">
    </div>
    <div id="song-display-parent" :key="componentKey">
      <div style="display: none" v-for="playlist in playlists" :id="'playlistmain'+playlist.id" :key="playlist.id">
        <PlaylistSongsContainer ref="playlistSongContainer" :playlist="playlist"></PlaylistSongsContainer>
      </div>
    </div>
    <div id="playlist-popup">
      <PlaylistPopup></PlaylistPopup>
    </div>

  </div>
</template>

<script>
// All imports and requires
import CreatePlaylists from "./CreatePlaylists";
import PlaylistSongsContainer from "./PlaylistSongsContainer";
import PlaylistPopup from "./PlaylistPopup";

const fs = window.require("fs")
const path = window.require("path")
const os = window.require("os").homedir()
const songFolder = path.join(os, 'Music')

// Variables need for component
let showPlaylist = true
let playlistData="";

export default {
  name: "Playlists",
  components: {
    PlaylistPopup,
    PlaylistSongsContainer,
    CreatePlaylists,
  },
  /***
   * data needed for playlists
   * @returns {{playlists: *[]}}
   */
  data(){
    // Store array of song data
    return {
      playlists: [],
    }
  },
  computed: {
    componentKey: function() {
      return "Hello BCS!"
    }
  },
  methods: {
    /***
     * Method handles refreshing the song container for a new playlist
     */
    addPlaylistData(){
      if (playlistData !=""){
        window.emitter.emit("refreshLibrary")

        this.playlists.push(playlistData)
        // Reset playlist data and wait for new component
        playlistData = ""
        this.addPlaylistData()
        return
      }
      else {
        setTimeout(this.addPlaylistData, 200)
      }

    },

    /***
     * Method responsible for reading all playlist json file and storing in playlists array
     */
    loadPlaylistData(){
      this.addPlaylistData()
      window.playlistId = 1;

      fs.readdir(songFolder, (err, files) => {
        if(err){
          console.log(err);
        }
        else{
          files.forEach(file => {
            if (file.includes("playlist")){
              let newPlaylist = {
                id: window.playlistId,
                title: "",
                playlistimgdata: "../images/Large-Logo.png",
                songs: ""
              }
              fs.readFile(songFolder + "/" + file, "utf8", (err, jsonString) => {
                if (err) {
                  console.log("Error reading file from disk:", err);
                  return;
                }
                else{
                  try {
                    let playlist = JSON.parse(jsonString);
                    newPlaylist.songs = playlist.songs
                    newPlaylist.title = playlist.title
                  }
                  catch (err) {
                    console.log("Error parsing JSON string:", err);
                  }
                }

              });
              this.playlists.push(newPlaylist);
              window.playlistId += 1
            }
          });
        }

      })
    },
    forcedUpdate() {
      this.componentKey += 1;
    },
    /***
     * Handles showing popup container on button press
     */
    showPlaylist: function(){
      let playlistPopWindow = document.getElementById("playlist-popup")
      let closeMenuIcon = document.getElementById("close-menu")
      let openMenuIcon = document.getElementById("show-menu")
      if (showPlaylist){

        playlistPopWindow.style.display="block";

        closeMenuIcon.style.display="block"
        openMenuIcon.style.display="none"
      }
      else{
        playlistPopWindow.style.display="none";
        closeMenuIcon.style.display="none"
        openMenuIcon.style.display="block"
      }
      showPlaylist =! showPlaylist

    }
  },
  /***
   * Loads playlist data when component created
   */
  created()
  {
    this.loadPlaylistData()
  },
  /***
   * When component and DOM loads -
   * Listen for new playlist - Send data if created
   * Listen for playlist click - Open clicked playlist
   */
  mounted: function mounted() {
    let currentPlaylist ="";
      window.emitter.on('newplaylist', function (data){
        playlistData = data;
      })

      window.emitter.on("openplaylist", function (playlist){
        if (currentPlaylist != ""){
          currentPlaylist.style.display = "none"
        }
        currentPlaylist = playlist
        currentPlaylist.style.display="block"
      })
    }
}
</script>

<style scoped>
  .button:active {
    transform: translateY(4px);
  }

  h1{
    color: white;
  }
  p{
    color: white;
    font-size: 18px;
  }
  .playlists-parent{
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
  }
  #playlist-selection-parent{
    height: 100%;
    background-color: #1E272E;
    width: 150px;
    position: relative;
    float: left;
    margin: 0 auto;
    overflow: auto;
  }
  #create-playlist{
    position: relative;
    top: 0;
    padding: 0;
    margin: 0;
  }
  #song-display-parent{
    height: 100%;
    width: 80%;
    flex-grow: 1;
  }
  #created-playlists-container{
    height: 100%;
  }
  #create-playlist{
    width: 100%;
    height: 100%;
  }

  #playlist-create-button{
    height: 50px;
    position: absolute;
    bottom: 150px;
    right: 20px;
  }
  #playlist-creation-container{
    position: relative;
    width: 100%;
    height: 100%;
  }
  #playlist-create-button h2{
    color: white;
    cursor: pointer;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
  }

  #playlist-popup{
    display: none;
  }

  #show-menu{
    height: 32px;
    width: 32px;
    cursor: pointer;
  }
  #close-menu{
    height: 32px;
    width: 32px;
    display: none;
    cursor: pointer;
  }

  #playlist-selection-parent::-webkit-scrollbar {
    width: 12px;
  }

  #playlist-selection-parent::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
  }

  #playlist-selection-parent::-webkit-scrollbar-thumb {
    background-color: #808E9B;
    border-radius: 6px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: content-box;
    min-width: 32px;
    min-height: 32px;
  }

  #playlist-selection-parent::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }

</style>