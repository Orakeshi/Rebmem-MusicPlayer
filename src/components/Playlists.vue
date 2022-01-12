<template>
  <div class="playlists-parent">
    <div id="playlist-selection-parent">
      <div id="playlist-creation-container">
        <div v-on:click="showPlaylist" id="playlist-create-button">
          <h2>create</h2>
        </div>
        <CreatePlaylists :key="componentKey" id="create-playlist" :playlists="playlists"></CreatePlaylists>
      </div>

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
import CreatePlaylists from "./CreatePlaylists";
import PlaylistSongsContainer from "./PlaylistSongsContainer";
import PlaylistPopup from "./PlaylistPopup";

const fs = window.require("fs")
const path = window.require("path")
const os = window.require("os").homedir()
//
const songFolder = path.join(os, 'Music')

let showPlaylist = true
let playlistData="";
//let createButton = document.getElementById("playlist-create-button")

export default {
  name: "Playlists",
  components: {
    PlaylistPopup,
    PlaylistSongsContainer,
    CreatePlaylists,
  },
  data(){
    // Store array of song data
    return {
      playlists: [],
    }
  },
  computed: {
    componentKey: function() {
      return "yay"
    }
  },
  methods: {
    addPlaylistData(){
      if (playlistData !=""){
        console.log(playlistData)
        console.log(playlistData.id)
        window.emitter.emit("refreshLibrary")
        this.playlists.push(playlistData)
        console.log("waitin in here")
        playlistData = ""
        this.addPlaylistData()
        return
      }
      else {
        setTimeout(this.addPlaylistData, 200)
      }

    },

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
              //console.log("doing")
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
                    newPlaylist.songs = playlist.song
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
            else{
              //console.log("not audio")
            }
          });
        }

      })
    },
    forcedUpdate() {
      this.componentKey += 1;
    },
    // Function used to adjust the controls picture and name when song clicked ff
    showPlaylist: function(){
      //this.addDiv()
      //this.loadPlaylistData()
      if (showPlaylist){
        document.getElementById("playlist-popup").style.display="block";
      }
      else{
        document.getElementById("playlist-popup").style.display="none";
      }
      showPlaylist =! showPlaylist

    }
  },
  beforeMount() {
    window.addEventListener("load", ()=> {
      console.log(this.songs)
    })
  },
  created()
  {
    this.loadPlaylistData()
  },
  mounted: function mounted() {

    let currentPlaylist ="";
      window.emitter.on('newplaylist', function (data){
        console.log(data)
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
  // components: {Songs}
}
</script>

<style scoped>
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
    background-color: #485460;
    height: 50px;
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