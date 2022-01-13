<template>
  <div id="search-bar-parent">
    <div id="search-bar-container">
      <div id="search-bar">
        <textarea id="song-searched" placeholder="search"></textarea>
      </div>
    </div>
    <div id="button-controls-parent">
      <div id="search-button-container" class="button" @click="searchSong">
        <div id="search-button">
          <img src="../../../public/images/search-icon.png">
        </div>
      </div>
      <div id="reset-button-container" class="button" @click="resetSong">
        <div id="reset-button">
          <img src="../../../public/images/close.png">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Search",
  methods: {
    /***
     * Emits that song is being searched for
     */
    searchSong(){
      let songSearched = document.getElementById("song-searched").value;
      window.emitter.emit("searchsong", songSearched)
    },
    /***
     * Used to reset song container view
     */
    resetSong(){
      window.emitter.emit("resetsong")
    }
  }
}
</script>

<style scoped>
  .button:active {
    transform: translateY(4px);
  }
  #search-bar-parent{
    width: 100%;
    height: 40px;
    display: flex;
  }
  #search-bar-container{
    width: 90%;
    display: inline-flex;
    height: 100%;
  }
  #search-bar{
    width: 100%;
    background-color: white;
    height: 25px;
    position: relative;
    top: 0;
    border-radius: 10px;
    margin: 5px;
  }
  textarea{
    width: 100%;
    height: 25px;
    resize: none;
    border-radius: 10px;
  }

  #button-controls-parent{
    flex-grow: 1;
    display: inline-flex;
  }
   #reset-button-container{
      float: left;
  }
  #reset-button{
    padding: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    margin: 5px;
  }
  #reset-button img{
    height: auto;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
  }
  #search-button-container{
    float: left;
    height: 100%;
  }

  #search-button{
    padding: 0;

    width: 100%;
    height: 100%;
    cursor: pointer;
    margin: 5px;
  }
  #search-button img{
    height: auto;
    width: auto;
    height: 32px;
    width: 32px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }
</style>