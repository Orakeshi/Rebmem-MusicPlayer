<template>
  <div id="create-playlist-popup">
    <div id="popup-form">
      <textarea id="playlist-name" placeholder="Enter playlist name:"></textarea>

      <div id="form-button-parents">
        <div class="form-buttons" id="submit-songs" @click="submitPlaylist()">
          <h2>Submit</h2>
        </div>
      </div>

      <div id="add-songs-container">
        <div id="songs-add-parent">
          <div class="song-item" v-for="song in songs" :id="'popup'+song.id" :key="song.id" @click="selectSong('popup'+song.id, song)">
            <img id="song-select-img" :src="song.imgdata">
            <p id="song-title">{{song.title}}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div id="library-parent">
    <Library style="display: none" v-on:songs="getSongs($event)"></Library>
  </div>

</template>

<script>
import Library from "./Library";

const fs = window.require("fs")
const path = window.require("path")
const os = window.require("os").homedir()

const songFolder = path.join(os, 'Music')

export default {
  name: "PlaylistPopup",
  methods: {
    getSongs: function (e){
      this.songs = e

      console.log(this.songs)
    },
    selectSong: function (songId, song){
      let temp = document.getElementById(songId);
      if (this.selectedSongs.includes(song)){
        temp.style.backgroundColor = '#007db5';

        let elementIndex = this.highlightedSongs.indexOf(temp);
        let index = this.selectedSongs.indexOf(song);

        if (elementIndex > -1){
          this.highlightedSongs.splice(elementIndex, 1)
        }

        if (index > -1){
          this.selectedSongs.splice(index, 1)
        }
      }
      else{
        temp.style.backgroundColor = 'green';
        this.highlightedSongs.push(temp)
        this.selectedSongs.push(song)
      }
      console.log(songId)
      console.log(this.selectedSongs)
    },

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
        song: []
      }
      window.playlistId +=1;

      for (let i in this.selectedSongs){
        let item = this.selectedSongs[i];

        playlistData.song.push({
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
        currentTemp.style.backgroundColor = '#007db5';
      }
      this.highlightedSongs = []
      console.log(playlistData)
      window.emitter.emit("newplaylist", playlistData)
      console.log(this.songs)
    },
    updateOptions(){
      console.log("in")
      console.log(this.songs)
      this.$nextTick(function(){
        for (let i in this.songs){
          let currentSong = this.songs[i]
          console.log(currentSong)
          let currentElement = document.getElementById("popup"+currentSong.id)


          this.$nextTick(function(){
            console.log(currentElement.getElementsByTagName('p')[0])
            currentElement.getElementsByTagName('p')[0].innerHTML = currentSong.title
            console.log(currentElement.getElementsByTagName('p')[0])
            currentElement.getElementsByTagName('img')[0].setAttribute("src", currentSong.imgdata)
            console.log(currentSong)
          })
        }
      })
    }
  },
  mounted() {
    window.addEventListener("load", ()=>{
      this.updateOptions()

    })
    let test = document.getElementById("playlist-create-button")
    let clicked = false
    test.addEventListener("click", ()=>{
      if (clicked){
        return
      }
      else{
        clicked = true
        this.updateOptions()
      }

    })


  },

  data(){
    // Store array of song data
    return {
      songs: [],
      selectedSongs: [],
      highlightedSongs: [],
    }
  },
  components: {
    Library,
  }

}
</script>

<style scoped>
  #create-playlist-popup{
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    border: 1px solid red;
    display: block;
  }
  #popup-form{
    position: relative;
    width: 100%;
    height: 100%;
    background: orange;
  }
  #songs-add-parent{
    height: 200px;
    width: 100%;
    position: relative;
    border: 2px yellow;
    pointer-events: none;
  }

  #add-songs-container{
    height: 60%;
    width: 100%;
    position: absolute;
    overflow: auto;
  }
  .song-item{
    height: 50px;
    width: 100%;
    background: #007db5;
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
    height: 20px;
    width: 100%;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    resize: none;
  }
  #song-select-img{
    width: 50px;
    height: 50px;
    display: inline-flex;
  }
  #song-title{
    display: inline-flex;
    margin: 3%;
  }
  #library-parent{
    display: none;
  }
</style>