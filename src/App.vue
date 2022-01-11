<template>
  <div class="container">
    <div class="nav-parent-container">
      <Navigation></Navigation>
    </div>
    <div id="library-container" class="library-parent-container slider close">
      <Library></Library>
    </div>
    <div class="divider">

    </div>
    <div class="controls-parent-container">
      <Controls></Controls>
    </div>

  </div>
</template>

<script>
import Library from './components/Library';
import Controls from './components/Controls';
import Navigation from "./components/Navigation";

export default {
  name: 'App',
  components: {
    Navigation,
    Controls,
    Library
  },
  mounted() {
    let currentState = true;

    let libraryContainer = document.getElementById("library-container");
    //let playlistContainer = document.getElementById("playlists-container");
    //let settingsContainer = document.getElementById("settings-container");

    this.$root.$on('showContent', (itemToShow) => {

      // your code goes here
      if(itemToShow == "library"){
        if(currentState){
          libraryContainer.style.backgroundColor="#808E9B";
          libraryContainer.classList.toggle("fade-out");
          setTimeout(()=> {
            libraryContainer.style.display = "none";
          }, 1000);

        }
        else{
          libraryContainer.style.display = "block";
          document.getElementById("library-nav").style.backgroundColor="#485460";
          libraryContainer.classList.toggle("fade-in");
        }
        currentState = !currentState;
      }
      else if(itemToShow == "playlists"){
        if(currentState){
          document.getElementById("library-container").style.display = "none";
          document.getElementById("library-nav").style.backgroundColor="#808E9B";
        }
        else{
          document.getElementById("library-container").style.display = "block";
          document.getElementById("library-nav").style.backgroundColor="#485460";
        }
        currentState = !currentState;
      }
      if(itemToShow == "settings"){
        if(currentState){
          document.getElementById("library-container").style.display = "none";
          document.getElementById("library-nav").style.backgroundColor="#808E9B";
        }
        else{
          document.getElementById("library-container").style.display = "block";
          document.getElementById("library-nav").style.backgroundColor="#485460";
        }
        currentState = !currentState;
      }

    })
  }
}
</script>

<style>
  html{
    height: 100%;
    margin:0;
    padding:0;
  }

  body{
    margin:0;
    padding:0;
    height:100%;
    background: #485460;
  }
  .container{
    display: block;
    width: 100%;
    position: absolute;
    height: 100%;
  }
  .nav-parent-container{
    position: relative;
    height: 60px;
    max-height: 60px;
    width: 100%;
    top: 0;
    overflow: hidden;
  }
  .library-parent-container{
    position: relative;
    height: 85%;
    overflow: auto;
  }
  .controls-parent-container{
    position: fixed;
    height: 80px;
    max-height: 80px;
    width: 100%;
    bottom: 0;
    overflow: hidden;
  }

  /* CSS ANIMATIONS */
  .fade-in {
    animation: fadeIn ease 1s;
    -webkit-animation: fadeIn ease 1s;
    -moz-animation: fadeIn ease 1s;
    -o-animation: fadeIn ease 1s;
    -ms-animation: fadeIn ease 1s;
  }
  @keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }

  @-moz-keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }

  @-o-keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }

  @-ms-keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }

  .fade-out {
    animation: fadeOut ease 1s;
    -webkit-animation: fadeOut ease 1s;
    -moz-animation: fadeOut ease 1s;
    -o-animation: fadeOut ease 1s;
    -ms-animation: fadeOut ease 1s;
  }
  @keyframes fadeOut {
    0% {
      opacity:1;
    }
    100% {
      opacity:0;
    }
  }

  @-moz-keyframes fadeOut {
    0% {
      opacity:1;
    }
    100% {
      opacity:0;
    }
  }

  @-webkit-keyframes fadeOut {
    0% {
      opacity:1;
    }
    100% {
      opacity:0;
    }
  }

  @-o-keyframes fadeOut {
    0% {
      opacity:1;
    }
    100% {
      opacity:0;
    }
  }

  @-ms-keyframes fadeOut {
    0% {
      opacity:1;
    }
    100% {
      opacity:0;
    }
  }
</style>
