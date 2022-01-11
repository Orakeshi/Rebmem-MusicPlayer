<template>
  <div class="container">
    <div class="nav-parent-container">
      <Navigation></Navigation>
    </div>
    <div id="library-container" class="library-parent-container">
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
    this.$root.$on('showContent', (itemToShow) => {

      // your code goes here
      if(itemToShow == "library"){
        if(currentState){
          document.getElementById("library-container").style.display = "none";
        }
        else{
          document.getElementById("library-container").style.display = "block";
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
</style>
