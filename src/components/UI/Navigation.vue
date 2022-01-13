<template>
  <!-- Navigation container for the top of the application -->
  <div class="nav-container">
    <!-- showContainer method called on click event -->
    <div @click="showContainer('library')" id="library-nav" class="nav-parent-element">
      <div class="nav-text-parent">
        <p>Library</p>
      </div>
    </div>
    <div @click="showContainer('playlists')" id="playlist-nav" class="nav-parent-element">
      <div class="nav-text-parent">
        <p>Playlists</p>
      </div>
    </div>
    <div @click="showContainer('settings')" id="settings-nav" class="nav-parent-element">
      <div class="nav-text-parent">
        <p>Settings</p>
      </div>
    </div>
    <div id="logo-nav" class="nav-parent-element">
      <img src="../../../public/images/Logo.png">
    </div>

  </div>
</template>

<script>

export default {
  name: "Navigation",
  methods: {
    /***
     * showContainer method is responsible for passing the container name
     * to the app component with the correct container name
     * @param containerName
     */
    showContainer: function(containerName){
      window.emitter.emit('showContent', containerName)
    },
  }

}
</script>

<style scoped>
  /* Styles for the navigation bar*/
  .nav-container{
    position: absolute;
    height: 60px;
    max-height: 60px;
    width: 100%;
    top: 0;
    overflow: hidden;
    /*margin: 0;*/
    background-color: #1E272E;
    padding: 1px;
    display: table;
    table-layout: fixed;
  }
  .nav-parent-element{
    position: relative;
    height: 10px;
    background-color: #808E9B;
    margin: 5px;
    display: table-cell;
    border: 2px solid #1E272E;
    padding: 4px 6px;
    width: 2%;
    cursor: pointer;
  }
  .nav-text-parent{
    height: auto;
    width: 100%;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .nav-text-parent p{
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    height: 100%;
    width: 100%;
    color: white;
    text-align: center;
  }
  #library-nav{
    background-color: #485460;
  }
  #logo-nav{
    background-color: #1E272E;
    cursor: auto;
  }
  #logo-nav img{
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>