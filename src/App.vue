<template>
  <div class="container">
    <div class="nav-parent-container">
      <Navigation></Navigation>
    </div>
    <div id="library-container" class="library-parent-container">
      <Library></Library>
    </div>
    <div id="playlists-container" class="playlists-parent-container">
      <Playlists></Playlists>
    </div>
    <div id="settings-container" class="settings-parent-container">
      <Settings></Settings>
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
import Playlists from "./components/Playlists";
import Settings from "./components/Settings";

export default {
  name: 'App',
  components: {
    Settings,
    Playlists,
    Navigation,
    Controls,
    Library
  },
  mounted() {
    let completingInstruction = false;
    let currentClicked = false;


    let libraryContainer = document.getElementById("library-container");
    let libraryNav =  document.getElementById("library-nav");

    let settingsContainer = document.getElementById("settings-container");
    let settingsNav = document.getElementById("settings-nav");

    let playlistsContainer = document.getElementById("playlists-container");
    let playlistsNav = document.getElementById("playlist-nav");

    let currentElement = libraryContainer;
    let currentNav = libraryNav;

    function hideElement(element){
      if(completingInstruction){
        return;
      }
      completingInstruction = true
      //Check if animation on element, if not play the animation
      if (element.classList.contains("fade-in")) {
        element.classList.remove("fade-in");
      }

      libraryContainer.classList.toggle("fade-out");

      // Wait animation time (200ms) and remove container from html
      setTimeout(()=> {
        element.style.display = "none";
        completingInstruction = false;
      }, 200);

    }

    function showElement(element, nav){
      currentElement = element
      currentNav = nav;

      if(completingInstruction){
        return;
      }
      completingInstruction = true
      // Play fade out animation
      if (element.classList.contains("fade-out")) {
        element.classList.remove("fade-out");
      }

      // Place library container back in view
      element.style.display = "block";
      element.classList.toggle("fade-in");
      completingInstruction = false;
      currentClicked = false;
    }

    function resetElement(element, nav){
      hideElement(element, nav)
      nav.style.backgroundColor="#808E9B";
    }

    this.$root.$on('showContent', (itemToShow) => {

      // your code goes here
      if(itemToShow == "library"){
        if(currentClicked){
          return;
        }
        currentClicked = true
        libraryNav.style.backgroundColor="#485460";
        console.log(currentElement.id)
        if(currentElement.id=="library-container"){
          console.log("library already on screen")
          currentClicked = false;
          return
        }
        else{
          console.log("library now showing")
          resetElement(currentElement, currentNav);
          setTimeout(()=> {
            showElement(libraryContainer, libraryNav)
          }, 300)
        }

      }

      if(itemToShow == "playlists"){
        if(currentClicked){
          return;
        }
        currentClicked = true;
        playlistsNav.style.backgroundColor="#485460";
        if(currentElement.id=="playlists-container"){
          console.log("playlist already on screen")
          currentClicked = false;
          return
        }
        else{
          console.log("playlist now showing")
          resetElement(currentElement, currentNav);
          setTimeout(()=> {
            showElement(playlistsContainer, playlistsNav)
          }, 300)
        }


      }

      if(itemToShow == "settings"){
        if(currentClicked){
          return;
        }
        currentClicked = true;
        settingsNav.style.backgroundColor="#485460";
        if(currentElement.id=="settings-container"){
          console.log("settings already on screen")
          currentClicked = false;
          return
        }
        else{
          console.log("settings now showing")
          resetElement(currentElement, currentNav);
          setTimeout(()=> {
            showElement(settingsContainer, settingsNav)
          }, 300)
        }

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
  #settings-container{
    display: none;
  }
  #playlists-container{
    display: none;
  }

  .library-parent-container{
    position: relative;
    height: 75%;
    overflow: auto;

  }
  .library-parent-container::-webkit-scrollbar {
    width: 20px;
  }
  .library-parent-container::-webkit-scrollbar-corner {
    background: rgba(0,0,0,0);
  }
  .library-parent-container::-webkit-scrollbar-thumb {
    background-color: #808E9B;
    border-radius: 6px;
    border: 4px solid rgba(0,0,0,0);
    background-clip: content-box;
    min-width: 32px;
    min-height: 32px;
  }
  .library-parent-container::-webkit-scrollbar-track {
    background-color: rgba(0,0,0,0);
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
    animation: fadeIn ease 0.2s;
    -webkit-animation: fadeIn ease 0.2s;
    -moz-animation: fadeIn ease 0.2s;
    -o-animation: fadeIn ease 0.2s;
    -ms-animation: fadeIn ease 0.2s;
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
    animation: fadeOut ease 0.2s;
    -webkit-animation: fadeOut ease 0.2s;
    -moz-animation: fadeOut ease 0.2s;
    -o-animation: fadeOut ease 0.2s;
    -ms-animation: fadeOut ease 0.2s;
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
