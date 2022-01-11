<template>
  <div class="nav-container">
    <div class="nav-parent-element">
      <p>Library</p>
    </div>
    <div class="nav-parent-element">
      <p>Playlists</p>
    </div>
    <div class="nav-parent-element">
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
  name: "Navigation"
}
</script>

<style scoped>
.nav-container{
  position: relative;
  margin: 0;
  width: 100%;
  height: 100px;
  display: inline-block;
  background-color: #1E272E;
  padding: 3px;
}
.nav-parent-element{
  height: 50px;
  width: 24.5%;
  display: inline-block;
  background-color: #808E9B;
  margin-left: 2px;
}
p{
  font-size: 12px;
  color: white;
}
</style>