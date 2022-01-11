<template>
  <div class="nav-container">
    <div @click="testMethod('library')" id="library-nav" class="nav-parent-element">
      <p>Library</p>
    </div>
    <div id="playlist-nav" class="nav-parent-element">
      <p>Playlists</p>
    </div>
    <div id="settings-nav" class="nav-parent-element">
      <p>Settings</p>
    </div>
    <div class="nav-parent-element">
      <p>Logo</p>
      <!--      img will go here of logo-->
    </div>

  </div>
</template>

<script>
export default {
  name: "Navigation",
  methods: {
    testMethod: function(containerName){
      this.$root.$emit('showContent', containerName) //like this
    },
  }

}
</script>

<style scoped>
.nav-container{
  position: absolute;
  height: 60px;
  max-height: 60px;
  width: 100%;
  top: 0;
  overflow: hidden;
  margin: 0;
  background-color: #1E272E;
  padding: 1px;
  display: table;
  table-layout: fixed;
}
.nav-parent-element{
  height: 10px;
  background-color: #808E9B;
  margin: 5px;
  display: table-cell;
  border: 2px solid #1E272E;
  padding: 4px 6px;
  width: 2%;
}
p{
  font-size: 12px;
  color: white;
}
</style>