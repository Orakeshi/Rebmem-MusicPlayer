<template>
  <!-- Containers for all the components that need to show to make up the application -->
  <div id="app-container" class="container">
    <div class="nav-parent-container">
      <Navigation></Navigation>
    </div>
    <div id="search-bar" class="search-parent-container">
      <Search></Search>
    </div>
    <div id="library-container" class="library-parent-container">
      <Library></Library>
    </div>
    <div id="playlists-container" class="playlists-parent-container">
      <Playlists></Playlists>
    </div>
    <div id="search-library-container">
      <SearchLibrary></SearchLibrary>
    </div>
    <div id="settings-container" class="settings-parent-container">
      <Settings></Settings>
    </div>
    <div class="controls-parent-container">
      <Controls></Controls>
    </div>

  </div>
</template>

<script>
// Import all VUE components needed
import Library from './components/UI/Library';
import Controls from './components/Songs/Controls';
import Navigation from "./components/UI/Navigation";
import Playlists from "./components/Playlists/Playlists";
import Settings from "./components/UI/Settings";

import Emitter from 'tiny-emitter';
import Search from "@/components/Search/Search";
import SearchLibrary from "@/components/Search/SearchLibrary";
window.emitter = new Emitter();

export default {
  name: 'App',
  components: {
    SearchLibrary,
    Search,
    Settings,
    Playlists,
    Navigation,
    Controls,
    Library
  },
  mounted() {
    // Store all elements to be accesed in variables
    let completingInstruction = false;
    let currentClicked = false;

    let libraryContainer = document.getElementById("library-container");
    let libraryNav = document.getElementById("library-nav");

    let settingsContainer = document.getElementById("settings-container");
    let settingsNav = document.getElementById("settings-nav");

    let playlistsContainer = document.getElementById("playlists-container");
    let playlistsNav = document.getElementById("playlist-nav");

    let currentElement = libraryContainer;
    let currentNav = libraryNav;

    /***
     * function is responsible for hiding any given element and playing an animation on the element
     * @param element
     */
    function hideElement(element) {
      if (completingInstruction) {
        return;
      }
      completingInstruction = true
      //Check if animation on element, if not play the animation
      if (element.classList.contains("fade-in")) {
        element.classList.remove("fade-in");
      }

      libraryContainer.classList.toggle("fade-out");

      // Wait animation time (200ms) and remove container from html
      setTimeout(() => {
        element.style.display = "none";
        completingInstruction = false;
      }, 200);

    }

    /***
     * Function is responsbile for showing any element with a fade animation
     * @param element
     * @param nav
     */
    function showElement(element, nav) {
      currentElement = element
      currentNav = nav;

      if (completingInstruction) {
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

    /***
     * method handles resetting a given element. the hideElement function is played
     * @param element
     * @param nav
     */
    function resetElement(element, nav) {
      hideElement(element, nav)
      nav.style.backgroundColor = "#808E9B";
    }

    window.emitter.on('showContent', function (itemToShow){
      let searchBar = document.getElementById("search-bar")
      let searchContainer = document.getElementById("search-library-container")
      // Conditionals to check what container has been clicked
      if (itemToShow == "library") {
        if (currentClicked) {
          return;
        }
        currentClicked = true
        libraryNav.style.backgroundColor = "#485460";
        if (currentElement.id == "library-container") {
          currentClicked = false;
          return
        } else {
          resetElement(currentElement, currentNav);
          setTimeout(() => {
            searchBar.style.display="block"
            showElement(libraryContainer, libraryNav)
          }, 300)
        }

      }

      if (itemToShow == "playlists") {
        if (currentClicked) {
          return;
        }
        currentClicked = true;
        playlistsNav.style.backgroundColor = "#485460";
        if (currentElement.id == "playlists-container") {
          currentClicked = false;
          return
        } else {
          searchBar.style.display="none"
          searchContainer.style.display="none"
          resetElement(currentElement, currentNav);
          setTimeout(() => {
            showElement(playlistsContainer, playlistsNav)
          }, 300)
        }


      }

      if (itemToShow == "settings") {
        if (currentClicked) {
          return;
        }
        currentClicked = true;
        settingsNav.style.backgroundColor = "#485460";
        if (currentElement.id == "settings-container") {
          currentClicked = false;
          return
        } else {
          searchBar.style.display="none"
          searchContainer.style.display="none"
          resetElement(currentElement, currentNav);
          setTimeout(() => {
            showElement(settingsContainer, settingsNav)
          }, 300)
        }

      }
    });
  }
}
</script>

<style>
/* CSS to style the APP component*/
html {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #485460;
}

.container {

}
#app-container{
  display: block;
  width: 100%;
  position: absolute;
  height: 100%;
  overflow: hidden;
}

.nav-parent-container {
  position: relative;
  height: 60px;
  max-height: 60px;
  width: 100%;
  top: 0;
  overflow: hidden;
}

#settings-container {
  display: none;
}

#playlists-container {
  display: none;
}

.library-parent-container {

  position: relative;
  height: 80%;
  overflow: auto;

}


.library-parent-container::-webkit-scrollbar {
  width: 20px;
}

.library-parent-container::-webkit-scrollbar-corner {
  background: rgba(0, 0, 0, 0);
}

.library-parent-container::-webkit-scrollbar-thumb {
  background-color: #808E9B;
  border-radius: 6px;
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: content-box;
  min-width: 32px;
  min-height: 32px;
}

.library-parent-container::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}

.controls-parent-container {
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
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-moz-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-webkit-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-o-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-ms-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
